/* eslint-disable array-callback-return */
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { onSnapshot, collection, addDoc, query } from "firebase/firestore";
import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Autocomplete from "./Autocomplete";

import { UserAuth } from "../context/AuthContext";
import { BsFillArrowDownCircleFill, BsFillTagFill } from "react-icons/bs"
import { useLoadScript } from "@react-google-maps/api";


const Notes = () => {

    const { user } = UserAuth();
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [event, setEvent] = useState("");
    const [where, setWhere] = useState("");
    const [when, setWhen] = useState("");
    const [why, setWhy] = useState("")
    const [who, setWho] = useState("");
    const [beginning, setBeginning] = useState("");
    const [unfold, setUnfold] = useState("");
    const [end, setEnd] = useState("");
    const [source, setSource] = useState("");
    const [img, setImg] = useState("")
    const [tag, setTag] = useState("")

    const [coords, setCoords] = useState("")

    const [loading, setLoading] = useState(false)

    const { notes, setNotes } = useContext(NoteContext)

    const [address, setAddress] = useState("")

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
            why: why,
            coords: coords,
            when: when,
            who: who,
            beginning: beginning,
            unfold: unfold,
            end: end,
            source: source,
            tag: tag,
            img: img,
            userid: user.uid,
            
        });

        setEvent("")
        setWhen("")
        setWhere("")
        setWhy("")
        setCoords("")
        setWho("")
        setBeginning("")
        setUnfold("")
        setEnd("")
        setAddress("")
        setSource("")
        setTag("")
        setImg("")

        setAddress("")

    }

    const [libraries] = useState(["places"])
    
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
        libraries,
    }) 

    
    return (

        <form className="flex flex-col justify-start bg-peirson bg-no-repeat 
            bg-cover p-3 bg-blend-soft-light
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
                        {/* <textarea className="bg-slate-100/80 p-1"
                            placeholder="Waterloo" value={where}
                            // onChange={(e) => { setWhere(e.target.value) }} 
                            type="text" name="where" />
                         */}
                        <Autocomplete setWhere={setWhere}  address={address}
                        setAddress={setAddress}
                        where={where} coords={coords} setCoords={setCoords}
                        isLoaded={isLoaded}/>
                    </div>

                    

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="when">When</label>
                        <input className="bg-slate-100/80 p-1"
                            placeholder="for B.C years insert minus before the year (-480)" 
                            value={when} required
                            onChange={(e) => { setWhen(e.target.value) }} type="number" name="when" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="why">Why</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="Because..." value={why} required
                            onChange={(e) => { setWhy(e.target.value) }} type="text" name="why" />
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
                        <textarea className="bg-slate-100/80 p-1" required
                            placeholder="It started like this..." value={beginning}
                            onChange={(e) => { setBeginning(e.target.value) }} type="text" name="beginning" />
                    </div>


                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="unfold">Unfold</label>
                        <textarea className="bg-slate-100/80 p-1" required
                            placeholder="It developed like that..." value={unfold}
                            onChange={(e) => { setUnfold(e.target.value) }} type="text" name="unfold" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="end">End</label>
                        <textarea className="bg-slate-100/80 p-1" required
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
                        <textarea className="bg-slate-100/80 p-1" required
                            placeholder="Barbero, Alessandro (2013), The Battle: A New History of Waterloo, 
                            Atlantic Books, p. 160, ISBN 978-1-78239-138-8" value={source}
                            onChange={(e) => { setSource(e.target.value) }} type="text" name="source" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="img">Image URL</label>
                        <input className="bg-slate-100/80 p-1"
                            value={img}
                            onChange={(e) => { setImg(e.target.value) }} type="text" name="img" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="tag">Tags</label>
                        <textarea className="bg-slate-100/80 p-1"
                            placeholder="Vienna, Garibaldi, Early Modern, .." value={tag}
                            onChange={(e) => { setTag(e.target.value) }} type="text" name="tag" />
                    </div>

                </div>

            </div>

            <button className="bg-slate-100 p-2" type="submit">Create event</button>

        </form>

    )
}

export default Notes;