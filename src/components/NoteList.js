import { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { NoteContext } from "../context/NoteContext";
import { onSnapshot, collection, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {useLoadScript} from "@react-google-maps/api"
import Map from "./MapContainer";

import Autocomplete from "./Autocomplete";



import EditForm from "./EditForm";
import sortArray from 'sort-array'
import Timeline from "./Timeline";
import Switch from "react-switch";

const NoteList = () => {
    const { notes, setNotes } = useContext(NoteContext);

    const [checked, setChecked] = useState(false)
    const [seeMap, setSeeMap] = useState(false)

    const [toEdit, setToEdit] = useState("")

    const [newEvent, setNewEvent] = useState("");
    const [newWhere, setNewWhere] = useState("");
    const [newWhen, setNewWhen] = useState("");
    const [newWho, setNewWho] = useState("");
    const [newBeginning, setNewBeginning] = useState("");
    const [newUnfold, setNewUnfold] = useState("");
    const [newEnd, setNewEnd] = useState("");
    const [newSource, setNewSource] = useState("");
    const [newTag, setNewTag] = useState("")
    const [newCoords, setNewCoords] = useState()
    const [newWhy, setNewWhy] = useState("")

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("")

    
    const [coords, setCoords] = useState()
    
    const [address, setAddress] = useState("")

    // this useEffect makes it so that every render
    // the firebase database is Synced with the notes state
    // it also manages the loading spinner
    useEffect(() => {

        const q = query(collection(db, "notes"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let notesArr = []
            querySnapshot.forEach((doc) => {
                notesArr.push({ ...doc.data(), id: doc.id })
            });
            setNotes(notesArr);

        })
        return () => unsubscribe()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleSelect = (e) => {

        setToEdit(e.target.id)

        // show only event the user is editing
        if (search !== e.target.name) {
            setSearch(e.target.name)
        } else if (search === e.target.name) {
            setSearch("")
            setToEdit("")
        }

        notes.forEach((note) => {
            if (note.id === e.target.id) {
                setNewEvent(note.event)
                setNewWhere(note.where)
                setNewWhen(note.when)
                setNewWho(note.who)
                setNewBeginning(note.beginning)
                setNewUnfold(note.unfold)
                setNewEnd(note.end)
                setNewSource(note.source)
                setNewTag(note.tag)
                setNewCoords(note.coords)
                setNewWhy(note.why)
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setToEdit("")
        setSearch("")
    };

    const handleToggle = () => {
        setChecked(!checked)
    }


    // this function makes it so that changes to newTitle and newContent
    // states are reflected on the original notes state
    const handleEditChange = (e) => {
        // eslint-disable-next-line array-callback-return
        setNotes(current => current.map(obj => {
            if (obj.id === toEdit) {
                return {
                    ...obj,
                    event: newEvent,
                    where: newWhere,
                    when: newWhen,
                    why: newWhy,
                    who: newWho,
                    beginning: newBeginning,
                    unfold: newUnfold,
                    end: newEnd,
                    source: newSource,
                    tag: newTag,
                    coords: newCoords
                }
            }
        }))
    };

    // this async function makes it so that the newTitle 
    // and newContent states are sent to the relative document in the database.
    // It receives the id of the note that's being edited so that
    // I dont have to iterate through the notes once more
    // in order to find the desired note
    const handleFirebaseEdit = async (id) => {

        await updateDoc(doc(db, "notes", id), {
            event: newEvent,
            where: newWhere,
            when: newWhen,
            why: newWhy,
            who: newWho,
            beginning: newBeginning,
            unfold: newUnfold,
            end: newEnd,
            tag: newTag,
            source: newSource,
            coords: newCoords
        })

    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "notes", id))
    }

    const displayEvents = () => {
        return (
            notes.map((note, index) => {
                if (note.id === toEdit) {
                    return (
                        <EditForm
                            note={note}
                            handleDelete={handleDelete}
                            handleFirebaseEdit={handleFirebaseEdit}
                            handleEditChange={handleEditChange}
                            newEvent={newEvent}
                            newWhere={newWhere}
                            newWhen={newWhen}
                            newWho={newWho}
                            newWhy={newWhy}
                            newBeginning={newBeginning}
                            newUnfold={newUnfold}
                            newEnd={newEnd}
                            newSource={newSource}
                            newTag={newTag}
                            setNewEvent={setNewEvent}
                            setNewWhere={setNewWhere}
                            setNewWhen={setNewWhen}
                            setNewWho={setNewWho}
                            setNewWhy={setNewWhy}
                            setNewBeginning={setNewBeginning}
                            setNewUnfold={setNewUnfold}
                            setNewEnd={setNewEnd}
                            setNewSource={setNewSource}
                            setNewTag={setNewTag}
                            toEdit={toEdit}
                            setToEdit={setToEdit}
                            handleSubmit={handleSubmit}
                            key={index}
                            address={address}
                            newCoords={newCoords}
                            setNewCoords={setNewCoords}
                            setAddress={setAddress}
                            isLoaded={isLoaded}
                        />
                    )
                }
            })
        )
    };

    useEffect(() => {
        console.log(sort)

        handleSort()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort])

    // const [forMap, setForMap] = useState()

    // useEffect(()=>{
    //     setForMap(notes)
    // }, [])

    const handleSort = () => {
        if (sort === "desc") {
            setNotes(sortArray(notes.map((note) => {
                return (
                    { ...note, when: Number(note.when) }
                )
            }), {
                by: "when",
                order: "desc"
            }))
        }

        if (sort === "asc") {
            setNotes(sortArray(notes.map((note) => {
                return (
                    { ...note, when: Number(note.when) }
                )
            }), {
                by: "when",
                order: "asc"
            }))
        }
        console.log(notes)
    }

    let arr = new Set();

    const getTags = () => {
        notes.map((note) => {
            return (Array.from(note.tag.toLowerCase().trim().replace(/\s*\,\s*/g, ",").split(",").map((t) => {
                arr.add(t)
            })))
        })

        return Array.from(arr)
    };

    useEffect(() => {
        getTags()
    }, [notes])

    const filtrd = notes.filter(item =>
        item.event.toLowerCase().includes(search.toLowerCase())
        || item.when.toString().includes(search)
        || item.tag.toLowerCase().includes(search.toLowerCase()));

    
    const [libraries] = useState(["places"])
    
    
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
        libraries
    })     

    return (
        <div className="flex flex-col justify-start bg-trafalgar bg-no-repeat 
        bg-cover p-3 bg-blend-soft-light
        items-center flex-1 text-2xl bg-slate-300 gap-5">



            <h1 className="text-6xl my-5 font-bold">My Events</h1>

            <div className="flex flex-col sm:flex-row gap-2 w-fit">
                <input className="px-2 py-1 text-center bg-zinc-100/80" type="text" placeholder="event, year or tag"
                    onClick={() => setToEdit("") && setSearch("")}
                    onChange={(e) => setSearch(e.target.value)} />


                <select defaultValue={"default"} className="bg-zinc-500/80 text-zinc-100 w-full px-4" 
                onChange={(e) => setSort(e.target.value)} name="sort" id="sort">
                    <option value="default" disabled>Sort by year</option>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>

                <label className="flex justify-center items-center gap-1">
                    <div>Edit/Timeline</div>
                    <Switch onChange={handleToggle} checked={checked} />
                </label>


            </div>


            {(arr) ? (
                <ul className="grid grid-cols-2 lg:grid-cols-3 w-full lg:w-1/3 items-center gap-2">

                    <li onClick={() => setSearch("")}
                        className="cursor-pointer shadow-sm text-white 
            font-bold bg-zinc-600/70 list-item px-2 text-xl rounded-lg"
                    >
                        All events
                    </li>

                    {getTags().map((t, index) => {
                        return (
                            <li id={t} key={index}
                                className=" odd:bg-slate-400/70 font-bold
                                    even:bg-slate-400/70 shadow-sm cursor-pointer
                        text-slate-100 list-item px-2 text-xl rounded-lg"
                                onClick={(e) => setSearch(e.target.id)}>
                                {t}
                            </li>
                        )
                    })}

                </ul>
            ):null}


            {checked === false && (notes.length>0) ? (
                <div className="flex flex-col w-full lg:w-1/2 gap-2">
                {filtrd.map((note) => {
                    return (
                        <div className="flex flex-col gap-2 
                        p-2 bg-slate-200/70 shadow-lg" key={note.id}>
                            <p className="font-bold">{note.event} </p>
                            <p>{note.when}</p>
                            <ul className="flex gap-2">
                                {Array.from(note.tag.toLowerCase().split(",")).map((t, index) => {
                                    return (
                                        <li key={index} className="bg-blue-300 list-item px-2 text-sm rounded-lg w-fit">{t}</li>
                                    )
                                })}
                            </ul>
                            <div className="flex gap-2">
                                <button className="hover:bg-green-300 w-fit px-3 bg-green-100/70" onClick={handleSelect} name={note.event} id={note.id}>Edit</button>
                                <button className="hover:bg-red-300 bg-red-100/70 w-fit px-3 " onClick={() => handleDelete(note.id)} id={note.id}>Delete</button>
                            </div>

                        </div>
                    )
                })}
            </div>
            ):null}
            


            {(toEdit) ? (
                <div className="flex w-full lg:w-1/2">
                    {displayEvents()}
                </div>
            )
            :null}

            {(!isLoaded) ? (<div>loading...</div>) : 
            <Map filtrd={filtrd} coords={{lat: 9.869370, lng: 46.171280}}/>}

            {(checked) === true && (notes.length>0) ? (
                <Timeline filtrd={filtrd} />
            ):null}
            

            {/* <Autocomplete isLoaded={isLoaded}/> */}

        </div>
    )
}

export default NoteList;