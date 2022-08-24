/* eslint-disable array-callback-return */
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { onSnapshot, collection, addDoc, query } from "firebase/firestore";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

import { UserAuth } from "../context/AuthContext";
import {BsFillArrowDownCircleFill} from "react-icons/bs"


const Notes = () => {

    const {user} = UserAuth();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [event, setEvent] = useState("");
    const [where, setWhere] = useState("");
    const [when, setWhen] = useState("");
    const [who, setWho] = useState("");
    const [beginning, setBeginning] = useState("");
    const [unfold, setUnfold] = useState("");
    const [end, setEnd] = useState("");
    const [source, setSource] = useState("");

    const [loading, setLoading] = useState(false)

    const { notes, setNotes } = useContext(NoteContext)

    // this useEffect makes it so that every render
    // the firebase database is Synced with the notes state
    // it also manages the loading spinner
    useEffect(()=>{
        setLoading(true)
        const q = query(collection(db, "notes"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let notesArr = []
            querySnapshot.forEach((doc)=>{
                notesArr.push({...doc.data(), id: doc.id})
            });
            setNotes(notesArr);
            setLoading(false)
        
        })
        return () => unsubscribe()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNew = async(e) => {
        e.preventDefault();
        
        await addDoc(collection(db, "notes"), {
            title: title,
            content: content,
            event: event,
            where: where,
            when: when,
            who: who,
            beginning: beginning,
            unfold: unfold,
            end: end,
            source: source,
            userid: user.uid
        });

        setEvent("")
        setWhen("")
        setWho("")
        setBeginning("")
        setUnfold("")
        setEnd("")
        setSource("")


    }

    return (
        <div className="flex flex-col justify-start p-3 bg-issus bg-no-repeat 
        bg-cover bg-blend-soft-light
        items-center flex-1 bg-slate-300 gap-5">
            {/* <h1 className="text-5xl drop-shadow-xl">Create a new historical event!</h1> */}
            <form className="flex flex-col items-center gap-2 text-2xl" onSubmit={handleNew}>

                <div className="flex flex-col gap-6 h-[100vh]">
                    <h2 className="text-4xl mt-3">What is the event we are talking about?</h2>
                    {/* <label className="font-bold" htmlFor="title">Title</label>
                    <input className="bg-slate-100/60 min-w-[400px]" 
                    onChange={(e)=>{setTitle(e.target.value)}} type="text" name="title" />

                    <label className="font-bold" htmlFor="content">Content</label>
                    <input className="bg-slate-100/60 min-w-[400px]" 
                    onChange={(e)=>{setContent(e.target.value)}} type="text" name="content" /> */}
                    
                    <div className="flex flex-col text-4xl">
                        <label className="font-bold" htmlFor="event">Event</label>
                        <textarea className="bg-slate-100/60 min-w-[400px] 
                        max-h-20 min-h-[100px] p-2" 
                        placeholder="Battle of Waterloo" value={event} required
                        onChange={(e)=>{setEvent(e.target.value)}} type="text" name="event" />
                    </div>
                    

                    
                    <a href="#where">
                        <BsFillArrowDownCircleFill size={42}/>
                    </a>
                </div>

                <div id="where" className="flex flex-col gap-6 w-[600px] h-[100vh]">
                    <h2 className="text-4xl mt-3">What are the main points?</h2>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="where">Where</label>
                        <textarea className="bg-slate-100/60 
                        max-h-20 min-h-[100px] p-2 min-w-[400px]"
                        placeholder="Waterloo" value={where} required
                        onChange={(e)=>{setWhere(e.target.value)}} type="text" name="where" />
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="when">When</label>
                        <textarea className="bg-slate-100/60 
                        max-h-20 min-h-[100px] p-2 min-w-[400px]" 
                        placeholder="1815" value={when} required
                        onChange={(e)=>{setWhen(e.target.value)}} type="text" name="when" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="who">Who</label>
                        <textarea className="bg-slate-100/60 p-2 
                        max-h-20 min-h-[100px] min-w-[400px]" value={who} required
                        placeholder="Napoleon (France) vs UK, Prussia, Netherlands, Hanover, Nassau, Brunswick" 
                        onChange={(e)=>{setWho(e.target.value)}} type="text" name="who" />
                    </div>

                    <a href="#evo">
                        <BsFillArrowDownCircleFill size={42}/>
                    </a>
                </div>

                <div id="evo" className="flex w-[600px] flex-col gap-6 h-[90vh]">
                    <h2 className="text-4xl mt-3 w-[600px]">How did the event develop?</h2>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="beginning">Beginning</label>
                        <textarea className="bg-slate-100/60 p-2 
                        max-h-[200px] min-h-[100px] min-w-[400px]"
                        placeholder="It started like this..." value={beginning}
                        onChange={(e)=>{setBeginning(e.target.value)}} type="text" name="beginning" />
                    </div>


                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="unfold">Unfold</label>
                        <textarea className="bg-slate-100/60 p-2 
                        max-h-[200px] min-h-[100px]  min-w-[400px]" 
                        placeholder="It developed like that..."  value={unfold}
                        onChange={(e)=>{setUnfold(e.target.value)}} type="text" name="unfold" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="end">End</label>
                        <textarea className="bg-slate-100/60 p-2 
                        max-h-[200px] min-h-[100px]  min-w-[400px]"
                        placeholder="It ended like this..." value={end}
                        onChange={(e)=>{setEnd(e.target.value)}} type="text" name="end" />
                    </div>

                    <a href="#end">
                        <BsFillArrowDownCircleFill size={42}/>
                    </a>
                </div>

               
                <div id="end" className="flex w-[600px] flex-col h-[20vh] gap-6">

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="source">Source</label>
                        <textarea className="bg-slate-100/60 max-h-[150px] min-h-[100px]" 
                        placeholder="Barbero, Alessandro (2013), The Battle: A New History of Waterloo, 
                        Atlantic Books, p. 160, ISBN 978-1-78239-138-8" value={source}
                        onChange={(e)=>{setSource(e.target.value)}} type="text" name="source" />
                    </div>

                </div>

                <button className="text-3xl font-bold mb-6" type="submit">Create event</button>
               
            </form>

            
            {/* <div className="flex flex-col justify-center items-center bg-red-100">                
                <div className="px-4">You have {`${notes.length} note(s)`}</div>
            </div> */}

            
            
            
        </div>
    )
}

export default Notes;