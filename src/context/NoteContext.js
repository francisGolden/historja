import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({children}) => {

    const [notes, setNotes] = useState([]);

    const [chars, setChars] = useState([])


    return (
        <NoteContext.Provider value={{notes, setNotes, chars, setChars}}>
            {children}
        </NoteContext.Provider>
    )
}