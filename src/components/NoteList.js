import { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { NoteContext } from "../context/NoteContext";
import { onSnapshot, collection, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useLoadScript } from "@react-google-maps/api"
import Map from "./MapContainer";




import EditForm from "./EditForm";
import sortArray from 'sort-array'
import Timeline from "./Timeline";
import Switch from "react-switch";

const NoteList = () => {
    const { notes, setNotes } = useContext(NoteContext);

    const [checked, setChecked] = useState(false)
    const [seeMap, setSeeMap] = useState(false)

    const [seeTags, setSeeTags] = useState(false)

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
    const [newImg, setNewImg] = useState("")

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("")

    const [showAll, setShowAll] = useState(false)


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
                setNewImg(note.img)
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
                    coords: newCoords,
                    img: newImg
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
            coords: newCoords,
            img: newImg
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
                            newImg={newImg}
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
                            setNewImg={setNewImg}
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
    let peopleArr = new Set()

    const getTags = () => {
        notes.map((note) => {
            return (Array.from(note.tag.toLowerCase().trim().replace(/\s*\,\s*/g, ",").split(",").map((t) => {
                arr.add(t)
            })))
        })

        return Array.from(arr)
    };

    const getNames = () => {
        notes.map((note) => {
            return (Array.from(note.who.toLowerCase().trim().replace(/\s*\,\s*/g, ",").split(",").map((t) => {
                peopleArr.add(t)
            })))
        })

        return Array.from(peopleArr)
    }

    useEffect(() => {
        getTags()
        getNames()
    }, [notes])

    const filtrd = notes.filter(item =>
        item.event.toLowerCase().includes(search.toLowerCase())
        || item.when.toString().includes(search)
        || item.tag.toLowerCase().includes(search.toLowerCase())
        || item.where.toLowerCase().includes(search.toLowerCase()));


    const [libraries] = useState(["places"])


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
        libraries
    })

    const handleTags = () => {
        setSeeTags(!seeTags)
    }

    return (
        <div className="flex flex-col justify-start bg-trafalgar bg-no-repeat 
        bg-cover p-3 bg-blend-soft-light
        items-center flex-1 text-2xl bg-slate-300 gap-5">


            <div className=" text-7xl font-bold mt-4 mb-4">
                <div className="p-4 bg-clip-text text-center text-transparent bg-gradient-to-r from-slate-400 to-slate-600 ">
                    <h1>My Events</h1>
                </div>
            </div>

            <input className="py-1 text-center bg-zinc-100/80"
                type="text" placeholder="event, year, location or tag"
                onClick={() => setToEdit("") && setSearch("")}
                onChange={(e) => setSearch(e.target.value)} />

            <div className="flex flex-col sm:flex-row gap-4 w-fit">

                <select defaultValue={"default"} className="bg-zinc-500/80 text-zinc-100 px-4"
                    onChange={(e) => setSort(e.target.value)} name="sort" id="sort">
                    <option value="default" disabled>Sort</option>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>

                <label className="flex justify-center items-center gap-1">
                    <div>Edit/Timeline</div>
                    <Switch onChange={handleToggle} checked={checked} />
                </label>
            </div>

            <div className="flex justify-center items-center gap-1">

                {(seeTags) ? (<button onClick={handleTags} className="w-fit px-2 shadow-lg sm:hover:animate-pulse 
                sm:hover:bg-red-100 bg-red-200 transition-colors">
                    Hide tags
                </button>) : <button onClick={handleTags} className="w-fit px-2 shadow-lg sm:hover:animate-pulse 
                sm:hover:bg-slate-100 bg-slate-200 transition-colors">
                    Show tags
                </button>}

            </div>


            {(arr && seeTags) ? (
                <ul className="grid grid-cols-2 lg:grid-cols-3 w-full lg:w-1/3 items-center gap-2">

                    <li onClick={() => setSearch("")}
                        className="cursor-pointer shadow-sm text-white max-h-[30px]
            font-bold bg-zinc-600/70 list-item px-2 text-xl rounded-lg"
                    >
                        All events
                    </li>

                    {getTags().map((t, index) => {
                        return (
                            <li id={t} key={index}
                                className=" odd:bg-slate-400/70 font-bold max-h-[30px] truncate
                                    even:bg-slate-400/70 shadow-sm cursor-pointer
                        text-slate-100 list-item px-2 text-xl rounded-lg"
                                onClick={(e) => setSearch(e.target.id)}>
                                {t}
                            </li>
                        )
                    })}

                </ul>
            ) : null}


            {checked === false && (notes.length > 0) ? (
                <div className="flex flex-col w-full lg:w-1/2 gap-2">
                    {filtrd.map((note) => {

                        return (
                            <div className="flex flex-col
                        p-6 bg-slate-200/80 bg-blend-soft-light bg-cover bg-center shadow-sm"
                                style={(note.img) ? { backgroundImage: `url(${note.img})` } : {}}
                                key={note.id}>


                                <p className="text-4xl font-bold">{note.event} </p>
                                <p>{note.when}</p>
                                <ul className="flex gap-2 py-1">
                                    {Array.from(note.tag.toLowerCase().split(",")).map((t, index) => {
                                        return (
                                            <li key={index} className="bg-blue-300 list-item px-2 text-sm rounded-lg max-h-[20px] truncate">{t}</li>
                                        )
                                    })}
                                </ul>
                                <ul className="flex gap-2 py-1 mb-6">
                                    {Array.from(note.who.toLowerCase().split(",")).map((t, index) => {
                                        return (
                                            <li key={index} className="bg-yellow-300 list-item px-2 text-sm rounded-lg max-h-[20px] truncate">{t}</li>
                                        )
                                    })}
                                </ul>
                                <div className="flex gap-2">
                                    <button className="hover:bg-green-300 w-fit px-3 border-2 border-stone-500 bg-zinc-100/80"
                                        onClick={handleSelect} name={note.event} id={note.id}>Edit</button>

                                    <button className="hover:bg-red-300 border-2 border-stone-500 bg-zinc-100/80 w-fit px-3 "
                                        onClick={() => handleDelete(note.id)} id={note.id}>Delete</button>
                                </div>

                            </div>
                        )
                    })}
                </div>
            ) : null}



            {(toEdit) ? (
                <div className="flex w-full lg:w-1/2">
                    {displayEvents()}
                </div>
            )
                : null}





            {(!isLoaded) ? (<div>loading...</div>) :

                <div className="font-bold flex flex-col  decoration-green-500 items-center justify-center 
                text-4xl border-slate-500 w-full">
                    <div className="p-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-sky-400 ">
                        <h1>Map</h1>
                    </div>

                    <Map filtrd={filtrd} coords={{ lat: 9.869370, lng: 46.171280 }} />
                    <p className="text-xl text-center">Refresh the page if the events are not being displayed correctly in the map</p>
                </div>

            }


            {(checked) === true && (notes.length > 0) ? (
                <div className="font-bold flex flex-col items-center
                 justify-center text-4xl border-slate-500 w-full">
                    <div className="p-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
                        <h1>Timeline</h1>
                    </div>
                    <Timeline filtrd={filtrd} />
                </div>

            ) : null}


            {/* <Autocomplete isLoaded={isLoaded}/> */}

        </div>
    )
}

export default NoteList;