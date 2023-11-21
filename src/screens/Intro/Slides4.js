import * as React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Slides4() {
  const [height, setHeight] = useState("");
  const [savedHeight, setSavedHeight] = useState(null);

  // Function to save the user's height to AsyncStorage
  const saveHeightToAsyncStorage = async (text) => {
    try {
      await AsyncStorage.setItem("user_height", text);
      setSavedHeight(text);
    } catch (error) {
      console.error("Error saving height:", error);
    }
  };

  // Function to retrieve the saved height from AsyncStorage
  const getSavedHeight = async () => {
    try {
      const savedHeight = await AsyncStorage.getItem("user_height");
      if (savedHeight !== null) {
        setSavedHeight(savedHeight);
      }
    } catch (error) {
      console.error("Error retrieving height:", error);
    }
  };

  // Retrieve the saved height when the component mounts
  useEffect(() => {
    getSavedHeight();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Chiều cao của bạn là?</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              textAlign="center"
              onChangeText={(text) => {
                setHeight(text);
                saveHeightToAsyncStorage(text); // Save as user types
              }}
              value={savedHeight}
              keyboardType="numeric" 
            />
          </View>
          <View>
            <Text style={styles.unitText}>cm</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    width: 300, // Adjust the width as needed
    alignSelf: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 50,
    width: 200, // Adjust the width as needed
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 70,
    color: "gray",
    fontSize: 45,
    fontWeight: "bold",
    borderBottomColor: "#ede9e6",
    borderBottomWidth: 2,
    width: 200,
  },
  unitText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: 5,
    marginRight: 20,
  },
  forgotPasswordText: {
    color: "#26B3A0",
  },
  container1: {
    marginTop: 150,
    backgroundColor: "#26B3A0",
    paddingHorizontal: 120,
  },
});
