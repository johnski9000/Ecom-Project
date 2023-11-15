import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

interface NavigationProps {
  navigation: any; // Declare navigation as any type
}

export default function Navigation({ navigation }: NavigationProps) {
  const route = useRoute();
  const { name } = route;
  const data = [
    {
      image: require("../../assets/home.png"),
      text: "Catalog",
    },
    {
      image: require("../../assets/search.png"),
      text: "Search",
    },
    {
      image: require("../../assets/shopping-basket.png"),
      text: "Basket",
    },
    {
      image: require("../../assets/user.png"),
      text: "Profile",
    },
  ];

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          onPress={() => {
            if (item.text !== "Log out") {
              navigation.navigate(item.text);
            }
          }}
          style={name === item.text ? styles.navItemActive : styles.navItem}
          key={index}
        >
          <Image
            source={item.image}
            style={name === item.text ? styles.navImageActive : styles.navImage}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    height: 60,
    backgroundColor: "black",
    // backgroundColor: "#505050",
  },
  navItem: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    gap: 5,
  },
  navItemActive: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  navItemText: {
    color: "white",
  },
  navItemTextActive: {
    color: "rgb(253, 208, 47)",
    zIndex: 100,
  },
  navImage: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  navImageActive: {
    width: 25,
    height: 25,
    tintColor: "rgb(253, 208, 47)",
  },
});
