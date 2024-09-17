// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, Timestamp } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY1AQzylu3EU0BnYVTvnXCH7ziP2fzCYI",
  authDomain: "cce-summit.firebaseapp.com",
  projectId: "cce-summit",
  storageBucket: "cce-summit.appspot.com",
  messagingSenderId: "254412136138",
  appId: "1:254412136138:web:6b6824a62f935b083b5e33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function register(name, company, email, phone) {
  try {
    const docRef = doc(db, "usuarios", name);  // Guardamos el documento con el nombre como ID
    await setDoc(docRef, {
      nombre: name,
      empresa: company,
      correo: email,
      telefono: phone,
      fecha: Timestamp.now(),
    });
    console.log("Datos registrados correctamente en Firebase");
  } catch (error) {
    console.error("Error registrando los datos:", error);
  }
}