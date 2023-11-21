import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library
import Slides1 from "./Slides1";
import Slides2 from "./Slides2";
import Slides3 from "./Slides3";
import Slides4 from "./Slides4";
import Slides5 from "./Slides5";
import Slides6 from "./Slides6";
import AsyncStorage from "@react-native-async-storage/async-storage";


const IntroSliders = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigation = useNavigation(); // Initialize the useNavigation hook

  // const handleNext = () => {
  //   if (currentSlide < 6) {
  //     setCurrentSlide(currentSlide + 1);
  //   } else {
  //     navigation.navigate("Register"); // Navigate to LoginScreen when on the last slide
  //   }
  // };

  const handleNext = async () => {
    const selectedPlan = await getPlanFromAsyncStorage();
    const userWeightG = await getSavedWeightG();
    const userWeight = await getWeightFromAsyncStorage();
  
    if (currentSlide < 6) {
      setCurrentSlide(currentSlide + 1);
    } else {
      if (
        (selectedPlan === "Ăn một chế độ cân bằng" && userWeightG === userWeight) ||
        (selectedPlan === "Tăng cân" && userWeightG > userWeight) ||
        (selectedPlan === "Giảm cân" && userWeightG < userWeight)
      ) {
        navigation.navigate("Register"); // Navigate to Register when on the last slide
      } else {
        alert("You have to type correct goal weight according to your current weight "); // Display an alert
        setCurrentSlide(currentSlide); // Reset the current slide to stay on the current slide
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    } else {
      navigation.navigate("Welcome"); // Navigate to Welcome when on the first slide
    }
  };
  

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slides1 />;
      case 2:
        return <Slides2 />;
      case 3:
        return <Slides3 />;
      case 4:
        return <Slides4 />;
      case 5:
        return <Slides5 />;
      case 6:
        return <Slides6 />;
      default:
        return null;
    }
  };

  const getSavedWeightG = async () => {
    try {
      const savedWeightG = await AsyncStorage.getItem("user_weightg");
      return savedWeightG;
    } catch (error) {
      console.error("Error retrieving weight:", error);
    }
  };

  const getPlanFromAsyncStorage = async () => {
    try {
      const plan = await AsyncStorage.getItem("selected_plan");
      return plan;
    } catch (error) {
      console.error("Error retrieving plan from AsyncStorage:", error);
      return null;
    }
  };

      const getWeightFromAsyncStorage = async () => {
      try {
        const weight = await AsyncStorage.getItem("user_weight");
        return weight;
      } catch (error) {
        console.error("Error retrieving weight from AsyncStorage:", error);
        return null;
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.pageIndicatorContainer}>
        <View>
          <TouchableOpacity
            style={[styles.button1, {}]}
            onPress={handlePrevious}
          >
            <Icon name="chevron-left" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.pageIndicator,
            currentSlide === 1 && styles.activePage,
          ]}
        />
        <View
          style={[
            styles.pageIndicator,
            currentSlide === 2 && styles.activePage,
          ]}
        />
        <View
          style={[
            styles.pageIndicator,
            currentSlide === 3 && styles.activePage,
          ]}
        />
        <View
          style={[
            styles.pageIndicator,
            currentSlide === 4 && styles.activePage,
          ]}
        />
        <View
          style={[
            styles.pageIndicator,
            currentSlide === 5 && styles.activePage,
          ]}
        />
        <View
          style={[
            styles.pageIndicator,
            currentSlide === 6 && styles.activePage,
          ]}
        />
      </View>
      <View style={styles.slideContainer}>{renderSlide()}</View>
      <Text style={{color: "gray", marginBottom: 20, textAlign: "center", marginHorizontal: 25}}>We use this information to calculate and provide you with daily personalized recommendations.</Text>
      <View style={styles.buttonContainer}>
      
        <TouchableOpacity
          style={[
            styles.button2,
            { justifyContent: "center", alignItems: "center" },
          ]}
          onPress={handleNext}
        >
        <Text style={{color: "white"}}>Next</Text>
          {/* <Icon name="chevron-right" size={20} color="gray" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1edea",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageIndicatorContainer: {
    flexDirection: "row",
    marginBottom: -100,
    marginTop: 60,
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ebe8df",
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  activePage: {
    backgroundColor: "#21ba3b",
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    backgroundColor: "#f1edea",
    marginBottom: 0,
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
    width: "100%",
    paddingBottom: 70,
    alignItems: "center", // Center the button horizontally
  },
  button1: {
    height: 45,
    paddingHorizontal: 5,
    position: "absolute",
    top: -5,
    left: -40
  },
  button2: {
    backgroundColor: "#21ba3b",
    position: "absolute",
    height: 45,
    width: "90%",
    borderRadius: 6,

  },
  buttonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    flex: 1,
  },
});

export default IntroSliders;
