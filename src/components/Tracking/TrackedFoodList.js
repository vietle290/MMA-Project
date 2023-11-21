import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../auth/FireBaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export const TrackedFoodList = (props) => {
  const navigation = useNavigation();


  const foods = [
    { name: "Com", calories: 260, carb: 60, protein: 20, fat: 10 },
    { name: "Mi", calories: 200, carb: 80, protein: 10, fat: 30 },
    { name: "Bun", calories: 210, carb: 40, protein: 15, fat: 10 },
    { name: "Banh Mi", calories: 250, carb: 30, protein: 25, fat: 20 },
    { name: "Bun Cha", calories: 320, carb: 40, protein: 30, fat: 15 },
    { name: "Pho", calories: 360, carb: 100, protein: 30, fat: 20 },
    { name: "Goi Cuon", calories: 110, carb: 30, protein: 15, fat: 7 },
    { name: "Banh Xeo", calories: 170, carb: 60, protein: 20, fat: 13 },

    // Thêm các món ăn khác vào danh sách ở đây
  ];

  const [userDatas, setUserData] = useState(null);

    // const retrieveUserData = async () => {
    //   // Check if the user is authenticated
    //   if (FIREBASE_AUTH.currentUser) {
    //     const userId = FIREBASE_AUTH.currentUser.uid;
    //     const usersCollection = collection(FIRESTORE_DB, "users");
    //     const usersDoc = doc(usersCollection, userId);
    //     const usersDocSnapshot = await getDoc(usersDoc);
    
    //     if (usersDocSnapshot.exists()) {
    //       const userData = usersDocSnapshot.data();
    //       setUserData(userData);
    //       // Do something with the user data
    //       console.log(userData);
    //     } else {
    //       // User document does not exist
    //       console.log("User document does not exist");
    //     }
    //   } else {
    //     // User is not authenticated
    //     console.log("User is not authenticated");
    //   }
    // };
  
    // useFocusEffect(
    //   React.useCallback(() => {
    //     retrieveUserData(); // Call the function to retrieve user data
        
    //   }, [])
    // );
    
    // const handleFabPress = async (food) => {
    //   if (userDatas) {
    //     const consumeCalo = userDatas.consumeCalo + food.calories;
    //     const consumeCarb = userDatas.consumeCarb + food.carb;
    //     const consumeProtein = userDatas.consumeProtein + food.protein;
    //     const consumeFat = userDatas.consumeFat + food.fat;
    
    //     // Check if the "users" collection exists
    //     const usersCollection = collection(FIRESTORE_DB, "users");
    //     const usersDoc = doc(usersCollection, userDatas.userId);
    //     const usersDocSnapshot = await getDoc(usersDoc);
    
    //     if (usersDocSnapshot.exists()) {
    //       // Update the data in the existing document
    //       const updatedData = {
    //         consumeCalo,
    //         consumeCarb,
    //         consumeProtein,
    //         consumeFat,
    //       };
    //       await updateDoc(usersDoc, updatedData);
    //     } else {
    //       // Create the "users" collection and document
    //       const initialData = {
    //         consumeCalo,
    //         consumeCarb,
    //         consumeProtein,
    //         consumeFat,
    //       };
    //       await setDoc(usersDoc, initialData);
    //     }
    //     navigation.navigate("TrackingScreen");
    //   }
    // };

    const handleFabPress = async (food) => {
      // Check if the user is authenticated
      if (FIREBASE_AUTH.currentUser) {
        const userId = FIREBASE_AUTH.currentUser.uid;
        const usersCollection = collection(FIRESTORE_DB, "users");
        const usersDoc = doc(usersCollection, userId);
        const usersDocSnapshot = await getDoc(usersDoc);
  
        if (usersDocSnapshot.exists()) {
          // Retrieve user data from Firestore
          const userData = usersDocSnapshot.data();
          setUserData(userData);

          if (userData.finalResults - food.calories < 0) {
            alert('You have eaten more than enough for today!')
            return; // Exit the function, don't update the data
          }
  
          const consumeCalo = userData.consumeCalo + food.calories;
          const consumeCarb = userData.consumeCarb + food.carb;
          const consumeProtein = userData.consumeProtein + food.protein;
          const consumeFat = userData.consumeFat + food.fat;
          const finalResults = userData.finalResults - food.calories;
  
          // Update the data in the existing document
          const updatedData = {
            consumeCalo,
            consumeCarb,
            consumeProtein,
            consumeFat,
            finalResults
          };
  
          await updateDoc(usersDoc, updatedData);
        } else {
          // User document does not exist
          console.log("User document does not exist");
        }
      } else {
        // User is not authenticated
        console.log("User is not authenticated");
      }
  
      navigation.navigate("BottomTab");
    };





    

  return (
   
    <View
      style={{
        flex: 1,
        backgroundColor: "#f0ece8",
      }}
    >
      <FlatList
        data={foods}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              padding: 16,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontWeight: "500", fontSize: 17 }}>
                {item.name}
              </Text>
              <Text>{item.calories} kcal</Text>
              <Text>{item.carb} gram</Text>
            </View>
            <View style={{ paddingTop: 3 }}>
              <Text>{item.carb} carb</Text>
              <Text>{item.protein} protein</Text>
              <Text>{item.fat} fat</Text>
            </View>
            <View>
              <FAB
                style={{
                  marginLeft: 40,
                  backgroundColor: "#f0ede8",
                  borderRadius: 30,
                }}
                icon="plus"
                onPress={() => handleFabPress(item)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};
