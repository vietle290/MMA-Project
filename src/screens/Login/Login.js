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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH } from "../../../auth/FireBaseConfig";
import { FIRESTORE_DB } from "../../../auth/FireBaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { getDocs, collection, query, where, updateDoc, Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
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
            paddingTop: 100,
          }}
        >
          Login here
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
          Welcome back you've been missed!
        </Text>
      </View>
    </View>
  );
}

function Body() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [validEmailDomain, setValidEmailDomain] = useState(true);
  const [validPassword, setValidPassword] = useState(true); // Add validPassword state variable
  

  const auth = FIREBASE_AUTH;
  // const autht = FIRESTORE_DB;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  // Your Firebase Authentication and Firestore initialization

  // const signIn = async () => {
  //   const db = FIRESTORE_DB;
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, email, password);
  //     const user = response.user; // This contains the signed-in user's information

  //     if (!user.emailVerified) {
  //       alert("Email is not verified. Please verify your email before signing in.");
  //       // Optionally, you can provide a way for the user to resend the verification email.
  //       // You can call sendEmailVerification again and display a message.
  //       // await sendEmailVerification(user);
  //       navigation.navigate("LoginScreen")
  //       return;
  //     }
  //     // Now, you can use user.uid to fetch user data from Firestore
  //     const userId = user.uid;

  //     try {
  //       const userDocRef = doc(db, "users", userId); // Replace "users" with the actual Firestore collection name
  //       const userDoc = await getDoc(userDocRef);
  //       const userData = userDoc.data();

  //       // Save userData in AsyncStorage
  //       await AsyncStorage.setItem("userData", JSON.stringify(userData));
  //       console.log("User data saved to AsyncStorage:", userData);

  //       // You can also save the user's ID for future reference
  //       await AsyncStorage.setItem("userId", userId);
  //       console.log("User ID saved to AsyncStorage:", userId);

  //       // Continue with navigation or other actions
  //       navigation.navigate("BottomTab");
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       // Handle the error
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Invalid email or password");
  //   }
  // };

  const signIn = async () => {
    const db = FIRESTORE_DB;
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const user = response.user; // This contains the signed-in user's information

      if (!user.emailVerified) {
        alert("Email is not verified. Please verify your email before signing in.");
        // Optionally, you can provide a way for the user to resend the verification email.
        // You can call sendEmailVerification again and display a message.
        // await sendEmailVerification(user);
        navigation.navigate("LoginScreen")
        return;
      }
      // Now, you can use user.uid to fetch user data from Firestore
      const userId = user.uid;

      try {
        const userDocRef = doc(db, "users", userId); // Replace "users" with the actual Firestore collection name
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        if (userData.dayPremium > 0) {
          if(userData.dayPremium > 0) {
            const currentDate = Date.now();
            const newDayPremiumStart = Timestamp.fromMillis(Date.now());
            await updateDoc(userDocRef, {
              dayPremiumStart: newDayPremiumStart,

            })

            const userDocRefss = doc(db, "users", userId); // Replace "users" with the actual Firestore collection name
            const userDocss = await getDoc(userDocRefss);
            const userDatass = userDocss.data();

            const dayPremiumStart = userDatass.dayPremiumStart;
            const newDayPremium = userDatass.dayPremium;

            const docSnapshot = await getDoc(userDocRef);
            const currentData = docSnapshot.data();
            const dayPremiumEnd = currentData.dayPremiumEnd;
            // const dayPremiumEnd = userData.dayPremiumEnd;
            
            const newDayPremiumEnd = Timestamp.fromMillis(dayPremiumStart.toMillis() + newDayPremium * 24 * 60 * 60 *1000);
            

            await updateDoc(userDocRef, {
              dayPremiumStart: newDayPremiumStart,
              dayPremium: newDayPremium,
              dayPremiumEnd: newDayPremiumEnd,
              statusPremium: true,
            })

            if (currentDate > dayPremiumEnd.toMillis()) {
              await updateDoc(userDocRef, {
                dayPremium: 0, // Set dayPremium to 0
                dayPremiumStart: null, // Reset dayPremiumStart
                dayPremiumEnd: null,
                statusPremium: false, // Set statusPremium to false
              });
            } 
            // else {
            //   await updateDoc(userDocRef, {
            //     dayPremium: newDayPremium,
            //     dayPremiumStart,
            //     dayPremiumEnd: newDayPremiumEnd,
            //     statusPremium: true, // Set statusPremium to true
            //   });
            // }
            // if (userData.statusPremium) {
            //   // Navigate to "BottomTab" if statusPremium is true
            //   navigation.navigate("BottomTab"); // Replace with your actual screen name
            // } else {
            //   navigation.navigate("Welcome")
            // }


          }
        }
        const userDocRefs = doc(db, "users", userId); // Replace "users" with the actual Firestore collection name
        const userDocs = await getDoc(userDocRefs);
        const userDatas = userDocs.data();
        if (userDatas.statusPremium === true) {
          // If statusPremium is true, navigate to "BottomTab"
          navigation.navigate("BottomTab");
        } else {
          // If statusPremium is false, navigate to "Purchase" (replace with your actual screen name)
          alert("Your premium is expired! Please upgrade your account.");

          navigation.navigate("PurchaseStatus");
        }

        // Save userData in AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        console.log("User data saved to AsyncStorage:", userData);

        // You can also save the user's ID for future reference
        await AsyncStorage.setItem("userId", userId);
        console.log("User ID saved to AsyncStorage:", userId);

        // Continue with navigation or other actions

      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error
      }
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    }
  };

  const resetPassword = async () => {
    if (email != null) {
      try {
        // Step 1: Fetch all user emails from Firestore
        const usersRef = collection(FIRESTORE_DB, 'users');
        const usersQuery = query(usersRef);
        const usersSnapshot = await getDocs(usersQuery);
        const userEmails = [];
  
        usersSnapshot.forEach((doc) => {
          userEmails.push(doc.data().email);
        });
  
        // Step 2: Check if the entered email exists in the list of user emails
        if (userEmails.includes(email)) {
          // Step 3: Send a password reset email
          try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email has been sent!");
          } catch (error) {
            console.error("Error sending password reset email:", error);
            alert("An error occurred while sending the password reset email. Please try again.");
          }
        } else {
          alert("Account not found. Please check the email or create an account.");
        }
      } catch (error) {
        console.error("Error fetching user emails:", error);
        alert("An error occurred while fetching user emails. Please try again.");
      }
    } else {
      alert("Please enter a valid email");
    }
  };

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
          const emailRegex =
            /^[\w-]+(\.[\w-]+)*@gmail\.com$|^[\w-]+(\.[\w-]+)*@email\.com$/;
          if (text.trim() === "") {
            setValidEmailDomain(true); // Reset the validEmailDomain state when the email field is empty
          } else {
            setValidEmailDomain(emailRegex.test(text));
          }
        }}
      ></TextInput>
      {!validEmailDomain && (
        <Text style={{ color: "red" }}>
          Valid email domain( @gmail.com, @email.com )
        </Text>
      )}

      <TextInput
      placeholder="Password"
      style={styles.input}
      secureTextEntry
      value={password}
      onChangeText={handlePasswordChange} // Use handlePasswordChange as the event handler
    />
    {!validPassword && (
      <Text style={styles.warningText}>
        Password must start with an uppercase letter and end with a special character
      </Text>
    )}
      <TouchableOpacity
        onPress={() => resetPassword()}
        style={{ alignItems: "flex-end", marginTop: 20, marginLeft: 220 }}
      >
        <Text style={{ color: "#22ba3a", fontWeight: "bold" }}>
          Forgot your password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={signIn}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

function Footer() {
  const navigation = useNavigation();

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
          style={styles.createAccountButton}
          onPress={() => navigation.navigate("Welcome")}
        >
          <Text style={styles.createAccountButtonText}>Back to welcome</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

function Login() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1edea" }}>
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
  loginButton: {
    marginTop: 40,
    backgroundColor: "#22ba3a",
    paddingVertical: 15,
    borderRadius: 8,
    width: 350,
    alignItems: "center",
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  createAccountButton: {
    marginTop: 40,
    color: "white",
  },
  createAccountButtonText: {
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
    marginRight: 15,
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

export default Login;
