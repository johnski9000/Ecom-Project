import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { User } from "../../types";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(orders);
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("hi");

      try {
        const userDoc = await firestore()
          .collection("Users")
          .doc(user?.uid || "")
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          console.log(userData?.previousOrders);
          setOrders(userData?.previousOrders || []);
        } else {
          console.log("No such user!");
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.uid) {
      fetchOrders();
    }
  }, [user?.uid]);
  function orderItem({ item }) {
    const timestampInMilliseconds = item.date.seconds * 1000;

    const dateObject = new Date(timestampInMilliseconds);
    console.log(dateObject);
    return (
      <View style={styles.orderItem}>
        <Text>
          <Text style={styles.title}>Order ID number -</Text> {item.id}
        </Text>
        <Text>
          <Text style={styles.title}>Order price -</Text> £{item.total}
        </Text>
        <Text>
          <Text style={styles.title}>Order date -</Text>{" "}
          {dateObject.toLocaleString()}
        </Text>
        <View style={styles.flex}>
          <Text style={styles.title}>Order Status -</Text>
          <Image
            source={
              item.status === "success"
                ? require("../../assets/success.png")
                : require("../../assets/error.png")
            }
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        </View>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        style={styles.orderListContainer}
        data={orders}
        renderItem={orderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
      />
      {/* Render your orders here */}
    </View>
  );
}
const styles = StyleSheet.create({
  orderListContainer: {
    width: "100%",
    marginTop: 20,
    padding: 20,
  },
  orderItem: {
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
