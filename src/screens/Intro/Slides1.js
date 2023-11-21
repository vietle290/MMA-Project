import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage


export default function Slides1() {
  const [isButtonPressed, setButtonPressed] = useState([false, false, false]);
  const [selectedPlan, setSelectedPlan] = useState(""); // To store the selected plan
  

  const handleButtonPress = (index, text) => {
    const newState = [false, false, false]; // Reset all to false
    newState[index] = true; // Set the clicked button's state to true
    setButtonPressed(newState);
    setSelectedPlan(text); // Store the selected plan text
    saveSelectedPlanToAsyncStorage(text); // Save the selected plan to AsyncStorage
  };

    // Function to save the selected plan to AsyncStorage
    const saveSelectedPlanToAsyncStorage = async (text) => {
      try {
        await AsyncStorage.setItem("selected_plan", text);
      } catch (error) {
        console.error("Error saving selected plan:", error);
      }
    };

      // Function to retrieve the selected plan from AsyncStorage when the component mounts
  const getSelectedPlanFromAsyncStorage = async () => {
    try {
      const selectedPlan = await AsyncStorage.getItem("selected_plan");
      if (selectedPlan !== null) {
        setSelectedPlan(selectedPlan);
      }
    } catch (error) {
      console.error("Error retrieving selected plan:", error);
    }
  };

    // Retrieve the selected plan when the component mounts
    useEffect(() => {
      getSelectedPlanFromAsyncStorage();
    }, []);

      // Update isButtonPressed when selectedPlan changes
  useEffect(() => {
    const index = ["Ăn một chế độ cân bằng", "Tăng cân", "Giảm cân"].indexOf(selectedPlan);
    if (index !== -1) {
      const newState = [false, false, false];
      newState[index] = true;
      setButtonPressed(newState);
    }
  }, [selectedPlan]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chọn kế hoạch bạn muốn?</Text>
      </View>
      <View style={styles.inputContainer}>
        {/* <TextInput style={styles.input} placeholder="Họ và tên" textAlign="left" />
          <TextInput style={styles.input} placeholder="Giới tính" textAlign="left" />
          <TextInput style={styles.input} placeholder="Tuổi" textAlign="left" /> */}
        <TouchableOpacity
          style={[
            styles.button,
            isButtonPressed[0] && { backgroundColor: "#21ba3b" },
          ]}
          onPress={() => handleButtonPress(0, "Ăn một chế độ cân bằng")}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonPressed[0] && { color: "white" },
            ]}
          >
            Ăn một chế độ cân bằng
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isButtonPressed[1] && { backgroundColor: "#21ba3b" },
          ]}
          onPress={() => handleButtonPress(1, "Tăng cân")}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonPressed[1] && { color: "white" },
            ]}
          >
            Tăng cân
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isButtonPressed[2] && { backgroundColor: "#21ba3b" },
          ]}
          onPress={() => handleButtonPress(2, "Giảm cân")}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonPressed[2] && { color: "white" },
            ]}
          >
            Giảm cân
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text>Selected Plan: {selectedPlan}</Text> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 50,
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "#6FDBCD",
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 70,
  },
  button: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "white",
    paddingHorizontal: 60,
    borderRadius: 7,
    height: 100,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 20,
    borderRadius: 15,
    color: "black",
    fontWeight: "bold",
  },
});