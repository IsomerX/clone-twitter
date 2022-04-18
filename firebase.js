import { getApps, getApp, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDM9Vfu9xfmbYgjxo-WQtJkAsQXLD3vqOs",
  authDomain: "twitter-clone-2b03a.firebaseapp.com",
  projectId: "twitter-clone-2b03a",
  storageBucket: "twitter-clone-2b03a.appspot.com",
  messagingSenderId: "714404413325",
  appId: "1:714404413325:web:b9756bdae2a8a03a7107c4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };