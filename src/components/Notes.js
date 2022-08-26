/* eslint-disable array-callback-return */
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { onSnapshot, collection, addDoc, query } from "firebase/firestore";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

import { UserAuth } from "../context/AuthContext";
import { BsFillArrowDownCircleFill, BsFillTagFill } from "react-icons/bs"


const Notes = () => {

    const { user } = UserAuth();
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
    const [tag, setTag] = useState("")

    const [loading, setLoading] = useState(false)

    const { notes, setNotes } = useContext(NoteContext)

    // this useEffect makes it so that every render
    // the firebase database is Synced with the notes state
    // it also manages the loading spinner
    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, "notes"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let notesArr = []
            querySnapshot.forEach((doc) => {
                notesArr.push({ ...doc.data(), id: doc.id })
            });
            setNotes(notesArr);
            setLoading(false)

        })
        return () => unsubscribe()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleNew = async (e) => {
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
            tag: tag,
            userid: user.uid
        });

        setEvent("")
        setWhen("")
        setWhere("")
        setWho("")
        setBeginning("")
        setUnfold("")
        setEnd("")
        setSource("")
        setTag("")


    }

    return (

        <form className="flex flex-col justify-start bg-wolfe bg-no-repeat 
            bg-cover p-3 
            items-center flex-1 text-2xl bg-slate-300 gap-2
            " onSubmit={handleNew}>

            <h1 className="text-6xl my-10 font-bold text-center">Create a new event</h1>

            <div className="flex flex-col w-full lg:w-1/2 gap-6">
                <div className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                    <h2 className="">What is the event we are talking about?</h2>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="event">Event</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="Battle of Waterloo" value={event} required
                            onChange={(e) => { setEvent(e.target.value) }} type="text" name="event" />
                    </div>

                    <a href="#where" className="hidden sm:block">
                        <BsFillArrowDownCircleFill size={42} />
                    </a>
                </div>

                <div id="where" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                    <h2 className="">What are the main points?</h2>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="where">Where</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="Waterloo" value={where} required
                            onChange={(e) => { setWhere(e.target.value) }} type="text" name="where" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="when">When</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="1815" value={when} required
                            onChange={(e) => { setWhen(e.target.value) }} type="text" name="when" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="who">Who</label>
                        <textarea className="bg-slate-100/80 p-1" value={who} required
                            placeholder="Napoleon (France) vs UK, Prussia, Netherlands, Hanover, Nassau, Brunswick"
                            onChange={(e) => { setWho(e.target.value) }} type="text" name="who" />
                    </div>

                    <a href="#evo" className="hidden sm:block">
                        <BsFillArrowDownCircleFill size={42} />
                    </a>
                </div>

                <div id="evo" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                    <h2 className="">How did the event develop?</h2>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="beginning">Beginning</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="It started like this..." value={beginning}
                            onChange={(e) => { setBeginning(e.target.value) }} type="text" name="beginning" />
                    </div>


                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="unfold">Unfold</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="It developed like that..." value={unfold}
                            onChange={(e) => { setUnfold(e.target.value) }} type="text" name="unfold" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="end">End</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="It ended like this..." value={end}
                            onChange={(e) => { setEnd(e.target.value) }} type="text" name="end" />
                    </div>

                    <a href="#end" className="hidden sm:block">
                        <BsFillArrowDownCircleFill size={42} />
                    </a>
                </div>

                <div id="end" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="source">Source</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="Barbero, Alessandro (2013), The Battle: A New History of Waterloo, 
                            Atlantic Books, p. 160, ISBN 978-1-78239-138-8" value={source}
                            onChange={(e) => { setSource(e.target.value) }} type="text" name="source" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="tag">Tags</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="Vienna, Garibaldi, Early Modern, .." value={tag}
                            onChange={(e) => { setTag(e.target.value) }} type="text" name="tag" />
                    </div>

                </div>

            </div>

            <button className="" type="submit">Create event</button>

        </form>

    )
}

export default Notes;