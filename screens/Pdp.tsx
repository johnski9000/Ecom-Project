import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAddItem } from "../hooks";

export default function Pdp(navigationProps) {
  const addItem = useAddItem();
  console.log(navigationProps);
  const { product } = navigationProps.route.params;

  return (
    <View style={styles.container}>
      {product ? (
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              resizeMode="contain" // or 'cover', 'stretch', etc.
              style={styles.image}
            />
          </View>
          <View>
            <Text>{product.rating.rate} rating</Text>
            <Text>{product.rating.count} reviews</Text>
          </View>
          <Text>{product.title}</Text>
          <Text>{product.category}</Text>
          <Text>{product.description}</Text>
          <View>
            <View>
              <Text>{product.price}</Text>
            </View>
            <TouchableOpacity onPress={() => addItem(product)}>
              <Text>Add to basket</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 250,
  },
});
