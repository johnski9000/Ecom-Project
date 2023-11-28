import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { Component, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
export default function Search({ navigation }: RouterProps) {
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    // Define an async function inside the effect
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          // If the response is not successful, throw an error
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const json = await response.json();
        const filteredProducts = json.filter((product: any) =>
          product.title.includes(filter)
        );
        console.log(filteredProducts);
        setProducts(filteredProducts); // Update state with the fetched data
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error); // Update state with the error
      } finally {
        setLoading(false); // Set loading to false regardless of success/error
      }
    };

    // Call the async function
    fetchData();
  }, [filter]);
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setFilter}
        value={filter}
        placeholder="Search items..."
      />
      <Navigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 40,
    backgroundColor: "white",
  },
});
