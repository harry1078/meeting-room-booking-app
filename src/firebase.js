import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Your API_KEY",
  authDomain: "Your AUTH_DOMAIN",
  projectId: "Your PROJECTID",
  storageBucket: "Your STORAGEBUCKET",
  messagingSenderId: "Your MESSAGEID",
  appId: "Your API_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
