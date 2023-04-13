const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Auto-triggers when a user signs up (ie: through
// "createUserWithEmailAndPassword")
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    created_flashcards: [],
  });
});
