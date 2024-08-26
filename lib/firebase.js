// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsgpOkIA-sLoCOvJODqxlszXV0SkxrKb8",
  authDomain: "happening---panorama.firebaseapp.com",
  projectId: "happening---panorama",
  storageBucket: "happening---panorama.appspot.com",
  messagingSenderId: "793747768791",
  appId: "1:793747768791:web:a84e7d91bf589d896a7792",
  measurementId: "G-6K5EP80QBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(name, totemNumber) {
  try {
    await setDoc(doc(db, "panorama", name), {
      nombre: name,
      totem: totemNumber,
      fecha: Timestamp.now(),
    });
  } catch (error) {
    console.log(error);
  }
}
