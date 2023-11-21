import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../auth/FireBaseConfig";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const FitDetailScreen = () => {
  const route = useRoute();
  // console.log(route.params);
  const navigation = useNavigation();
  const excersise = route.params.excersise;
  // console.log(current, "first excersise");
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [userDatas, setUserData] = useState(null);

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

        if (userData.finalResults - excersise.calories < 0) {
          alert('You have practiced enough for today!')
          return; // Exit the function, don't update the data
        }

              // Save excersise.sets, excersise.minutes, and excersise.calories to AsyncStorage
      // await AsyncStorage.setItem('excersise_sets', excersise.sets.toString());
      // await AsyncStorage.setItem('excersise_minutes', excersise.minutes.toString());
      // await AsyncStorage.setItem('excersise_calories', excersise.calories.toString());

        const finalResults = userData.finalResults - excersise.calories;
        const wkNum = userData.wkNum + 1;
        const wkMinutes = userData.wkMinutes + excersise.minutes;
        const wkCalories = userData.wkCalories + excersise.calories;

        // Update the data in the existing document
        const updatedData = {
          finalResults,
          wkNum,
          wkMinutes,
          wkCalories,
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
    <SafeAreaView style={{ marginTop: 50, backgroundColor: "white" }}>
      {/* <Image
        style={{ width: "100%", height: 370 }}
        source={{ uri: excersise.image }}
      /> */}
     
      <Text
        style={{
          marginVertical: 15,

          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {excersise.name}
      </Text>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 20, left: 20 }}
        name="arrow-back-outline"
        size={28}
        color="black"
      />

        {/* <Video
          ref={video}
          style={{ width: "100%", height: 250 }}
          source={{
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          }}
          useNativeControls
          //   resizeMode=
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        /> */}
        {console.log(excersise.video)}
        <YoutubePlayer
        height={250}
        play={true}
        videoId={excersise.video}
        // onChangeState={onStateChange}
      />
      
        

      <View style={{ backgroundColor: "white", height: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 40,
          }}
        >
          <View
            style={{
              width: 120,
              height: 30,
              borderRadius: 10,
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Set: {excersise.sets}
            </Text>
          </View>

          <View
            style={{
              width: 120,
              height: 30,
              borderRadius: 10,
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Minutes: {excersise.minutes}
            </Text>
          </View>

          <View
            style={{
              width: 120,
              height: 30,
              borderRadius: 10,
              backgroundColor: "black",
            }}
          >
            <Text
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                fontWeight: "bold",
                fontSize: 18,
                color: "white",
              }}
            >
              Calories: {excersise.calories}
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {excersise.description}
          </Text>
        </View>

        <Pressable
          onPress={handleFabPress}
          style={{
            backgroundColor: "black",
            marginHorizontal: 100,
            marginVertical: 40,
            borderRadius: 30,
            padding: 10,
            width: 200,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            Done
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FitDetailScreen;

const styles = StyleSheet.create({});
