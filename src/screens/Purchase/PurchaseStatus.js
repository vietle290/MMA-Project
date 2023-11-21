import React from "react";
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from '../../../auth/FireBaseConfig';
import { signOut } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIRESTORE_DB } from "../../../auth/FireBaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { updateDoc, Timestamp } from "firebase/firestore";





export default function PurchaseStatus({ navigation }) {
    const auth = FIREBASE_AUTH;

  const handleLinkPress = () => {
    // Define the URL you want to open when the button is pressed
    const url = 'https://me.momo.vn/w6Ibi8idiyubTWsyieT9/APdRljg50y9LaGy';

    // Use the Linking module to open the URL
    Linking.openURL(url);
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      // Navigate to your sign-in or home screen, or any other desired behavior
      navigation.navigate('Welcome'); // Change 'SignIn' to the appropriate screen name
    } catch (error) {
      console.error('Sign out failed: ', error);
    }
  };

  const retrieveUserData = async () => {
    // Check if the user is authenticated
    try{
     if (FIREBASE_AUTH.currentUser) {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const usersCollection = collection(FIRESTORE_DB, "users");
      const usersDoc = doc(usersCollection, userId);
      const usersDocSnapshot = await getDoc(usersDoc);
      const userData = usersDocSnapshot.data();
      if (userData.dayPremium > 0) {
        if(userData.dayPremium > 0) {
        //   const currentDate = Date.now();
          const newDayPremiumStart = Timestamp.fromMillis(Date.now());
          await updateDoc(usersDoc, {
            dayPremiumStart: newDayPremiumStart,
          })
          const dayPremiumStart = userData.dayPremiumStart;
          const newDayPremium = userData.dayPremium;

        //   const docSnapshot = await getDoc(usersDoc);
        //   const currentData = docSnapshot.data();
        //   const dayPremiumEnd = currentData.dayPremiumEnd;
          // const dayPremiumEnd = userData.dayPremiumEnd;
          
          const newDayPremiumEnd = Timestamp.fromMillis(dayPremiumStart.toMillis() + newDayPremium * 24 * 60 * 60 *1000);
          

        //   await updateDoc(usersDoc, {
        //     dayPremium: newDayPremium,
        //     dayPremiumEnd: newDayPremiumEnd,
        //     statusPremium: true,
        //   })


          if(abc) {
            await updateDoc(usersDoc, {
              dayPremium: newDayPremium,
              dayPremiumStart,
              dayPremiumEnd: newDayPremiumEnd,
              statusPremium: true, // Set statusPremium to true
            });
          }
        //   if (userData.statusPremium) {
        //     // Navigate to "BottomTab" if statusPremium is true
        //     navigation.navigate("BottomTab"); // Replace with your actual screen name
        //   } else {
        //     navigation.navigate("Welcome")
        //   }


        }
      }

    } else {
      // User is not authenticated
      console.log("User is not authenticated");
    }
    } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error
      }

  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveUserData(); // Call the function to retrieve user data
    }, [])
  );

  return (
    
    <View style={{backgroundColor:"#f0ede8", marginTop:20}}>
        <View style={{flexDirection:"column", justifyContent:"center", marginTop: 40}}>
        <TouchableOpacity style={{marginLeft: 30}} onPress={handleSignOut}>
      <Icon name="chevron-left" size={20} color="gray" />
      </TouchableOpacity>
<View style={{flexDirection:"row", alignItems:"center", alignSelf:"center"}}>

                <Text style={{textAlign:"center", fontSize:28, fontWeight:"bold"}} >Get Premium</Text>

</View>
            <Text style={{textAlign:"center", fontSize:17, marginBottom:20, marginTop:10}}>
                Get No Limited Exciting Features
            </Text>
        </View>
        <View>
            <Image style={{height:150, width:260, marginLeft:80 }} source={require("../../../assets/images/PurchaseImg/payment.png")} />
        </View>
        <View style={{marginTop: 20}}>
            <Text style={{color: "#2b5774", fontSize: 25, textAlign: "center", fontWeight:"bold"}}>Secure</Text>
            <Text style={{color: "#2b5774", fontSize: 17, textAlign: "center", fontWeight: "bold", marginHorizontal: 60}}>Transfer obtuscate traffic via encrypted tunnel</Text>
        </View>
        <View style={{backgroundColor:"#001c2e", width: "65%", paddingVertical: 20, alignSelf: "center", marginTop: 40, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 20, textAlign:"center"}}>Option</Text>
        </View>
        <View style={{backgroundColor: "white", width: "65%", alignSelf: "center", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderWidth: 1}}>
            <Text style={{textAlign: "center", fontSize: 50, color: "#184562"}}>
                1
            </Text>
            <Text style={{textAlign: "center", fontSize: 20, color: "#184562", fontWeight:"bold"}}>
                Monthly
            </Text>
            <View style={{flexDirection: "row", alignSelf:"center", marginTop: 15, marginBottom: 10}}>
                <Text style={{fontWeight: "bold", fontSize: 25 ,color: "#184562"}}>$</Text>
                <Text style={{fontWeight: "bold", fontSize: 25, color: "#184562"}}>2.5</Text>
            </View>
        </View>
        <TouchableOpacity onPress={handleLinkPress} style={{ backgroundColor: "#001c2e", width: "70%", height: "7%", alignSelf: "center", marginTop: 20, justifyContent: "center", alignItems: "center", borderRadius: 30  }}>
            <Text style={{ color: "white", textAlign: "center", fontWeight:"bold", fontSize: 25}}>GET NOW</Text>
        </TouchableOpacity>

    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#41ce8",
    flex: 1
  },
  HeaderText1: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 35
  },
  HeaderText2: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  Header: {
    marginTop: 50
  },
  image: {
    alignSelf: "center",
    marginTop: 20,
  }

});



