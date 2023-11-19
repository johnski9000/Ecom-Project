import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAddItem, useRemoveItem } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  amount?: number;
}

// Define the type for the props expected by the ItemCard component
interface ItemCardProps {
  product: Product;
}

export default function ItemCard({ product }: ItemCardProps) {
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const navigation = useNavigation(); // Initialize navigation
  const truncateTitle = (title: any) => {
    const titleWords = title.split(" ");
    if (titleWords.length > 3) {
      return titleWords.slice(0, 3).join(" ") + "...";
    }
    return title;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PDP", { product: product })}
      >
        <View>
          <Image
            source={{ uri: product.image }}
            style={styles.image} // You can adjust the size as needed
            resizeMode="contain" // or 'cover', 'stretch', etc.
          />
        </View>

        <Text style={styles.title}>{truncateTitle(product.title)}</Text>
        <Text style={styles.text}>{product.price}£</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addItem(product)} style={styles.button}>
        <Text style={styles.buttonText}>Add to basket</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
    height: 220,
  },
  image: {
    height: 100,
    width: 100,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    // height: 15,
  },
  text: {},
  button: {
    backgroundColor: "black",
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
