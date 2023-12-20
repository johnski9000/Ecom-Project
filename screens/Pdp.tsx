import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAddItem } from "../hooks";
import GeneralStarExample from "../components/Reviews";

export default function Pdp(navigationProps) {
  const addItem = useAddItem();
  const { product } = navigationProps.route.params;

  return (
    <View style={styles.container}>
      {product ? (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              resizeMode="contain" // or 'cover', 'stretch', etc.
              style={styles.image}
            />
          </View>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>Price - £{product.price}</Text>
          </View>
          <View>
            <View style={styles.flex}>
              <View style={styles.rating}>
                <GeneralStarExample rating={product.rating.rate} />
              </View>
            </View>
            <Text style={styles.reviewAmount}>
              {product.rating.count} reviews
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          <TouchableOpacity
            onPress={() => addItem(product)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add to basket</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff4201",
    color: "white",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  rating: {
    width: 250,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  reviewAmount: {
    textAlign: "center",
  },
  descriptionContainer: {
    padding: 20,
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 14,
  },
  priceContainer: {
    padding: 10,
  },
  priceText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
