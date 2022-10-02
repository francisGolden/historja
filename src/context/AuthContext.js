import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // state that will receive current user object
  const [user, setUser] = useState({});
  const [nav, setNav] = useState(false);

  // Set the nav state to true if the user is signed in
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is signed in");
        setNav(true);
      } else {
        console.log("user is signed out");
        setNav(false);
      }
    });
  }, []);

  //   const createUser = (email, password) => {
  //     // const userCred = await auth().createUserWithEmailAndPassword(email, password)
  //     // await userCred.user.sendEmailVerification({url: "http://localhost:3000"});
  //     return createUserWithEmailAndPassword(auth, email, password);
  //   };

  const createUser = async (email, password) => {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await sendEmailVerification(userCred.user);
  };

//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };


  const signIn = async(email, password) => {
    const signUserCred = await signInWithEmailAndPassword(auth, email, password);

    console.log(signUserCred)
    if (!signUserCred.user.emailVerified) {
        alert("Email has not been verified yet")
        await sendEmailVerification(signUserCred.user)
        logout()
    }
  }


  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, nav, logout, resetPassword, signIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
