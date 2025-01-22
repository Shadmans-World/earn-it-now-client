import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {


    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)



    const provider = new GoogleAuthProvider();

    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email,password)=> {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
           console.log('Current User: ',currentUser)
        })
        return () => {
            return unSubscribe();
          };
    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signWithGoogle,

    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;