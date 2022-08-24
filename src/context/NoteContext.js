import { createContext, useState } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({children}) => {

    const [notes, setNotes] = useState([]);

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {children}
        </NoteContext.Provider>
    )
}