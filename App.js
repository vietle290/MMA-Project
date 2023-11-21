// import { StyleSheet, Text, View, Alert } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import BottomTab from "./src/navigator/BottomTab/BottomTab";
// import FitnessHomeScreen from "./src/screens/Fitness/FitnessHome";
// import WorkOutScreen from "./src/screens/Fitness/WorkoutScreen";
// import FitDetailScreen from "./src/screens/Fitness/FitDetailScreen";

// import { useState, useEffect } from "react";

// import RecipeHomeScreen from "./src/screens/Recipe/RecipeHomeScreen";
// import RecipeDetailScreen from "./src/screens/Recipe/RecipeDetailScreen";
// import SearchScreen from "./src/screens/Recipe/SearchScreen";
// import Welcome from "./src/screens/Intro/Welcome";
// import IntroSliders from "./src/screens/Intro/IntroSliders";
// import Login from "./src/screens/Login/Login";
// import Register from "./src/screens/Signup/Register";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { FIREBASE_AUTH, FIRESTORE_DB } from "./auth/FireBaseConfig";
// import TrackingHomeScreen from "./src/screens/Tracking/TrackingHomeScreen";
// import TrackingScreen from "./src/screens/Tracking/TrackingScreen";
// import 'react-native-gesture-handler';
// import { doc, getDoc } from "firebase/firestore";
// import PurchaseStatus from "./src/screens/Purchase/PurchaseStatus";
// import { useNavigation } from "@react-navigation/native";

// const Stack = createStackNavigator();

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [userStatus, setUserStatus] = useState(null);

//   const handleAuthStateChange = (authUser) => {
//     if (authUser && authUser.emailVerified) {
//       const userId = authUser.uid;
//       const userDocRef = doc(FIRESTORE_DB, 'users', userId);
//       getDoc(userDocRef).then((userDocSnapshot) => {
//         if (userDocSnapshot.exists()) {
//           const userData = userDocSnapshot.data();
//           setUserStatus(userData.statusPremium ? true : false);
//         } else {
//           setUserStatus(false);
//         }
//       }).catch(error => {
//         setUserStatus(false);
//         console.error('Error getting user data:', error);
//       });
//     } else {
//       setUser(null);
//       setUserStatus(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, handleAuthStateChange);
//     return () => unsubscribe();
//   }, []);
//   useEffect(() => {
//     if (userStatus === false) {
      
//     }
//   }, [userStatus]);
  

//   console.log('ttttttttttttttttttttttttttttttt: ' + userStatus);
//   return (
  
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Welcome">
//           {userStatus === true ? (
//             <>
//               <Stack.Screen
//                 name="BottomTab"
//                 component={BottomTab}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="TrackingHome"
//                 component={TrackingHomeScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="TrackingScreen"
//                 component={TrackingScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="FitnessHomeScreen"
//                 component={FitnessHomeScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="WorkoutScreen"
//                 component={WorkOutScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="FitDetailScreen"
//                 component={FitDetailScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="RecipeHome"
//                 component={RecipeHomeScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="RecipeDetail"
//                 component={RecipeDetailScreen}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="RecipeSearch"
//                 component={SearchScreen}
//                 options={{
//                   headerShown: false,
//                   presentation: "fullScreenModal",
//                 }}
//               />
//             </>
//           ) : (
//             <>
//               <Stack.Screen
//                 name="Welcome"
//                 component={Welcome}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="IntroSliders"
//                 component={IntroSliders}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="LoginScreen"
//                 component={Login}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="Register"
//                 component={Register}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="PurchaseStatus"
//                 component={PurchaseStatus}
//                 options={{ headerShown: false }}
//               />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./src/navigator/BottomTab/BottomTab";
import FitnessHomeScreen from "./src/screens/Fitness/FitnessHome";
import WorkOutScreen from "./src/screens/Fitness/WorkoutScreen";
import FitDetailScreen from "./src/screens/Fitness/FitDetailScreen";

import { useState, useEffect } from "react";

import RecipeHomeScreen from "./src/screens/Recipe/RecipeHomeScreen";
import RecipeDetailScreen from "./src/screens/Recipe/RecipeDetailScreen";
import SearchScreen from "./src/screens/Recipe/SearchScreen";
import Welcome from "./src/screens/Intro/Welcome";
import IntroSliders from "./src/screens/Intro/IntroSliders";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Signup/Register";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "./auth/FireBaseConfig";
import TrackingHomeScreen from "./src/screens/Tracking/TrackingHomeScreen";
import TrackingScreen from "./src/screens/Tracking/TrackingScreen";
import PurchaseStatus from "./src/screens/Purchase/PurchaseStatus";
import { useFocusEffect } from "@react-navigation/native";
import { collection, doc, getDoc } from "firebase/firestore";
import React from 'react';



const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserDataa] = useState("");
  const [statusPremium, setUserStatus] = useState("");


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null)
      }
    });
  }, []);
  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log("user", user);
  //     if (user && user.emailVerified) {
  //       setUser(user);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // }, []);
  const handleAuthStateChange = (authUser) => {
    if (authUser && authUser.emailVerified) {
      const userId = authUser.uid;
      const userDocRef = doc(FIRESTORE_DB, 'users', userId);
      getDoc(userDocRef).then((userDocSnapshot) => {
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserStatus(userData.statusPremium);
        } else {
          // setUserStatus(false);
        }
      }).catch(error => {
        // setUserStatus(false);
        console.error('Error getting user data:', error);
      });
    } else {
      setUser(null);
      // setUserStatus(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, handleAuthStateChange);
    return () => unsubscribe();
  }, []);
  const userStatus = statusPremium === true;

  return (
  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {userStatus ? (
            <>
              <Stack.Screen
                name="BottomTab"
                component={BottomTab}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrackingHome"
                component={TrackingHomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TrackingScreen"
                component={TrackingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FitnessHomeScreen"
                component={FitnessHomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkoutScreen"
                component={WorkOutScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="FitDetailScreen"
                component={FitDetailScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecipeHome"
                component={RecipeHomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecipeDetail"
                component={RecipeDetailScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecipeSearch"
                component={SearchScreen}
                options={{
                  headerShown: false,
                  presentation: "fullScreenModal",
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="IntroSliders"
                component={IntroSliders}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
                            <Stack.Screen
                name="PurchaseStatus"
                component={PurchaseStatus}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
