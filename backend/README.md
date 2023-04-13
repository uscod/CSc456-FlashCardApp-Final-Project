# Firebase Backend For Flashcard App

## Installing Dependenices

To install dependencies needed (for testing locally or making functions locally and then deploying), go to the `functions` folder and run `npm i` to install dependencies located in the `package.json` file.

## Initiate `backend` Folder as a Firebase Project

In order to be able to deploy, you need to initialize the `backend` folder as a Firebase project. To do so, you first need to install `firebase-tools` globally (`npm i -g firebase-tools`).

After doing so, we now re-initialize the `backend` folder as a Firebase Project:

1. In the `backend` folder, run `firebase init`.
2. When asked to proceed, type `Y` and hit `enter`.
3. When asked for features to set up, select the `Firestore` and `Functions` options and then hit `enter`.
4. If you already have a `flashcard-app-prod` Firebase app, this step is skipped, but otherwise, `firebase-tools` may ask you to associate this Firebase project with an existing app or create a new one.
5. It'll ask for what file to put `Firestore Rules` and `Firestore indexes` in; just hit `enter` and type `N` then hit `enter` when asked for whether to overwrite the existing values.
6. Next, it'll ask for whether you want to intialize or overwrite the existing code base, select `Overwrite`.
7. For the next 2 options, select `JavaScript` and `Y` for ESLint.
8. For the remaining steps, type `N` and hit `enter` to prevent overriding existing files.
9. When asked to install depedencies, type `Y` and hit `enter`.

## Testing Setup

For testing, we require a `serviceAccountKey.json` file in the `backend/functions/tests` folder provided when creating a key for a Service Account.

- Steps for obtaining the JSON file can be found at https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments.
- **Note:** The file created may look like `<firebase-project-name>-*.json`; just rename it to `serviceAccountKey.json` and put it in the `backend/functions/tests` folder.

## Running Tests

To run tests, in the `functions` folder, run `npm test` to run our Jest tests in the `functions/tests` folder.
