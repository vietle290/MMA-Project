import React from "react";
import { View,Text,Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { FAB } from "react-native-paper";
import TrackingScreen from "../../screens/Tracking/TrackingScreen";

export const TrackingTab = (props) => {
  // const img = "../../../assets/images/TrackingImg/breakFastIcon.png";
  // if (props.tab == 'Lunch'){
  //  img = "../../../assets/images/TrackingImg/lunchIcon.png";
  // }
  const navigation = useNavigation();
  const handleFabPress = () => {
    navigation.navigate("TrackingScreen",{ name: props.tab, calories: props.caloriesData , carb: props.carbData, protein: props.proteinData, fat: props.fatData, foodList: props.foodList }); // Replace 'AddFood' with the actual name of your component in your navigation stack.
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          marginVertical: 10,
          marginHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            margin: 15,
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              style={{ height: 60, width: 60 }}
              source={props.img}
            />
          </View>

          <View style={{ marginLeft: 15, justifyContent: "space-evenly" }}>
            <Text style={{ fontSize: 16 }}>{props.tab}</Text>
            <Text style={{ fontSize: 12 }}>Recommend 625 - 875 calories</Text>
          </View>

          <View>
            <FAB
              style={{
                marginLeft: 40,
                backgroundColor: "#f0ede8",
                borderRadius: 30,
              }}
              icon="plus"
              onPress={handleFabPress}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
