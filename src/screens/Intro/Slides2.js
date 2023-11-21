// import * as React from "react";
// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage


// export default function Slides2() {
//   const [isButtonPressed, setButtonPressed] = useState([false, false, false]);
//   const [selectedGender, setSelectedGender] = useState("");
  
//   const handleButtonPress = (index, text) => {
//     const newState = [false, false, false]; // Reset all to false
//     newState[index] = true; // Set the clicked button's state to true
//     setButtonPressed(newState);
//     setSelectedGender(text);
//     saveSelectedGenderToAsyncStorage
//   };

//       // Function to save the selected gender to AsyncStorage
//       const saveSelectedGenderToAsyncStorage = async (text) => {
//         try {
//           await AsyncStorage.setItem("selected_gender", text);
//         } catch (error) {
//           console.error("Error saving selected gender:", error);
//         }
//       };
  
//         // Function to retrieve the selected gender from AsyncStorage when the component mounts
//     const getSelectedGenderFromAsyncStorage = async () => {
//       try {
//         const selectedGender = await AsyncStorage.getItem("selected_gender");
//         if (selectedGender !== null) {
//           setSelectedGender(selectedGender);
//         }
//       } catch (error) {
//         console.error("Error retrieving selected gender:", error);
//       }
//     };
  
//       // Retrieve the selected gender when the component mounts
//       useEffect(() => {
//         getSelectedGenderFromAsyncStorage();
//       }, []);
  
//         // Update isButtonPressed when selectedPlan changes
//     useEffect(() => {
//       const index = ["Nữ", "Nam"].indexOf(selectedGender);
//       if (index !== -1) {
//         const newState = [false, false, false];
//         newState[index] = true;
//         setButtonPressed(newState);
//       }
//     }, [selectedGender]);
//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}>Chọn giới tính?</Text>
//         </View>

//         <View style={styles.inputContainer}>
//           {/* <TextInput style={styles.input} placeholder="Họ và tên" textAlign="left" />
//           <TextInput style={styles.input} placeholder="Giới tính" textAlign="left" />
//           <TextInput style={styles.input} placeholder="Tuổi" textAlign="left" /> */}
//           <TouchableOpacity
//             style={[
//               styles.button,
//               isButtonPressed[0] && { backgroundColor: "#21ba3b" },
//             ]}
//             onPress={() => handleButtonPress(0, "Nữ")}
//           >
//             <Text
//               style={[
//                 styles.buttonText,
//                 isButtonPressed[0] && { color: "white" },
//               ]}
//             >
//               Nữ
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.button,
//               isButtonPressed[1] && { backgroundColor: "#21ba3b" },
//             ]}
//             onPress={() => handleButtonPress(1, "Nam")}
//           >
//             <Text
//               style={[
//                 styles.buttonText,
//                 isButtonPressed[1] && { color: "white" },
//               ]}
//             >
//               Nam
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <Text>{selectedGender}</Text>
//       </View>
//       {/* <View style={{position: "absolute", bottom: 20, marginLeft: 30, marginRight: 30}}>
//           <Text style={{color: "gray", textAlign: "center"}}>We use this information to calculate and provide you with daily personalized recommendations.</Text>
//         </View> */}
//       {/* <View style={styles.container1}>
//       <Text style={styles.footerText}>
//         All rights reserved by Little Lemon, 2022{' '}
//       </Text>
//     </View> */}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   headerContainer: {
//     width: "100%",
//     alignSelf: "center",
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "black",
//     textAlign: "center",
//   },
//   inputContainer: {
//     marginTop: 50,
//   },
//   input: {
//     fontSize: 20,
//     marginBottom: 20,
//     backgroundColor: "#6FDBCD",
//     paddingHorizontal: 20,
//     borderRadius: 15,
//     height: 70,
//   },
//   forgotPassword: {
//     alignItems: "flex-end",
//     marginTop: 5,
//     marginRight: 20,
//   },
//   forgotPasswordText: {
//     color: "#26B3A0",
//   },
//   container1: {
//     marginTop: 150,
//     backgroundColor: "#26B3A0",
//     paddingHorizontal: 120,
//   },
//   button: {
//     fontSize: 20,
//     marginBottom: 20,
//     backgroundColor: "white",
//     width: 380, // Set a fixed width for the button
//     borderRadius: 7,
//     height: 100,
//     justifyContent: "center",
//     alignSelf: "center",
//   },
//   buttonText: {
//     fontSize: 20,
//     textAlign: "center",
//     color: "black",
//     fontWeight: "bold",
//   },
// });

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


export default function Slides2() {
  const [isButtonPressed, setButtonPressed] = useState([false, false, false]);
  const [selectedGender, setSelectedGender] = useState(""); // To store the selected gender
  

  const handleButtonPress = (index, text) => {
    const newState = [false, false, false]; // Reset all to false
    newState[index] = true; // Set the clicked button's state to true
    setButtonPressed(newState);
    setSelectedGender(text); // Store the selected Gender text
    saveSelectedGenderToAsyncStorage(text); // Save the selected Gender to AsyncStorage
  };

    // Function to save the selected Gender to AsyncStorage
    const saveSelectedGenderToAsyncStorage = async (text) => {
      try {
        await AsyncStorage.setItem("selected_gender", text);
      } catch (error) {
        console.error("Error saving selected gender:", error);
      }
    };

      // Function to retrieve the selected Gender from AsyncStorage when the component mounts
  const getSelectedGenderFromAsyncStorage = async () => {
    try {
      const selectedGender = await AsyncStorage.getItem("selected_gender");
      if (selectedGender !== null) {
        setSelectedGender(selectedGender);
      }
    } catch (error) {
      console.error("Error retrieving selected gender:", error);
    }
  };

    // Retrieve the selected Gender when the component mounts
    useEffect(() => {
      getSelectedGenderFromAsyncStorage();
    }, []);

      // Update isButtonPressed when selectedGender changes
  useEffect(() => {
    const index = ["Nữ", "Nam"].indexOf(selectedGender);
    if (index !== -1) {
      const newState = [false, false, false];
      newState[index] = true;
      setButtonPressed(newState);
    }
  }, [selectedGender]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chọn giới tính</Text>
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
          onPress={() => handleButtonPress(0, "Nữ")}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonPressed[0] && { color: "white" },
            ]}
          >
            Nữ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            isButtonPressed[1] && { backgroundColor: "#21ba3b" },
          ]}
          onPress={() => handleButtonPress(1, "Nam")}
        >
          <Text
            style={[
              styles.buttonText,
              isButtonPressed[1] && { color: "white" },
            ]}
          >
            Nam
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text>Selected Plan: {selectedGender}</Text> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    width: "100%",
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
  },
  input: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "#6FDBCD",
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 70,
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
  button: {
    fontSize: 20,
    marginBottom: 20,
    backgroundColor: "white",
    width: 380, // Set a fixed width for the button
    borderRadius: 7,
    height: 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
});