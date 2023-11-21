const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updatePremiumStatus = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      // The user must be authenticated to call this function
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be authenticated to call this function."
      );
    }

    // Get the user's UID from the authenticated context
    const uid = context.auth.uid;

    // Update the premium status and remaining days in the Firestore database
    const db = admin.firestore();
    const userRef = db.collection("users").doc(uid);
    const userData = (await userRef.get()).data();

    if (!userData) {
      throw new functions.https.HttpsError("not-found", "User not found");
    }

    // Check if the user's premium status needs to be updated
    if (userData.dayPremium > 0) {
      const remainingDays = userData.dayPremium - 1;
      const statusPremium = remainingDays > 0;
      
      // Update the user's document in Firestore
      await userRef.update({
        dayPremium: remainingDays,
        statusPremium,
      });

      return { success: true, message: "Premium status updated successfully." };
    } else {
      return { success: false, message: "User has no remaining premium days." };
    }
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});
