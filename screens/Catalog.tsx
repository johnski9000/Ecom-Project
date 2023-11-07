import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import { useAppSelector, useGetItems } from "../hooks";
import ItemCard, { Product } from "../components/ItemCard/ItemCard";

interface RouterProps {
  navigation: object;
}

const renderItem = ({ item }:any) => (
  <View style={styles.item}>
    <ItemCard product={item} />
  </View>
);
export default function Catalog({ navigation }: RouterProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const basket = useAppSelector((state) => state.basket);
  console.log(basket)

  const dummyItem = {
    id: 1,
    title: "Sample Product",
    price: "19.99",
    category: "Electronics",
    description:
      "This is a sample description of a product, detailing its features and benefits.",
    image: "https://via.placeholder.com/150",
  };

  useEffect(() => {
    useGetItems()
      .then((items) => {
        console.log(items);
        setProducts(items);
      })
      .catch((error) => {
        console.error("Error while getting items:", error);
      });
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover products</Text>
      <FlatList
      data={products} // The array of items to render
      renderItem={renderItem} // Function to render each item
      keyExtractor={item => item.id.toString()} // Extract the unique key for each item
      numColumns={2} // Number of columns in the grid
      columnWrapperStyle={styles.row} // Style for each row
      // Add any additional props you need, such as `ListHeaderComponent` if you have a header
    />
      <Navigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "white",
  },
  productContainer: {
    borderColor: "red",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row", // Change the direction to row for side by side items
    flexWrap: "wrap", // Allow items to wrap to the next line
  },
  title: {
fontWeight: "500",
fontSize: 24,
marginBottom: 20
  },
  item: {
    // flex: 1,
    width: "45%",
    margin: 4, // Add margin for spacing, adjust as needed
    // Set any additional styles for the item as needed
  },
  // Style for each row that wraps items in a two-column grid
  row: {
    flex: 1,
    justifyContent: 'space-around', // Adjust this to change the spacing between items
  },
});
