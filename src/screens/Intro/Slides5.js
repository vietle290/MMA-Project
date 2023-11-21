// import * as React from "react";
// import { View, Text, StyleSheet, TextInput, Image } from "react-native";

// export default function Slides5() {
//     return (
//       <>
//         <View style={styles.container}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.headerText}>Cân nặng của bạn?</Text>
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
//       width: 300, // Adjust the width as needed
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

export default function Slides5() {
  const [weight, setWeight] = useState("");
  const [savedWeight, setSavedWeight] = useState(null);

  // Function to save the user's weight to AsyncStorage
  const saveWeightToAsyncStorage = async (text) => {
    try {
      await AsyncStorage.setItem("user_weight", text);
      setSavedWeight(text);
    } catch (error) {
      console.error("Error saving weight:", error);
    }
  };

  // Function to retrieve the saved weight from AsyncStorage
  const getSavedWeight = async () => {
    try {
      const savedWeight = await AsyncStorage.getItem("user_weight");
      if (savedWeight !== null) {
        setSavedWeight(savedWeight);
      }
    } catch (error) {
      console.error("Error retrieving weight:", error);
    }
  };

  // Retrieve the saved height when the component mounts
  useEffect(() => {
    getSavedWeight();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Cân nặng của bạn?</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              textAlign="center"
              onChangeText={(text) => {
                setWeight(text);
                saveWeightToAsyncStorage(text); // Save as user types
              }}
              value={savedWeight}
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
