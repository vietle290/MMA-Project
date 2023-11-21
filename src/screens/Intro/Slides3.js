// import React, { useState } from "react";
// import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

// export default function Slides3() {
//   const [dayModalVisible, setDayModalVisible] = useState(false);
//   const [monthModalVisible, setMonthModalVisible] = useState(false);
//   const [yearModalVisible, setYearModalVisible] = useState(false);

//   const [selectedDay, setSelectedDay] = useState("01");
//   const [selectedMonth, setSelectedMonth] = useState("01");
//   const [selectedYear, setSelectedYear] = useState("2023");

//   const calculateDaysInMonth = (year, month) => {
//     return new Date(year, month, 0).getDate();
//   };

//   const generateDays = () => {
//     const daysInMonth = calculateDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth));
//     return Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));
//   };

//   const days = generateDays();
//   const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
//   const years = Array.from({ length: 100 }, (_, i) => String(2023 - i));

//   const handleDayPress = (day) => {
//     setSelectedDay(day);
//     setDayModalVisible(false);
//   };

//   const handleMonthPress = (month) => {
//     setSelectedMonth(month);
//     setMonthModalVisible(false);
//   };

//   const handleYearPress = (year) => {
//     setSelectedYear(year);
//     setYearModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Chọn ngày sinh của bạn</Text>
//       <View style={styles.contentContainer}>
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.dates} onPress={() => setDayModalVisible(true)}>
//             <Text style={styles.text}>{selectedDay}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.dates} onPress={() => setMonthModalVisible(true)}>
//             <Text style={styles.text}>Th{selectedMonth}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.dates} onPress={() => setYearModalVisible(true)}>
//             <Text style={styles.text}>{selectedYear}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Day Modal */}
//       <Modal
//         visible={dayModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setDayModalVisible(false)}
//       >
//         <ScrollView style={styles.modal}>
//           {days.map((day) => (
//             <TouchableOpacity
//               key={day}
//               onPress={() => handleDayPress(day)}
//               style={styles.modalItem}
//             >
//               <Text>{day}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </Modal>

//       {/* Month Modal */}
//       <Modal
//         visible={monthModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setMonthModalVisible(false)}
//       >
//         <ScrollView style={styles.modal}>
//           {months.map((month) => (
//             <TouchableOpacity
//               key={month}
//               onPress={() => handleMonthPress(month)}
//               style={styles.modalItem}
//             >
//               <Text>{month}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </Modal>

//       {/* Year Modal */}
//       <Modal
//         visible={yearModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setYearModalVisible(false)}
//       >
//         <ScrollView style={styles.modal}>
//           {years.map((year) => (
//             <TouchableOpacity
//               key={year}
//               onPress={() => handleYearPress(year)}
//               style={styles.modalItem}
//             >
//               <Text>{year}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {

//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   contentContainer: {
//     width: "100%",
//     marginBottom: 100
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "black",
//     marginBottom: 200
//   },
//   text: {
//     fontSize: 30,
//   },
//   modal: {
//     flex: 1,
//     backgroundColor: "white",
    
//   },
//   modalItem: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   dates: {
//     borderBottomColor: "#D9D8D7", 
//     borderBottomWidth: 2 ,
//     marginHorizontal: 25
//   }
// });


import * as React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Slides3() {
  const [age, setAge] = useState("");
  const [savedAge, setSavedAge] = useState(null);

  // Function to save the user's height to AsyncStorage
  const saveAgeToAsyncStorage = async (text) => {
    try {
      await AsyncStorage.setItem("user_age", text);
      setSavedAge(text);
    } catch (error) {
      console.error("Error saving age:", error);
    }
  };

  // Function to retrieve the saved height from AsyncStorage
  const getSavedAge = async () => {
    try {
      const savedAge = await AsyncStorage.getItem("user_age");
      if (savedAge !== null) {
        setSavedAge(savedAge);
      }
    } catch (error) {
      console.error("Error retrieving age:", error);
    }
  };

  // Retrieve the saved height when the component mounts
  useEffect(() => {
    getSavedAge();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Tuổi của bạn là?</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.input}
              textAlign="center"
              onChangeText={(text) => {
                setAge(text);
                saveAgeToAsyncStorage(text); // Save as user types
              }}
              value={savedAge}
              keyboardType="numeric" 
            />
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
