import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container3}>
      {/* <Image style={styles.image} source={require("../assets/welcome.png")} /> */}
      </View>
      {/* <Image source={require("../assets/welcome.png")} /> */}

      <View style={styles.container1}>
      <Image style={styles.image} source={require("../../../assets/images/welcome.png")} />

        <View style={styles.container}>
          <Text style={styles.welcome1}>
            Wellness Mate quan tâm đến sức khỏe của bạn
          </Text>
          <Text style={styles.welcome2}>
            Hãy bắt đầu cuộc hành trình này và có được sức khỏe tuyệt vời cùng
            nhau!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("IntroSliders")}
          >
            <Text style={styles.buttonText}>Bắt đầu nào!</Text>
          </TouchableOpacity>
          
          {/* <Text style={styles.notAccount}>Bạn đã có tài khoản?</Text> */}
          <TouchableOpacity 
            style={styles.register} 
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.registers}>Bạn đã có tài khoản? Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#26B3A0",
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
    width: "100%",
    paddingBottom: 450,
    alignItems: "center", // Center the button horizontally
  },
  button: {
    backgroundColor: "#FFC548",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    position: "absolute", // Use absolute positioning
    bottom: 130, // Adjust the bottom position as needed
    width: "80%",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  buttonText1: {
    textAlign: "center",
  },
  notAccount: {
    position: "absolute",
    bottom: 50,
    color: "white",
    left: 110,
  },
  register: {
    position: "absolute",
    bottom: 50,
    color: "white",
  },
  registers: {
    color: "white",
    fontWeight: "bold",
  },
  welcome1: {
    position: "absolute",
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    width: "68%",
    top: 100,
  },
  welcome2: {
    position: "absolute",
    color: "white",
    fontSize: 17,
    textAlign: "center",
    width: "71%",
    top: 190,
  },
  container1: {
    backgroundColor: "#93DADC",
    alignItems: "center",
    justifyContent: "center",
  },
  container3: {
    flex: 1,
    backgroundColor: "#93DADC",
    alignItems: "center"
    // justifyContent: "center",
  },
  image: {
    marginBottom: -14
  }
});
