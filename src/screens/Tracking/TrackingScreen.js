import * as React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopTab } from "../../components/Tracking/TopTab";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../auth/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

function TrackingScreen(props) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const route = useRoute();
  const { params } = route;
  // const calories = route.params.calories;
  // const carb = route.params.carb;
  // const protein = route.params.protein;
  // const fat = route.params.fat;
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
    
      useEffect(() => {
        // Call the function to retrieve user data when the screen is focused
        if (isFocused) {
          retrieveUserData();
        }
      }, [isFocused]);




  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f0ece8", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingBottom: 20,
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <View>
          <TouchableOpacity style={{paddingTop: 37}} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              width: 350,
              paddingTop: 30,
              fontSize: 22,
              fontWeight: "bold",
              marginLeft: 10,

              backgroundColor: "white",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            {/* {route.params.name}  */}
            Tracking
          </Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          height: "15%",
          backgroundColor: "white",
          borderRadius: 10,
          width: "90%",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "75%",
          }}
        >
          <View style={{ paddingBottom: 4 }}>
            <Text style={{ fontWeight: "bold" }}>Daily Intaken</Text>
          </View>
          <View style={{ paddingBottom: 4 }}>
            <Text style={{ fontWeight: "bold" }}>
              {userDatas && parseInt(userDatas.consumeCalo)}/
              {userDatas && parseInt(userDatas.finalResults)} kcal
            </Text>
          </View>
        </View>

        <View style={{ width: "78%", paddingBottom: 10 }}>
          <ProgressBar progress={percentCalo} color={"brown"} />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "90%",
            height: "50%",

            // marginTop:20
          }}
        >
          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center", paddingBottom: 4 }}>Carbs</Text>
            <ProgressBar progress={percentCarb} color={"red"} />
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              {userDatas && parseInt(userDatas.consumeCarb)}/
              {userDatas && parseInt(userDatas.carbohydrate)}
            </Text>
          </View>

          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center", paddingBottom: 4 }}>
              Protein
            </Text>
            <ProgressBar progress={percentProtein} color={"blue"} />
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              {userDatas && parseInt(userDatas.consumeProtein)}/
              {userDatas && parseInt(userDatas.protein)}
            </Text>
          </View>

          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center", paddingBottom: 4 }}>Fat</Text>
            <ProgressBar progress={percentFat} color={"brown"} />
            <Text style={{ textAlign: "center", paddingTop: 4 }}>
              {userDatas && parseInt(userDatas.consumeFat)}/
              {userDatas && parseInt(userDatas.fat)}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: "60%", width: "92%", marginTop: 20 }}>
        <TopTab />
      </View>
    </SafeAreaView>
  );
}
export default TrackingScreen;
