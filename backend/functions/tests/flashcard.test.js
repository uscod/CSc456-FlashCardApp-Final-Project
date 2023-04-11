const path = require("path");

const admin = require("firebase-admin");
const fft = require("firebase-functions-test")(
    {projectId: process.env.FB_SA_PROJECT_ID},
    path.resolve(__dirname, "./serviceAccountKey.json"),
);

// Testing https.onCall function
describe("addFlashcardSet", () => {
  let myFunctions;
  let user;
  const docsToDelete = [];

  beforeAll(async () => {
    myFunctions = require("../index");

    // Create a test user
    user = fft.auth.exampleUserRecord();
    user.uid = "test-id-2";
    user.email = "testuser2@gmail.com";
    const newUserSignup = fft.wrap(myFunctions.newUserSignup);
    await newUserSignup(user);
  });

  afterAll(async () => {
    await admin.firestore().collection("users").doc(user.uid).delete();
    const deletePromises = docsToDelete.map((docId) =>
      admin.firestore().collection("flashcards").doc(docId).delete(),
    );
    await Promise.all(deletePromises);
    fft.cleanup(); // Do cleanup tasks
  });

  test("write doc to /flashcards & update doc in /users", async () => {
    const addFlashcardSet = fft.wrap(myFunctions.addFlashcardSet);

    const data = {
      title: "Presidents",
      category: "History",
      cards: [
        {question: "1st president of the US", answer: "George Washington"},
      ],
    };
    const context = {auth: {uid: user.uid}};

    const res = await addFlashcardSet(data, context);
    docsToDelete.push(res.flashcardId); // For cleanup

    // Validate response from adding flashcard set
    expect(res.title).toBe(data.title);
    expect(res.category).toBe(data.category);
    expect(res.cards.length).toBe(1);
    expect(res.creatorId).toBe(context.auth.uid);
    expect(res.timestamp).toBeTruthy();

    // Validate reference to flashcard set is on "user" document
    const snapshot = await admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get();

    expect(snapshot.exists).toBeTruthy();
    const createdFlashcard = snapshot.data().created_flashcards.find((obj) => {
      return obj.flashcardId === res.flashcardId;
    });
    expect(createdFlashcard).toBeTruthy();
    expect(createdFlashcard.title).toEqual(data.title);
    expect(createdFlashcard.category).toEqual(data.category);
  });

  test("throws error if not authenticated", async () => {
    const addFlashcardSet = fft.wrap(myFunctions.addFlashcardSet);
    await expect(addFlashcardSet({}, {})).rejects.toEqual(
        new Error("You must be authenticated to create a flashcard set."),
    );
  });

  test("throws error if missing fields", async () => {
    const addFlashcardSet = fft.wrap(myFunctions.addFlashcardSet);
    const context = {auth: {uid: user.uid}};
    const cases = [
      ["title", {}],
      ["category", {title: "title"}],
      ["cards", {title: "title", category: "category"}],
    ];

    for (const testVal of cases) {
      await expect(addFlashcardSet(testVal[1], context)).rejects.toEqual(
          new Error(`The "${testVal[0]}" field must be provided.`),
      );
    }
  });

  test("throws error if title & category fails pre-condition", async () => {
    const addFlashcardSet = fft.wrap(myFunctions.addFlashcardSet);
    const data = {
      title: "Lorem ipsum dolor sit amet, con",
      category: "category",
      cards: [],
    };
    const context = {auth: {uid: user.uid}};

    await expect(addFlashcardSet(data, context)).rejects.toEqual(
        new Error(
            "The \"title\" field must be a string between 1-30 characters.",
        ),
    );
    data.title = "title";
    data.category = "Lorem ipsum dolor sit amet, con";
    await expect(addFlashcardSet(data, context)).rejects.toEqual(
        new Error(
            "The \"category\" field must be a string between 1-30 characters.",
        ),
    );
  });

  test("throws error if cards fail pre-condition", async () => {
    const addFlashcardSet = fft.wrap(myFunctions.addFlashcardSet);
    const data = {
      title: "title",
      category: "category",
      cards: [{}],
    };
    const context = {auth: {uid: user.uid}};
    const cases = [
      [{}],
      [{question: ""}],
      [{question: "", answer: ""}],
      [{question: "question", answer: ""}],
      [{question: "", answer: "answer"}],
    ];

    for (const testVal of cases) {
      data.cards = testVal;
      await expect(addFlashcardSet(data, context)).rejects.toEqual(
          new Error(
              "The \"cards\" field must be an array of objects with keys" +
            " \"question\" and \"answer\" with non-empty string values.",
          ),
      );
    }
  });
});
