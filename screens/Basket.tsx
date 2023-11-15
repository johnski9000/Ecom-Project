import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
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
  function calculateTotal() {
    return basket
      .reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0)
      .toFixed(2);
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
      <Text>Basket</Text>
      <FlatList
        style={styles.basketList}
        data={basket}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
      />
      <View style={styles.checkoutContainer}>
        <View style={styles.voucherAndPrice}>
          <View style={styles.voucherInputContainer}>
            <TextInput
              style={styles.voucherInput}
              placeholder="Voucher"
              keyboardType="numeric"
            ></TextInput>
          </View>

          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPrice}>TOTAL: ${calculateTotal()}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
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
  voucherAndPrice: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  voucherInputContainer: {
    borderColor: "white",
    borderWidth: 1,
    flex: 1,
    borderRadius: 10,
  },
  voucherInput: {
    color: "white",
    padding: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
  totalPriceContainer: {
    flex: 1,
    backgroundColor: "#ff4100",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  totalPrice: {
    color: "white",
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
