import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressCircle from "react-native-progress-circle";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { TrackingTab } from "../../components/Tracking/TrackingTab";
import axios from "axios";
import { Pressable } from "react-native";
import breakfastIcon from "../../../assets/images/TrackingImg/breakFastIcon.png";
import lunchIcon from "../../../assets/images/TrackingImg/lunchIcon.png";
import dinnerIcon from "../../../assets/images/TrackingImg/dinnerIcon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../auth/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";



// import { usersInformation } from "./data/users";

const user = {
  username: "hiennt",
  pw: "abcxyz123",
  caloriesNeed: 2122,
  carbNeed: 265,
  proteinNeed: 26,
  fatNeed: 71,
};

const burned = 0;

function TrackingHomeScreen({navigation}) {
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesNeed, setCaloriesNeed] = useState(0);
  const [carbsNeed, setCarbsNeed] = useState(0);
  const [proteinsNeed, setProteinsNeed] = useState(0);
  const [fatNeed, setFatNeed] = useState(0);
  const [carbsConsumed, setCarbsConsumed] = useState(0);
  const [proteinsConsumed, setProteinsConsumed] = useState(0);
  const [fatConsumed, setFatConsumed] = useState(0);

  useEffect(() => {
    // Fetch dữ liệu từ API mock
    axios
      .get("https://6496664383d4c69925a2c4a9.mockapi.io/users/2")
      .then((response) => {
        const userData = response.data;
        setCaloriesConsumed(userData.caloriesConsumed);
        setCaloriesNeed(userData.caloriesNeed);
        setCarbsNeed(userData.carbNeed);
        setProteinsNeed(userData.proteinNeed);
        setFatNeed(userData.fatNeed);
        setCarbsConsumed(userData.carbConsumed);
        setProteinsConsumed(userData.proteinConsumed);
        setFatConsumed(userData.fatConsumed);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const caloriesPercent = (caloriesConsumed / caloriesNeed) * 100;
  const caloriesPercentConsumed = caloriesConsumed / caloriesNeed;
  const eaten = caloriesConsumed;

  const carbConsumedPercent = carbsConsumed / carbsNeed;
  const carbPercent = carbConsumedPercent;
  const fatConsumedPercent = fatConsumed / fatNeed;
  const proteinConsumedPercent = proteinsConsumed / proteinsNeed;

  const [userDatas, setUserData] = useState(null);
  const [percentCalo, setPercentCalo] = useState(0);
  const [percentFat, setPercentFat] = useState(0);
  const [percentCarb, setPercentCarb] = useState(0);
  const [percentProtein, setPercentProtein] = useState(0);

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
            console.log(userData);
            const percentCalo = (userDatas.consumeCalo / userDatas.finalResults) * 100;
            setPercentCalo(percentCalo);
            const percentCarb = (userDatas.consumeCarb / userDatas.carbohydrate);
            setPercentCarb(percentCarb);
            const percentFat = (userDatas.consumeFat / userDatas.fat);
            setPercentFat(percentFat);
            const percentProtein  = (userDatas.consumeProtein / userDatas.protein);
            setPercentProtein(percentProtein);
      
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
    <SafeAreaView style={{ height: "100%", backgroundColor: "#f0ede8" }}>
      <View
        style={{
          height: "45%",
          backgroundColor: "#41ce8c",
          justifyContent: "flex-start",
        }}
      >
        <Pressable onPress={() => {
          navigation.navigate('BottomTab');
        }}>
        <Text
          style={{
            marginBottom: 30,
            textAlign: "center",
            fontSize: 22,
            marginTop: 20,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Wellness Mate
        </Text>
        </Pressable>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ marginTop: 70 }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {userDatas && parseInt(userDatas.consumeCalo)}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Eaten
            </Text>
          </View>

          <View>
            <ProgressCircle
              percent={percentCalo}
              radius={90}
              borderWidth={7}
              color="#008080"
              shadowColor="white"
              bgColor="#41ce8c"
            >
              <Text
                style={{
                  fontSize: 35,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {/* {100 - caloriesPercent.toFixed(0)}% */}
                {userDatas && parseInt(userDatas.finalResults)}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                KCAL LEFT
              </Text>
            </ProgressCircle>
          </View>

          <View style={{ marginTop: 70 }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {burned}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Burned
            </Text>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 15,
                color: "white",
                fontWeight: "bold",
                textAlign: "center", marginTop: 10}}>{userDatas && userDatas.needWeights} days to complete</Text>
        </View>
      </View>

      <View style={{ alignItems: "center", height: "10%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100%",
            width: "90%",
            backgroundColor: "white",
            marginTop: -20,
            borderRadius: 10,
          }}
        >
          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center", paddingBottom: 4 }}>Carbs</Text>
            <ProgressBar progress={percentCarb} color={"red"} />
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              {userDatas && parseInt(userDatas.consumeCarb)}/{userDatas && parseInt(userDatas.carbohydrate)}
            </Text>
          </View>

          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center", paddingBottom: 4 }}>
              Protein
            </Text>
            <ProgressBar progress={percentProtein} color={"blue"} />
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              {userDatas && parseInt(userDatas.consumeProtein)}/{userDatas && parseInt(userDatas.protein)}
            </Text>
          </View>

          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center", paddingBottom: 4 }}>Fat</Text>
            <ProgressBar progress={percentFat} color={"brown"} />
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              {userDatas && parseInt(userDatas.consumeFat)}/{userDatas && parseInt(userDatas.fat)}
            </Text>
          </View>
        </View>
      </View>

      <TrackingTab img={breakfastIcon} tab="Breakfast" caloriesData={{need:caloriesNeed, consumed:caloriesConsumed, percent:caloriesPercentConsumed}} carbData={{need:carbsNeed, consumed:carbsConsumed, percent:carbConsumedPercent}} proteinData={{need:proteinsNeed, consumed:proteinsConsumed, percent:proteinConsumedPercent}} fatData={{need:fatNeed, consumed:fatConsumed, percent:fatConsumedPercent}}></TrackingTab>
      <TrackingTab img={lunchIcon} tab="Lunch" caloriesData={{need:caloriesNeed, consumed:caloriesConsumed, percent:caloriesPercentConsumed}} carbData={{need:carbsNeed, consumed:carbsConsumed, percent:carbConsumedPercent}} proteinData={{need:proteinsNeed, consumed:proteinsConsumed, percent:proteinConsumedPercent}} fatData={{need:fatNeed, consumed:fatConsumed, percent:fatConsumedPercent}}></TrackingTab>
      <TrackingTab img={dinnerIcon} tab="Dinner" caloriesData={{need:caloriesNeed, consumed:caloriesConsumed, percent:caloriesPercentConsumed}} carbData={{need:carbsNeed, consumed:carbsConsumed, percent:carbConsumedPercent}} proteinData={{need:proteinsNeed, consumed:proteinsConsumed, percent:proteinConsumedPercent}} fatData={{need:fatNeed, consumed:fatConsumed, percent:fatConsumedPercent}}></TrackingTab>
    </SafeAreaView>
  );
}

export default TrackingHomeScreen;
