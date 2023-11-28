import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function UserProfile() {
  const [edit, setEdit] = useState(false);
  const [tab, setTab] = useState("Profile");
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const imageUrl = user?.user?.photoURL || undefined;
  function editPage() {
    setEdit(!edit);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={editPage} style={styles.editPage}>
        <Image
          source={
            edit
              ? require("../../assets/checked.png")
              : require("../../assets/edit.png")
          }
          style={styles.editPageImage}
        />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.profileImage}
            resizeMode="cover"
            alt=""
          />
          <Image
            source={require("../../assets/camera.png")}
            style={styles.camera}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.upperButtonContainer}>
        <TouchableOpacity
          onPress={() => setTab("Profile")}
          style={{ width: "50%" }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: tab === "Profile" ? "black" : "grey",
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("Order History")}
          style={{ width: "50%" }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: tab === "Order History" ? "black" : "grey",
            }}
          >
            Order History
          </Text>
        </TouchableOpacity>
      </View>
      {tab === "Profile" ? (
        <View style={{ flex: 1 }}>
          <View style={styles.scrollContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.inputTitle}>Name {"  "}- </Text>
              <TextInput
                editable={edit ? true : false}
                value={user?.displayName ? user?.displayName : "Insert Name"}
                style={styles.textInput}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.inputTitle}>Email {"  "}- </Text>
              <TextInput
                editable={edit ? true : false}
                value={user?.email}
                style={styles.textInput}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.inputTitle}>Address {"  "}- </Text>
              <TextInput
                editable={edit ? true : false}
                value={user?.address ? user?.address : "Insert Address"}
                style={styles.textInput}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.inputTitle}>Email Verified {"   "}- </Text>
              <Image
                source={
                  user?.emailVerified
                    ? require("../../assets/success.png")
                    : require("../../assets/error.png")
                }
                style={styles.emailVerfified}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => auth().sendPasswordResetEmail(user?.email)}
              style={styles.resetPasswordButton}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => auth().signOut()}
              style={styles.logOutButton}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text>order his</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    padding: 40,
    paddingTop: 0,
    height: "100%",
    flex: 1,
  },
  detailsContainer: {
    zIndex: 11,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  upperButtonContainer: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  emailVerfified: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  container: {
    height: "95%",
    padding: 0,
    backgroundColor: "white",
  },
  editPage: {
    position: "absolute",
    top: 25,
    right: 25,
    zIndex: 10,
  },
  editPageImage: {
    width: 25,
    height: 25,
  },
  imageContainer: {
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    zIndex: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 120 / 2,
    backgroundColor: "black",
  },
  camera: {
    width: 35,
    height: 35,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    position: "absolute",
    padding: 20,
    bottom: 0,
    gap: 10,
  },
  logOutButton: {
    backgroundColor: "#FF6B3C",
    padding: 10,
    borderRadius: 5,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resetPasswordButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
