
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCx_sk4SYCVml6LQemohMpkfw3ujNLmZuc",
  authDomain: "netflix-clone-4b5ad.firebaseapp.com",
  projectId: "netflix-clone-4b5ad",
  storageBucket: "netflix-clone-4b5ad.firebasestorage.app",
  messagingSenderId: "506562865691",
  appId: "1:506562865691:web:6593186ffc59986b8ca6be"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async(name,email,password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email
       })

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);

}


export { auth, db, signup, login, logout };








