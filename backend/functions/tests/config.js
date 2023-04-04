require("dotenv").config;

module.exports = {
  FIREBASE_KEY: {
    type: process.env.FB_SA_TYPE,
    project_id: process.env.FB_SA_PROJECT_ID,
    private_key_id: process.env.FB_SA_PRIVATE_KEY_ID,
    private_key: process.env.FB_SA_PRIVATE_KEY,
    client_email: process.env.FB_SA_CLIENT_EMAIL,
    client_id: process.env.FB_SA_CLIENT_ID,
    auth_uri: process.env.FB_SA_AUTH_URI,
    token_uri: process.env.FB_SA_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FB_SA_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FB_SA_CLIENT_X509_CERT_URL,
  },
};
