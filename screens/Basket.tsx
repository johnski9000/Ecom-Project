import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useCallback } from "react";
import Navigation from "../components/Navigation/Navigation";
import {
  useAddItem,
  useAppSelector,
  useRemoveItem,
  useTruncateTitle,
} from "../hooks";

interface RouterProps {
  navigation: {};
}
const truncateTitle = (title: any) => {
  const titleWords = title.split(" ");
  if (titleWords.length > 3) {
    return titleWords.slice(0, 2).join(" ") + "...";
  }
  return title;
};
export default function Basket({ navigation }: RouterProps) {
    const addItem = useAddItem();
    const removeItem = useRemoveItem();
    const { basket } = useAppSelector((state) => state.basket);
  
    const renderItem = useCallback(
      ({ item }: any) => (
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            width={75}
            height={50}
            resizeMode="contain"
          />
          <View>
            <Text>{truncateTitle(item.title)}</Text>
            <Text style={styles.price}>£{item.price}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text>{item.amount}</Text>
            <TouchableOpacity onPress={() => addItem(item)}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
      [addItem, removeItem]
    );
  
    return (
      <View style={styles.container}>
        <Text>Basket</Text>
        <FlatList
          style={styles.basketList}
          data={basket}
          renderItem={renderItem}
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
  image: {
    marginRight: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around", // Adjust this to change the spacing between items
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
  },
  item: {
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
    right: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
});
