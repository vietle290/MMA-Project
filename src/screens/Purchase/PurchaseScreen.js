import React from "react";
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Purchase() {
  const handleLinkPress = () => {
    // Define the URL you want to open when the button is pressed
    const url = 'https://me.momo.vn/w6Ibi8idiyubTWsyieT9/APdRljg50y9LaGy';

    // Use the Linking module to open the URL
    Linking.openURL(url);
  };

  return (
    <View style={{backgroundColor:"#f0ede8", marginTop:20}}>
        <View style={{flexDirection:"column", justifyContent:"center", marginTop: 40}}>
            <Text style={{textAlign:"center", fontSize:28, fontWeight:"bold"}} >Get Premium</Text>
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



