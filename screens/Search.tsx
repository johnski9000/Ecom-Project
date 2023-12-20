import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import { truncateTitle } from "../functions";
import { useAddItem } from "../hooks";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
export default function Search({ navigation }: RouterProps) {
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const addItem = useAddItem();

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
          product.title.toLowerCase().includes(filter.toLowerCase())
        );
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
  function SearchItem({ item }: any) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PDP", { product: item })}
        >
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            width={75}
            height={50}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View>
          <Text>{truncateTitle(item.title)}</Text>
          <Text style={styles.price}>£{item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => addItem(item)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={setFilter}
        value={filter}
        placeholder="Search items..."
      />
      <FlatList
        style={styles.basketList}
        data={products ? products : []}
        renderItem={SearchItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
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
  basketList: {
    marginTop: 20,
  },
  price: {
    color: "#ff4201",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: "#ff4201",
    borderWidth: 1,
    width: 100,
    textAlign: "center",
    borderRadius: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#fafafa",
    paddingTop: 15,
    paddingBottom: 15,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
  },
  quantityContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  image: {
    marginRight: 10,
    width: 100,
  },
});
