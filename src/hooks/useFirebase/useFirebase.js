import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseAuthentication from "../../firebase/firebase.config";

firebaseAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    }, [])

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
        user,
        error
    }

}

export default useFirebase;
