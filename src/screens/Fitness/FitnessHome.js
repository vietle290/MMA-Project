import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
  } from "react-native";
  import React from "react";
  import FitnessCards from "../../components/Fitness/FitnessCard";
  // import FitnessData from "../../constants/FitnessData/FitnessData";
  import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../auth/FireBaseConfig";
  import { collection, doc, getDoc } from "firebase/firestore";
  import { useFocusEffect } from "@react-navigation/native";
  import { useState, useEffect } from "react";
  
  const FitnessHomeScreen = () => {
    // const { minutes, calories, workout } = useContext(FitnessItems);
    const [userDatas, setUserData] = useState(null);
    console.log(userDatas);

    // Function to retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
      // Check if the user is authenticated
      if (FIREBASE_AUTH.currentUser) {
        const userId = FIREBASE_AUTH.currentUser.uid;
        const usersCollection = collection(FIRESTORE_DB, "users");
        const usersDoc = doc(usersCollection, userId);
        const usersDocSnapshot = await getDoc(usersDoc);
    
        if (usersDocSnapshot.exists()) {
          const userData = usersDocSnapshot.data();
          setUserData(userData);
          // Do something with the user data
          
        } else {
          // User document does not exist
          console.log("User document does not exist");
        }
      } else {
        // User is not authenticated
        console.log("User is not authenticated");
      }
    };
  
    useFocusEffect(
      React.useCallback(() => {
        retrieveUserData(); // Call the function to retrieve user data
      }, [])
    );
    return (
      <SafeAreaView style={{ paddingTop: 0 }}>
        <ScrollView style={{margin:5}}>
          <View
            style={{
              backgroundColor: "#f0ede8",
              padding: 5,
              // height: 200,
              paddingTop:40,
              width: "100%",
            }}
          >
            <View style={{marginLeft:20}}>
              <Text style={{ fontWeight: "bold", fontSize: 24 }}>Hi Friend</Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Let Check Your goal
              </Text>
            </View>
  
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
                // backgroundColor:"red",
  
              }}
            >
              <View style={{backgroundColor:"white", padding:15, borderRadius:10, marginLeft:20, paddingHorizontal:20}}>
              <Text style={{ fontWeight:"bold", fontSize:19, textAlign:"center", paddingVertical:7  }}>Workouts</Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 45,
  
                  }}
                >
                  {userDatas && userDatas.wkNum}
                </Text>
                <Text style={{fontWeight:"bold"}}>Let Complete</Text>
                <Text style={{fontWeight:"bold"}}>Workouts</Text>
  
              </View>
  
              <View style={{ flexDirection: "column", width:180, marginRight:20, rowGap:10}}>
                <View style={{backgroundColor:"white", padding:15, borderRadius:10}}>
                <Text style={{ fontSize: 18 }}>Calories</Text>
  
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {userDatas && userDatas.wkCalories} achieve 
                  </Text>
                </View>
  
                <View style={{backgroundColor:"white", padding:15, borderRadius:10}}>
                <Text style={{ fontSize: 18 }}>Minutes</Text>
  
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {userDatas && userDatas.wkMinutes} achieve
                  </Text>
                </View>
              </View>
            </View>
  
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                style={{
                  width: "90%",
                  height: 120,
                  marginTop: 20,
                  borderRadius: 7,
                }}
                source={{
                  uri: "https://images.everydayhealth.com/images/everything-you-need-know-about-fitness-1440x810.jpg",
                }}
              />
            </View>
            <FitnessCards />
  
  
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default FitnessHomeScreen;
  
  const styles = StyleSheet.create({});
  