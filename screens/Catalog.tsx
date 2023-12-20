import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import ItemCard from "../components/ItemCard/ItemCard";
import { Product, RouterProps } from "../types";

const renderItem = ({ item }: any) => (
  <View style={styles.item}>
    <ItemCard product={item} />
  </View>
);
export default function Catalog({ navigation }: RouterProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();

  const ListEndLoader = () => {
    if (isLoading) {
      return <ActivityIndicator size={"large"} />;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Discover products</Text> */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={ListEndLoader}
      />
      {isLoading && (
        <View>
          <Text>Loading</Text>
        </View>
      )}

      <Navigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f1f1f1",
  },
  productContainer: {
    borderColor: "red",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "700",
    fontSize: 34,
    marginBottom: 20,
    marginLeft: 10,
    textAlign: "center",
  },
  item: {
    flex: 1,
    margin: 4,
    display: "flex",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 20,
  },
});
