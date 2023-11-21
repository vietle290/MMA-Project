import * as React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FitnessHomeScreen from "../../screens/Fitness/FitnessHome";
// import Purchase from "../../screens/Purchase/purchase";
import Purchase from "../../screens/Purchase/PurchaseScreen";
import RecipeHomeScreen from "../../screens/Recipe/RecipeHomeScreen";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProfileScreen } from "../../screens/Profile/ProfileScreen";

import TrackingHomeScreen from "../../screens/Tracking/TrackingHomeScreen";
import 'react-native-gesture-handler';



function Default() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Comming Soon!</Text>
    </View>
  );
}

function Tracking() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tracking</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel:false, tabBarActiveTintColor:"green" }} >
      <Tab.Screen
        name="Tracking"
        component={TrackingHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="home" size={30} color={color}/>

          ),
        }}
      />

      <Tab.Screen
        name="FitnessHomeScreen"
        component={FitnessHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="fitness-center" size={30}  color={color}/>
           
          ),
        }}
      />
      <Tab.Screen
        name="Purchase"
        component={Purchase}
        options={{
          tabBarIcon: ({ color, size }) => (

            <MaterialIcon name="payments" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="rice-bowl" size={30} color={color} />

           
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="account" size={30} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
