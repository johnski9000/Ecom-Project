import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";

import firestore from "@react-native-firebase/firestore";
import { clearBasket } from "../reducers/basketReducer";
import { calculateTotal } from "./Basket";

const Paypal = () => {
  const [accessToken, setAccessToken] = useState(
    "A21AAL27MVvi5x7b5GUK3rH2zSsCxKcJ5YA-0mIP9qxu7plwgVEXruGA13_LYqxO_wwjCgV6bale6DIE7A8aXAIDtm7z7qWcg"
  );
  const [approvalUrl, setApprovalUrl] = useState(null);
  const [paymentMade, setPaymentMade] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const { basket, user } = useSelector((state) => state);
  console.log(user);
  console.log("total", calculateTotal(basket));
  useEffect(() => {
    generateAccessToken();
  }, []);

  const generateAccessToken = () => {
    fetch("https://api.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAccessToken(data.access_token);
        createPayment(data.access_token); // Assuming you want to create the payment after getting the token
      });
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

  const onNavigationStateChange = (webViewState) => {
    console.log("webViewState:", webViewState);
    console.log(paymentId);
    const { url } = webViewState;
    if (url.includes("example.com")) {
      // Manually extract URL parameters
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

      fetch(
        "https://api.sandbox.paypal.com/v1/payments/payment/" +
          paymentId +
          "/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ payer_id: payerId }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.name === "INVALID_RESOURCE_ID") {
            alert("Payment failed");
            setPaymentMade("failed");
          } else {
            console.log("response", response);
            console.log("response state", response.state);
            setApprovalUrl(null);
            setPaymentMade("success");
            async function createOrder() {
              const newOrder = {
                id: response.id,
                total: calculateTotal(basket),
                items: basket,
                date: new Date(),
                status: "pending",
              };
              firestore()
                .collection("Users")
                .doc(user.uid)
                .update({
                  previousOrders: firestore.FieldValue.arrayUnion(newOrder),
                })
                .then(() => {
                  console.log("User updated!");
                });
            }
            createOrder();
          }
        })
        .catch((err) => alert(err));
    }
  };
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
          <Text style={{ color: "black", fontSize: 24 }}>
            Payment Successful
          </Text>
        ) : (
          <Text style={{ color: "black", fontSize: 24 }}>Payment Failed</Text>
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
