import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAddItem, useRemoveItem } from "../../hooks";
import { useNavigation } from "@react-navigation/native";
import { ItemCardProps } from "../../types";
import { truncateTitle } from "../../functions";

export default function ItemCard({ product }: ItemCardProps) {
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const navigation = useNavigation(); // Initialize navigation
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PDP", { product: product })}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>{truncateTitle(product.title)}</Text>
        <Text style={styles.price}>{product.price}£</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("PDP", { product: product })}
        style={styles.viewProductButton}
      >
        <Text style={styles.viewProductText}>View Product</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addItem(product)} style={styles.button}>
        <Text style={styles.buttonText}>Add to basket</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
    borderRadius: 10,
    height: 250,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    // width: 130,
    // height: 15,
  },
  price: {
    fontWeight: "bold",
    textAlign: "center",
    // width: 130,
    // height: 15,
  },
  text: {},
  button: {
    backgroundColor: "#ff4201",
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  viewProductButton: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
  },
  viewProductText: {
    color: "white",
    fontWeight: "bold",
  },
});
