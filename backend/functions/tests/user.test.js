const path = require("path");

const admin = require("firebase-admin");
const fft = require("firebase-functions-test")(
    {projectId: process.env.FB_SA_PROJECT_ID},
    path.resolve(__dirname, "./serviceAccountKey.json"),
);

// Testing https.auth.user().onCreate() trigger
describe("newUserSignup", () => {
  let myFunctions;
  let user;

  beforeAll(() => {
    myFunctions = require("../index");
    // Create a test user
    user = fft.auth.exampleUserRecord();
    user.uid = "test-id-1";
    user.email = "testuser1@gmail.com";
  });

  afterAll(async () => {
    await admin.firestore().collection("users").doc(user.uid).delete();
    fft.cleanup(); // Do cleanup tasks
  });

  test("should write document to /users", async () => {
    const newUserSignup = fft.wrap(myFunctions.newUserSignup);
    await newUserSignup(user);

    const snapshot = await admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();

    // Validate results
    expect(snapshot.exists).toBeTruthy();
    expect(snapshot.id).toBe(user.uid);
    expect(snapshot.data()).toEqual({
      email: user.email,
      created_flashcards: [],
    });
  });
});
