import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, 
    onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebase";


export const UserContext = createContext()

export const AuthContextProvider = ( {children} ) => {
    
    // state that will receive current user object
    const [user, setUser] = useState({})
    const [nav, setNav] = useState(false)

    // Set the nav state to true if the user is signed in 
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("user is signed in")
                setNav(true)
            } else {
                console.log("user is signed out")
                setNav(false)
            }
        })
    }, [])
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () =>{
            unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider value={{createUser, user, nav, logout, signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}