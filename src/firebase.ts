import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// As suas credenciais que estavam na imagem
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

// Exporta os serviços para usar nos seus componentes
export const db = getFirestore(app);
export const auth = getAuth(app);