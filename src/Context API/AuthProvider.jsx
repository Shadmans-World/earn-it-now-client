import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()


    const provider = new GoogleAuthProvider();

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email,password)=> {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            // get token and store client
            const userInfo = { email: currentUser.email };
            axiosPublic
              .post("/jwt", userInfo)
              .then((res) => {
                // console.log(res.data);
                if (res.data.token) {
                  localStorage.setItem("access-token", res.data.token);
                  setLoading(false);
                }
              })
              .catch((error) => {
                console.error("Error in unsubscribe jwt", error.message);
              });
          } else {
            // TODO: remove token(if token stored in client side: local storage, caching , in memory)
            localStorage.removeItem("access-token");
            setLoading(false)
          }
        });
        return () => {
          return unSubscribe();
        };
      }, [axiosPublic]);


    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        logOut,
        setLoading

    }
  

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;