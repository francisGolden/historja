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

    const [name, setName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [birthPlace, setBirthPlace] = useState("")
    const [alias, setAlias] = useState("")
    const [marital, setMarital] = useState("")
    const [gender, setGender] = useState("")
    const [family, setFamily] = useState("")
    const [religion, setReligion] = useState("")
    const [role, setRole] = useState("")
    const [events, setEvents] = useState("")
    const [deathDate, setDeathDate] = useState("")
    const [deathPlace, setDeathPlace] = useState("")
    const [charImg, setCharImg] = useState("")
    


    const [coords, setCoords] = useState("")

    const [loading, setLoading] = useState(false)

    const { notes, setNotes, chars, setChars } = useContext(NoteContext)

    const [showCreateEvent, setShowCreateEvent] = useState(false)

    const [showCreateChar, setShowCreateChar] = useState(false)

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

        // this useEffect makes it so that every render
    // the firebase database is Synced with the notes state
    // it also manages the loading spinner
    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, "characters"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let charsArr = []
            querySnapshot.forEach((doc) => {
                charsArr.push({ ...doc.data(), id: doc.id })
            });
            setChars(charsArr);
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

    const handleNewChar = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "characters"), {
            name: name,
            birthDate: birthDate,
            birthPlace: birthPlace,
            alias: alias,
            marital: marital,
            gender: gender,
            family: family,
            religion: religion,
            role: role,
            events: events,
            deathDate: deathDate,
            deathPlace: deathPlace,
            userid: user.uid,
            charImg: charImg,

        });

        setName("")
        setBirthDate("")
        setBirthPlace("")
        setAlias("")
        setMarital("")
        setGender("")
        setFamily("")
        setReligion("")
        setRole("")
        setEvents("")
        setDeathDate("")
        setDeathPlace("")
        setCharImg("")

    }

    const [libraries] = useState(["places"])

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
        libraries,
    })


    const handleShowCreateEvent = () => {
        setShowCreateEvent(!showCreateEvent)
    }

    const handleShowCreateChar = () => {
        setShowCreateChar(!showCreateChar)
    }

    useEffect(()=>{
        console.log(notes)
    })

    return (

        <div className="flex flex-col justify-start bg-peirson bg-no-repeat 
            bg-cover p-3 bg-blend-soft-light
            items-center flex-1 text-2xl bg-slate-300 gap-2
            " >

            <button onClick={handleShowCreateEvent}
                className="text-6xl hover:bg-slate-100/70 my-10 
                bg-slate-100 p-4 text-center">
                Create a new <b>event</b>
            </button>

            {(!showCreateEvent) ? (<button onClick={handleShowCreateChar}
                className="text-6xl hover:bg-slate-100/70 my-10 
                bg-slate-100 p-4  text-center">
                Create a new <b>person</b>
            </button>)
                : null}

            {(showCreateEvent) ? (
                <form className="flex flex-col w-full" onSubmit={handleNew}>
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
                                <Autocomplete setWhere={setWhere} address={address}
                                    setAddress={setAddress}
                                    where={where} coords={coords} setCoords={setCoords}
                                    isLoaded={isLoaded} />
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

                        <button className="bg-slate-100 p-2" type="submit">Create event</button>

                    </div>
                </form>


            )
                : null}

            {(showCreateChar) ? (
                <form className="flex flex-col w-full" onSubmit={handleNewChar}>
                    <div className="flex flex-col w-full lg:w-1/2 gap-6">
                        <div className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                            <h2 className="">What is the name of the person we are talking about?</h2>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="name">Full name</label>
                                <textarea className="bg-slate-100/80 p-1"
                                    placeholder="Nicolò Machiavelli" value={name} required
                                    onChange={(e) => { setName(e.target.value) }} type="text" name="name" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="alias">Alias</label>
                                <textarea className="bg-slate-100/80 p-1"
                                    placeholder="The Great" value={alias} required
                                    onChange={(e) => { setAlias(e.target.value) }} type="text" name="alias" />
                            </div>

                        </div>

                        <div id="where" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                            <h2 className="">What is the birth date?</h2>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="birthDate">Birth Date</label>
                                
                                <textarea className="bg-slate-100/80 p-1"
                                    placeholder="22/02/1492" value={birthDate}
                                    onChange={(e) => { setBirthDate(e.target.value) }} 
                                    type="date" name="birthDate" />


                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="birthPlace">Birth Place</label>
                                <input className="bg-slate-100/80 p-1"
                                    placeholder="Rome"
                                    value={birthPlace} required
                                    onChange={(e) => { setBirthPlace(e.target.value) }} type="text" name="birthPlace" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="marital">Marital</label>
                                <textarea className="bg-slate-100/80 p-1" value={marital} required
                                    placeholder="Caterina de' Medici"
                                    onChange={(e) => { setMarital(e.target.value) }} type="text" name="marital" />
                            </div>

                        </div>

                        <div id="evo" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="gender">gender</label>
                                <textarea className="bg-slate-100/80 p-1" required
                                    placeholder="Male" value={gender}
                                    onChange={(e) => { setGender(e.target.value) }} type="text" name="gender" />
                            </div>


                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="family">family</label>
                                <textarea className="bg-slate-100/80 p-1" required
                                    placeholder="Medici" value={family}
                                    onChange={(e) => { setFamily(e.target.value) }} type="text" name="family" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="religion">religion</label>
                                <textarea className="bg-slate-100/80 p-1" required
                                    placeholder="Catholicism" value={religion}
                                    onChange={(e) => { setReligion(e.target.value) }} type="text" name="religion" />
                            </div>


                        </div>

                        <div id="end" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="role">role</label>
                                <textarea className="bg-slate-100/80 p-1" required
                                    placeholder="King of France" value={role}
                                    onChange={(e) => { setRole(e.target.value) }} type="text" name="role" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="img">Image URL</label>
                                <input className="bg-slate-100/80 p-1"
                                    value={img}
                                    onChange={(e) => { setImg(e.target.value) }} type="text" name="img" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="events">eventss</label>
                                <textarea className="bg-slate-100/80 p-1"
                                    placeholder="Vienna, Garibaldi, Early Modern, .." value={events}
                                    onChange={(e) => { setEvents(e.target.value) }} type="text" name="events" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="deathDate">deathDates</label>
                                <textarea className="bg-slate-100/80 p-1"
                                    value={deathDate}
                                    onChange={(e) => { setDeathDate(e.target.value) }} type="date" name="events" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="deathPlace">deathPlaces</label>
                                <textarea className="bg-slate-100/80 p-1"
                                    placeholder="Vienna" value={deathPlace}
                                    onChange={(e) => { setDeathPlace(e.target.value) }} 
                                    type="text" name="deathPlace" />
                            </div>

                        </div>

                        <button className="bg-slate-100 p-2" type="submit">Create character</button>

                    </div>
                </form>
            ) : null}



        </div>

    )
}

export default Notes;