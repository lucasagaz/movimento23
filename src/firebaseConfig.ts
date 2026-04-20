import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Essas são as suas credenciais que vimos no print anterior
const firebaseConfig = {
  apiKey: "AIzaSyBzdGQezQcWWk4ZRoHURJzKtoSzt55WMTk",
  authDomain: "movimento-23.firebaseapp.com",
  projectId: "movimento-23",
  storageBucket: "movimento-23.firebasestorage.app",
  messagingSenderId: "291618886516",
  appId: "1:291618886516:web:5f5e425c0dbf536b331221"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços para usar nos outros arquivos (Ex: na página de cadastro)
export const db = getFirestore(app);
export const auth = getAuth(app);