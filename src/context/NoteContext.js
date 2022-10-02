import { createContext, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  deleteDoc,
  doc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { UserAuth } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  // this useEffect makes it so that every render
  // the firebase database is Synced with the notes state
  // it also manages the loading spinner
  useEffect(() => {
    const notesRef = collection(db, "notes");
    setLoading(true);

    if (user) {
      const unsubscribe = onSnapshot(
        query(notesRef, where("userid", "==", `${user.uid}`)),
        (querySnapshot) => {
          let notesArr = [];
  
          querySnapshot.forEach((doc) => {
            // push only the user's own notes
            notesArr.push({ ...doc.data(), id: doc.id });
          });
          setNotes(notesArr);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    }    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [chars, setChars] = useState([]);

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, chars, setChars, loading, setLoading }}
    >
      {children}
    </NoteContext.Provider>
  );
};
