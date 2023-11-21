

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../auth/FireBaseConfig";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

function Header() {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 20 }}>
      <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="gray" />
      </TouchableOpacity>
        <Text
          style={{
            color: "#22ba3a",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 35,
            lineHeight: 35,
            paddingTop: 50,
          }}
        >
          Create Account
        </Text>

        <Text
          style={{
            marginTop: 3,
            color: "black",
            fontWeight: 400,
            fontSize: 20,
            lineHeight: 24,
            paddingLeft: 10,
            marginTop: 20,
            marginHorizontal: 30,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Create an account so you can explore all the existing jobs
        </Text>
      </View>
    </View>
  );
}

function Body() {

  const getHeightFromAsyncStorage = async () => {
    try {
      const height = await AsyncStorage.getItem("user_height");
      return height;
    } catch (error) {
      console.error("Error retrieving height from AsyncStorage:", error);
      return null;
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

  const getGenderFromAsyncStorage = async () => {
    try {
      const gender = await AsyncStorage.getItem("selected_gender");
      return gender;
    } catch (error) {
      console.error("Error retrieving gender from AsyncStorage:", error);
      return null;
    }
  };

  const getAgeFromAsyncStorage = async () => {
    try {
      const age = await AsyncStorage.getItem("user_age");
      return age;
    } catch (error) {
      console.error("Error retrieving age from AsyncStorage:", error);
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
  
  const getWeightGFromAsyncStorage = async () => {
    try {
      const weightg = await AsyncStorage.getItem("user_weightg");
      return weightg;
    } catch (error) {
      console.error("Error retrieving weightg from AsyncStorage:", error);
      return null;
    }
  };

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true); // Add validPassword state variable
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validEmailDomain, setValidEmailDomain] = useState(true);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

  // const signUp = async () => {
  //   try {
  //     const height = await getHeightFromAsyncStorage(); // Retrieve the height
  //     const plan = await getPlanFromAsyncStorage();
  //     const gender = await getGenderFromAsyncStorage();
  //     const age = await getAgeFromAsyncStorage();
  //     const weight = await getWeightFromAsyncStorage();
  //     const weightg = await getWeightGFromAsyncStorage();
  //     const response = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = response.user;
  //     const userId = user.uid;
  //     // console.log(response);

  //     const userDocRef = doc(db, "users", userId);
  //     await addDoc(userDocRef, { email, height, plan, gender, age, weight, weightg });
  
  //     // Send verification email
  //     // const user = response.user;
  //     // await sendEmailVerification(user);
  
  //     // Navigate to the login screen
  //     navigation.navigate("LoginScreen");
  //   } catch (error) {
  //     console.log(error);
  //     alert('Sign up failed: ' + error.message);
  //   }
  // }



  const signUp = async () => {
    try {
      const height = await getHeightFromAsyncStorage(); // Retrieve the height
      const plan = await getPlanFromAsyncStorage();
      const gender = await getGenderFromAsyncStorage();
      const age = await getAgeFromAsyncStorage();
      const weight = await getWeightFromAsyncStorage();
      const weightg = await getWeightGFromAsyncStorage();
      let bmr;
      if (gender === "Nữ") {
        bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
      } else if (gender === "Nam") {
        bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
      } else {
        // Handle other gender cases here
        bmr = 0;
      }
      const tdee = bmr * 1.55;
      let finalResult = tdee;
      let needWeight;
      if (plan === "Ăn một chế độ cân bằng") {
        needWeight = 0;
        finalResult = tdee;
      } else if (plan === "Tăng cân") {
        needWeight = ((weightg - weight) * 7700) / 500;
        finalResult = tdee + 500;
      } else if (plan ===  "Giảm cân") {
        needWeight = ((weight - weightg) * 7700) / 500;
        finalResult = tdee - 500;
      }
      const finalResults = finalResult;
      const needWeights = needWeight;
      const fat = 0.3 * finalResults / 9;
      const protein = 0.2 * finalResults / 4;
      const carbohydrate = 0.5 * finalResults / 4;
      const consumeCalo = 0;
      const consumeCarb = 0;
      const consumeProtein = 0;
      const consumeFat = 0;
      const wkNum = 0;
      const wkCalories = 0;
      const wkMinutes = 0;
      const dayPremium = 3; // Initialize with 3 days of premium
      const statusPremium = true; // Initially, the user has a premium status
      const dayPremiumStart = Timestamp.fromMillis(Date.now());
      const dayPremiumEnd = Timestamp.fromMillis(Date.now() + dayPremium * 24 * 60 * 60 * 1000);


      if (password !== confirmPassword) {
        alert("Confirm passwords do not match, please try again!");
        return;
      }
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await sendEmailVerification(user);
      alert("Please verify email before sign in!")
      const userId = user.uid;

      // console.log(response);

      const usersCollection = collection(db, 'users')
      const userDocRef = doc(usersCollection, userId);
      const userData = {
        userId,
        height,
        plan,
        gender, 
        age,
        weight,
        weightg,
        email,
        tdee,
        finalResults,
        needWeights,
        fat,
        protein,
        carbohydrate,
        consumeCalo,
        consumeCarb,
        consumeFat,
        consumeProtein,
        wkCalories,
        wkMinutes,
        wkNum,
        dayPremium,
        statusPremium,
        dayPremiumStart,
        dayPremiumEnd,
      }
      // await addDoc(userDocRef, { email, height, plan, gender, age, weight, weightg });
  
      // Send verification email
      // const user = response.user;
      // await sendEmailVerification(user);
      await signOut(auth);
  
      await setDoc(userDocRef, userData);

      await AsyncStorage.multiRemove([
        "selected_plan",
        "selected_gender",
        "user_age",
        "user_weight",
        "user_weightg",
        "user_height"
      ]);
      await signOut(auth);
      // Navigate to the login screen
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    }
  }

  const updatePremiumStatus = async () => {
    try {
      // Get all user documents
      const usersCollection = collection(db, 'users');
      const userDocs = await getDocs(usersCollection);
  
      for (const userDoc of userDocs.docs) {
        const userData = userDoc.data();
        if (userData.dayPremium > 0) {
          // Decrement dayPremium and update statusPremium
          userData.dayPremium -= 1;
          if (userData.dayPremium === 0) {
            userData.statusPremium = false;
          }
  
          // Update the Firestore document
          await updateDoc(userDoc.ref, userData);
        }
      }
    } catch (error) {
      console.error('Error updating premium status:', error);
    }
  }
  
  
  // const sendEmailVerification = async (user) => {
  //   try {
  //     await sendEmailVerification(user);
  //     console.log('Verification email sent');
  //     alert('Verification email sent. Please check your email to verify your account.');
  //   } catch (error) {
  //     console.log(error);
  //     alert('Failed to send verification email: ' + error.message);
  //   }
  // }
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!/^[A-Z].*[!@#$%^&*()]$/.test(text)) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  
    // Add this condition to set validPassword to true if the password is null
    if (text === "") {
      setValidPassword(true);
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder="Email"
        style={[
          styles.input,
          !validEmailDomain && { borderColor: "red", borderWidth: 1 },
        ]}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          const emailRegex = /^[\w-]+(\.[\w-]+)*@gmail\.com$|^[\w-]+(\.[\w-]+)*@email\.com$/;
          if (text.trim() === "") {
      setValidEmailDomain(true); // Reset the validEmailDomain state when the email field is empty
    } else {
      setValidEmailDomain(emailRegex.test(text));
    }
        }}
      ></TextInput>
      {!validEmailDomain && (
        <Text style={{ color: "red" }}>Valid email domain( @gmail.com, @email.com )</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
      />
          {!validPassword && (
      <Text style={styles.warningText}>
        Password must start with an uppercase letter and end with a special character
      </Text>
    )}
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      ></TextInput>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={signUp}
      >
        <Text style={styles.signupButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

function Footer() {
  const navigation = useNavigation();
  const navigateLogin = async () => {
    await AsyncStorage.multiRemove([
      "selected_plan",
      "selected_gender",
      "user_age",
      "user_weight",
      "user_weightg",
      "user_height"
    ]);
    navigation.navigate("LoginScreen");
  }
  return (
    <View
      style={{
        backgroundColor: "#f1edea",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#f1edea",
          marginBottom: 0,
          width: "100%",
          paddingBottom: 50,
          alignItems: "center",
        }}
      >

        <TouchableOpacity
          style={styles.loginLink}
          onPress={navigateLogin}
        >
          <Text style={styles.loginLinkText}>
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Register() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f1edea",
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Header />
          <Body />
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Footer />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 25,
    width: 350,
    backgroundColor: "#f1f4ff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 20,
  },
  signupButton: {
    marginTop: 40,
    backgroundColor: "#22ba3a",
    paddingVertical: 15,
    borderRadius: 8,
    width: 350,
    alignItems: "center",
  },
  signupButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 40,
    color: "white",
  },
  loginLinkText: {
    color: "#737373",
    fontWeight: "bold",
  },
  continueWithText: {
    color: "#22ba3a",
    fontWeight: "bold",
    marginTop: 80,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  socialButton: {
    backgroundColor: "#b4b4b5",
    textAlign: "center",
    paddingHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonImage: {
    // Add image styles here
  },
  warningText: {
    color: 'red',
    marginTop: 5,
    width: "80%"
  },
});

export default Register;
