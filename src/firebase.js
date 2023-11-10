import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJGMh3qiZ8hJS6pj_vq7gO66XgOUC76EE",
  authDomain: "video-sharing-app-a8848.firebaseapp.com",
  projectId: "video-sharing-app-a8848",
  storageBucket: "video-sharing-app-a8848.appspot.com",
  messagingSenderId: "526720938978",
  appId: "1:526720938978:web:7e68e4945f5bc50097bfbb",
  measurementId: "G-9Y0KL3N0T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('profile');

export const auth = getAuth();
export { provider };
export default app;