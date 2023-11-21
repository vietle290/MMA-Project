import React from "react";
import { View, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TrackedFoodList } from "./TrackedFoodList";
import foodTracking from "../../../assets/images/TrackingImg/foodTracking.png"
const Tab = createMaterialTopTabNavigator();

export const TopTab = (second) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "#41ce8c",
        },
        tabBarStyle: {
          borderRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Tracked"
        component={TrackedFoodList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={foodTracking}
              style={{ width: 24, height: 24 }}
            />
          ),
          tabBarLabelStyle: {
            fontWeight: "500",
          },
        }}
      />
    </Tab.Navigator>
  );
};
