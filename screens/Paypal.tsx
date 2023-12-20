import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import firestore from "@react-native-firebase/firestore";
import { encode } from "base-64";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "../functions";
import { clearBasket } from "../Redux/reducers/basketReducer";
const Paypal = () => {
  const [accessToken, setAccessToken] = useState("");
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [paymentMade, setPaymentMade] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const { basket, user } = useSelector((state) => state);
  const PAYPAL_CLIENT_ID =
    "AaDvA5XaS0O6LPZGipks3IEhThZmJftyfKP5Bvpy04M-k8ORwAvJQkmfQIRNqZsPyDax5j4bPKn79OVH";
  const PAYPAL_CLIENT_SECRET =
    "ECO57fFLDi9inwgQL-gCcf5aCptb4rA0TtJRfGj49SYJniNZjt51DYw5aY4UZe6C149spvgLvItX8-Fw";
  useEffect(() => {
    generateAccessToken();
  }, []);
  const dispatch = useDispatch();
  const generateAccessToken = async () => {
    try {
      if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
      const credentials = PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET;
      const auth = encode(credentials);
      const response = await fetch(
        `https://api.sandbox.paypal.com/v1/oauth2/token`,
        {
          method: "POST",
          body: "grant_type=client_credentials",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );

      const data = await response.json();
      console.log(data.access_token);
      setAccessToken(data.access_token);
      createPayment(data.access_token);
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
  };

  const createPayment = (token) => {
    const dataDetail = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          amount: {
            total: calculateTotal(basket),
            currency: "GBP",
            details: {
              subtotal: calculateTotal(basket),
              tax: "0",
              shipping: "0",
              handling_fee: "0",
              shipping_discount: "0",
              insurance: "0",
            },
          },
        },
      ],
      redirect_urls: {
        return_url: "https://example.com",
        cancel_url: "https://example.com",
      },
    };

    fetch("https://api.sandbox.paypal.com/v1/payments/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataDetail),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        const approval = response.links.find(
          (data) => data.rel === "approval_url"
        );
        setPaymentId(response.id);
        setApprovalUrl(approval.href);
      })
      .catch((err) => console.log(err));
  };

  const onNavigationStateChange = async (webViewState) => {
    console.log("webViewState:", webViewState);
    const { url } = webViewState;

    if (url.includes("example.com") && !paymentMade) {
      setPaymentMade(true); // Preventing multiple submissions
      const params = url
        .split("?")[1]
        .split("&")
        .reduce((acc, current) => {
          const [key, value] = current.split("=");
          acc[key] = value;
          return acc;
        }, {});

      const paymentId = params["paymentId"];
      const payerId = params["PayerID"];

      console.log("Payment ID:", paymentId);
      console.log("Payer ID:", payerId);

      try {
        const response = await fetch(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ payer_id: payerId }),
          }
        );

        const responseData = await response.json();
        if (responseData.name === "INVALID_RESOURCE_ID") {
          alert("Payment failed");
          setPaymentMade("failed");
        } else {
          console.log("response", responseData);
          setApprovalUrl(null);
          await createOrder(responseData); // Call createOrder with the response data
        }
      } catch (err) {
        alert(err);
        setPaymentMade("failed"); // Resetting on error
      }
    }
  };
  async function orderExists(orderId) {
    try {
      const userDoc = await firestore().collection("Users").doc(user.uid).get();

      if (!userDoc.exists) {
        console.log("No such user!");
        return false;
      }

      const userData = userDoc.data();
      const existingOrder = userData.previousOrders.find(
        (order) => order.id === orderId
      );

      return !!existingOrder;
    } catch (error) {
      console.error("Error checking for existing order:", error);
      return false; // or handle the error as needed
    }
  }

  async function createOrder(response) {
    const orderId = response.id;
    const orderAlreadyExists = await orderExists(orderId);

    if (orderAlreadyExists) {
      console.log("Order already exists. Not creating a new one.");
      return;
    }

    // Create a new order if it doesn't exist
    const newOrder = {
      id: orderId,
      total: calculateTotal(basket),
      items: basket,
      date: new Date(),
      status: "success",
    };

    firestore()
      .collection("Users")
      .doc(user.uid)
      .update({
        previousOrders: firestore.FieldValue.arrayUnion(newOrder),
      })
      .then(() => {
        console.log("User updated!");
        setPaymentMade("success");
        dispatch(clearBasket());
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        // Handle the error as needed
      });
  }

  function WebViewElement() {
    return (
      <View style={{ flex: 1 }}>
        {approvalUrl && !paymentMade ? (
          <WebView
            style={{ height: "100%", width: "100%" }}
            source={{ uri: approvalUrl }}
            onNavigationStateChange={onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "black", fontSize: 24 }}>Loading...</Text>
              <ActivityIndicator
                color="black"
                size="large"
                style={{ alignSelf: "center", margin: 30 }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
  function PaymentSuccess() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        {paymentMade === "success" ? (
          <Text style={{ color: "black", fontSize: 24, textAlign: "center" }}>
            Payment Successful
          </Text>
        ) : (
          <Text style={{ color: "black", fontSize: 24, textAlign: "center" }}>
            Payment Failed
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {paymentMade ? <PaymentSuccess /> : <WebViewElement />}
    </View>
  );
};

export default Paypal;
