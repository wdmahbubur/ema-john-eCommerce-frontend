import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useState } from "react";
import firebaseAuthentication from "../../firebase/firebase.config";

firebaseAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();


    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                setUser(user);
            }).catch((error) => {
                setError(error.message);
            });
    }
    return {
        googleSignIn,
        user
    }

}

export default useFirebase;
