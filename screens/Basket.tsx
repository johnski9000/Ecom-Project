import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useCallback } from "react";
import Navigation from "../components/Navigation/Navigation";
import { useAddItem, useAppSelector, useRemoveItem } from "../hooks";

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
export function calculateTotal(basket: any) {
  return basket
    .reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0)
    .toFixed(2);
}
export default function Basket({ navigation }: RouterProps) {
  const addItem = useAddItem();
  const removeItem = useRemoveItem();
  const basket = useAppSelector((state) => state.basket);
  function checkout() {
    navigation.navigate("Paypal");
  }

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
      <KeyboardAvoidingView style={{ height: "100%" }}>
        <Text>Basket</Text>
        <FlatList
          style={styles.basketList}
          data={basket}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
        />
        <View style={styles.checkoutContainer}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPrice}>
              TOTAL: ${calculateTotal(basket)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => checkout()}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Navigation navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  basketList: {
    marginTop: 20,
  },
  image: {
    marginRight: 10,
    width: 100,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
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
  checkoutContainer: {
    backgroundColor: "#210e33",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 20,
    borderRadius: 10,
    marginBottom: 50,
    marginTop: 15,
  },
  totalPriceContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    backgroundColor: "#ff4100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  totalPrice: {
    color: "white",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#00de81",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  checkoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
