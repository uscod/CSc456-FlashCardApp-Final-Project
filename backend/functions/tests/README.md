# Testing Setup

For testing, we require a `serviceAccountKey.json` file in the `backend/functions/tests` folder provided when creating a key for a Service Account.

- Steps for obtaining the JSON file can be found at https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments.
- **Note:** The file created may look like `<firebase-project-name>-*.json`; just rename it to `serviceAccountKey.json` and put it in the `backend/functions/tests` folder.

# Running Tests

To run the tests, run `npm test`.
