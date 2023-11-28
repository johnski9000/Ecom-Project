import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import ItemCard, { Product } from "../components/ItemCard/ItemCard";

interface RouterProps {
  navigation: object;
}

const renderItem = ({ item }: any) => (
  <View style={styles.item}>
    <ItemCard product={item} />
  </View>
);
export default function Catalog({ navigation }: RouterProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [error, setError] = useState<any>();

  const ListEndLoader = () => {
    if (isLoading) {
      // Show loader at the end of list when fetching next page data.
      return <ActivityIndicator size={"large"} />;
    }
  };

  useEffect(() => {
    // Define an async function inside the effect
    const fetchData = async () => {
      setIsLoading(true);
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
        setProducts(json); // Update state with the fetched data
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error); // Update state with the error
      } finally {
        setIsLoading(false); // Set loading to false regardless of success/error
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover products</Text>
      <FlatList
        data={products} // The array of items to render
        renderItem={renderItem} // Function to render each item
        keyExtractor={(item) => item.id.toString()} // Extract the unique key for each item
        numColumns={2} // Number of columns in the grid
        columnWrapperStyle={styles.row} // Style for each row
        ListFooterComponent={ListEndLoader}
        // onEndReached={}
        // Add any additional props you need, such as `ListHeaderComponent` if you have a header
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
    backgroundColor: "white",
  },
  productContainer: {
    borderColor: "red",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    marginBottom: 20,
    marginLeft: 10,
  },
  item: {
    width: "45%",
    margin: 4,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 40,
  },
});
