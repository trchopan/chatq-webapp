import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
};
app.initializeApp(config);

if (
  process.env.NODE_ENV !== "production" &&
  process.env.VUE_APP_FUNCTIONS_URL
) {
  app.functions().useFunctionsEmulator(process.env.VUE_APP_FUNCTIONS_URL);
}

export default app;
