import { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { NoteContext } from "../context/NoteContext";
import { onSnapshot, collection, query } from "firebase/firestore";
import EditNote from "./EditNote";

const NoteList = () => {
    const {notes, setNotes} = useContext(NoteContext);

    const [search, setSearch] = useState("");

    // this useEffect makes it so that every render
    // the firebase database is Synced with the notes state
    // it also manages the loading spinner
    useEffect(()=>{
        
        const q = query(collection(db, "notes"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let notesArr = []
            querySnapshot.forEach((doc)=>{
                notesArr.push({...doc.data(), id: doc.id})
            });
            setNotes(notesArr);
            
        
        })
        return () => unsubscribe()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const filtrd = notes.filter(item=>
        item.event.toLowerCase().includes(search.toLowerCase())
     || item.when.includes(search)
     || item.tag.toLowerCase().includes(search.toLowerCase()));


    return (
        <div className="flex flex-col justify-start bg-trafalgar bg-no-repeat 
        bg-cover bg-blend-soft-light p-3
        items-center flex-1 text-2xl bg-slate-300 gap-5">

            <h1 className="text-6xl">My Events</h1>

            <input type="text" placeholder="name of event or period" onChange={(e) => setSearch(e.target.value)}/>

            <div className="flex flex-col gap-2 p-2">
                {filtrd.map((note)=>{
                    return (
                        <div className="flex flex-col gap-1 hover:bg-slate-200 
                        p-2 bg-slate-200/70 min-w-[400px] shadow-lg">
                            <p>Event: {note.event} </p>
                            <p>Time: {note.when}</p>
                            <p>Tags: {note.tag}</p>
                            <button className="hover:bg-red-100 bg-red-100/70">edit</button>
                            <button className="bg-red-100/70 hover:bg-red-100">delete</button>
                        </div>
                    )
                })}
            </div>
            

        </div>
    )
}

export default NoteList;