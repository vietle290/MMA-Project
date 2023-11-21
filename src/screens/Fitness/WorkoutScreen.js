import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
    ScrollView,
  } from "react-native";
  import React, { useContext } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { Ionicons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  const WorkOutScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
   
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#f0ede8", marginTop: 50 }}
        >
          {/* <Image
            style={{ width: "100%", height: 250 }}
            source={{ uri: route.params.image }}
          /> */}
          <Text style={{fontSize:25, fontWeight:"bold", textAlign:"center", marginTop:10}}>{route.params.name}</Text>
  
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, left: 20 }}
            name="arrow-back-outline"
            size={28}
            color="black"
          />
          <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor:"#f0ede8" }}>
            {route.params.excersises.map((item, index) => (
              <Pressable
               onPress={() => {
                navigation.navigate('FitDetailScreen',{
                    excersise: item 
                });
               }}
                style={{ margin: 10, flexDirection: "row", alignItems: "center", backgroundColor:"white", borderRadius:15, padding:15 }}
                key={index}
              >
                <Image
                  style={{ width: 70, height: 70, borderRadius:35 }}
                  source={{ uri: item.image }}
                />
  
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 17, fontWeight: "bold", width: 170 }}>
                    {item.name}
                  </Text>

                  <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                    {item.mode} Mode
                  </Text>
  
                  <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                    Set: {item.sets}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
  
        {/* <Pressable
          onPress={() => {
            navigation.navigate("Fit", {
              excersises: route.params.excersises,
            });
            setCompleted([]);
            setWorkout(workout + 5);
              setMinutes(minutes + 40);
              setCalories(calories + 120);
              navigation.navigate('FitnessHome')
          }}
          style={{
            backgroundColor: "blue",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
            width: 120,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            DONE
          </Text>
        </Pressable> */}
      </>
    );
  };
  
  export default WorkOutScreen;
  
  const styles = StyleSheet.create({});
  