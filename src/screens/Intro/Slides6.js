// import * as React from "react";
// import { View, Text, StyleSheet, TextInput, Image } from "react-native";

// export default function Slides6() {
//     return (
//       <>
//         <View style={styles.container}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.headerText}>Mục tiêu cân nặng của bạn?</Text>
//           </View>
  
//           <View style={styles.inputContainer}>
//             <TextInput style={styles.input} textAlign="center" />
//             <Text style={styles.unitText}>kg</Text>
//           </View>
  
//         </View>
  
//         {/* <View style={styles.container1}>
//         <Text style={styles.footerText}>
//           All rights reserved by Little Lemon, 2022{' '}
//         </Text>
//       </View> */}
//       </>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
  
//     },
//     headerContainer: {
//       width: 400, // Adjust the width as needed
//       alignSelf: 'center',
//     },
//     headerText: {
//       fontSize: 30,
//       fontWeight: "bold",
//       color: "black",
//       textAlign: "center",
//     },
//     inputContainer: {
//       marginTop: 50,
//       width: 200, // Adjust the width as needed
//       alignSelf: 'center',
//       flexDirection: "row",
//       alignItems: "center"
//     },
//     input: {
//       fontSize: 20,
//       marginBottom: 20,
//       paddingHorizontal: 20,
//       borderRadius: 15,
//       height: 70,
//       color: "gray",
//       fontSize: 45,
//       fontWeight: "bold",
//       borderBottomColor: "#ede9e6",
//       borderBottomWidth: 2,
//       width: 200
//     },
//     unitText: {
//       fontSize: 30,
//       fontWeight: "bold",
//       color: "black",
//       textAlign: "center",
//     },
//     forgotPassword: {
//       alignItems: 'flex-end',
//       marginTop: 5,
//       marginRight: 20,
  
//     },
//     forgotPasswordText: {
//       color: "#26B3A0",
//     },
//     container1: {
//       marginTop: 150,
//       backgroundColor: "#26B3A0",
//       paddingHorizontal: 120,
//     }
//   });

import * as React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Slides6() {
  const [weightG, setWeightG] = useState("");
  const [savedWeightG, setSavedWeightG] = useState(null);

  // Function to save the user's weight to AsyncStorage
  const saveWeightGToAsyncStorage = async (text) => {
    try {
      await AsyncStorage.setItem("user_weightg", text);
      setSavedWeightG(text);
  
      const selectedPlan = await getPlanFromAsyncStorage();
      const userWeight = await getWeightFromAsyncStorage();
  
      if (selectedPlan === "Ăn một chế độ cân bằng") {
        if (text !== userWeight) {
          console.log("Please enter your current weight.");
        }
      } else if (selectedPlan === "Tăng cân") {
        if (text <= userWeight) {
          console.log("Please enter a weight greater than your current weight.");
        }
      } else if (selectedPlan === "Giảm cân") {
        if (text >= userWeight) {
          console.log("Please enter a weight less than your current weight.");
        }
      }
    } catch (error) {
      console.error("Error saving weight:", error);
    }
  };

  const getWeightFromAsyncStorage = async () => {
    try {
      const weight = await AsyncStorage.getItem("user_weight");
      return weight;
    } catch (error) {
      console.error("Error retrieving weight from AsyncStorage:", error);
      return null;
    }
  };

  const getPlanFromAsyncStorage = async () => {
    try {
      const plan = await AsyncStorage.getItem("selected_plan");
      return plan;
    } catch (error) {
      console.error("Error retrieving plan from AsyncStorage:", error);
      return null;
    }
  };

  // Function to retrieve the saved weight from AsyncStorage
  const getSavedWeightG = async () => {
    try {
      const savedWeightG = await AsyncStorage.getItem("user_weightg");
      if (savedWeightG !== null) {
        setSavedWeightG(savedWeightG);
      }
    } catch (error) {
      console.error("Error retrieving weight:", error);
    }
  };

  // Retrieve the saved height when the component mounts
  useEffect(() => {
    getSavedWeightG();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Mục tiêu cân nặng của bạn?</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              textAlign="center"
              onChangeText={(text) => {
                setWeightG(text);
                saveWeightGToAsyncStorage(text); // Save as user types
              }}
              value={savedWeightG}
              keyboardType="numeric" 
            />
          </View>
          <View>
            <Text style={styles.unitText}>kg</Text>
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
