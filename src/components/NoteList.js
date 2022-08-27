import { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { NoteContext } from "../context/NoteContext";
import { onSnapshot, collection, query, deleteDoc, doc, updateDoc } from "firebase/firestore";
import EditForm from "./EditForm";
import sortArray from 'sort-array'
import Timeline from "./Timeline";
import { GiDumplingBao } from "react-icons/gi";

const NoteList = () => {
    const { notes, setNotes } = useContext(NoteContext);



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

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("")

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
        console.log(e.target.id)

        setToEdit(e.target.id)

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
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setToEdit("")
    };



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
                    who: newWho,
                    beginning: newBeginning,
                    unfold: newUnfold,
                    end: newEnd,
                    source: newSource,
                    tag: newTag
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
            who: newWho,
            beginning: newBeginning,
            unfold: newUnfold,
            end: newEnd,
            tag: newTag,
            source: newSource
        })

    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "notes", id))
    }

    const displayEvents = () => {
        return (
            notes.map((note) => {
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
                            newBeginning={newBeginning}
                            newUnfold={newUnfold}
                            newEnd={newEnd}
                            newSource={newSource}
                            newTag={newTag}
                            setNewEvent={setNewEvent}
                            setNewWhere={setNewWhere}
                            setNewWhen={setNewWhen}
                            setNewWho={setNewWho}
                            setNewBeginning={setNewBeginning}
                            setNewUnfold={setNewUnfold}
                            setNewEnd={setNewEnd}
                            setNewSource={setNewSource}
                            setNewTag={setNewTag}
                            toEdit={toEdit}
                            setToEdit={setToEdit}
                            handleSubmit={handleSubmit}
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

    let arr = new Set()

    const getTags = () => {

        notes.map((note) => {
            return (Array.from(note.tag.toLowerCase().split(",").map((t) => {
                arr.add(t)
            })))

        })


        return Array.from(arr)
    }

    useEffect(() => {
        getTags()
    }, [notes])

    const filtrd = notes.filter(item =>
        item.event.toLowerCase().includes(search.toLowerCase())
        || item.when.toString().includes(search)
        || item.tag.toLowerCase().includes(search.toLowerCase()));




    return (
        <div className="flex flex-col justify-start bg-trafalgar bg-no-repeat 
        bg-cover p-3 
        items-center flex-1 text-2xl bg-slate-300 gap-5">

            <h1 className="text-6xl my-5 font-bold">My Events</h1>

            <div className="flex flex-col gap-2 w-fit">
                <input className="px-2 py-1 text-center bg-slate-100/80" type="text" placeholder="event, year or tag"
                    onClick={() => setToEdit("") && setSearch("")}
                    onChange={(e) => setSearch(e.target.value)} />

                <div className="flex flex-col bg-zinc-100">
                    <label htmlFor="sort" className="px-4">Sort by year</label>
                    <select className="bg-red-200 w-full px-4" onChange={(e) => setSort(e.target.value)} name="sort" id="sort">
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

                {/* {notes.map((note) => {
                    return (Array.from(note.tag.toLowerCase().split(",").map((t) => {

                        return (
                            <li id={t}
                                className=" odd:bg-zinc-400 font-bold even:bg-zinc-400 shadow-sm cursor-pointer
                         text-slate-100 list-item px-2 text-xl rounded-lg w-fit"
                                onClick={(e) => setSearch(e.target.id)}>
                                {t}
                            </li>
                        )
                    })))

                })} */}

                {(arr) ? (
                    <ul className="grid grid-cols-2 lg:grid-cols-3 w-full lg:w-1/3 items-center gap-2">

                        <li onClick={() => setSearch("")} 
                        className="cursor-pointer shadow-sm text-white 
                font-bold bg-zinc-600/50 list-item px-2 text-xl rounded-lg"
                >
                            All events
                        </li>

                        {getTags().map((t) => {
                            return (
                                <li id={t}
                                    className=" odd:bg-zinc-400/50 font-bold
                                     even:bg-zinc-400/50 shadow-sm cursor-pointer
                         text-slate-100 list-item px-2 text-xl rounded-lg"
                                    onClick={(e) => setSearch(e.target.id)}>
                                    {t}
                                </li>
                            )
                        })}

                    </ul>
                ) : null}


            <div className="flex flex-col w-full lg:w-1/2 gap-2">
                {filtrd.map((note) => {
                    return (
                        <div className="flex flex-col gap-2 
                        p-2 bg-slate-200/70 shadow-lg" key={note.id}>
                            <p className="font-bold">{note.event} </p>
                            <p>{note.when}</p>
                            <ul className="flex gap-2">
                                {Array.from(note.tag.toLowerCase().split(",")).map((t) => {
                                    return (
                                        <li className="bg-blue-300 list-item px-2 text-sm rounded-lg w-fit">{t}</li>
                                    )
                                })}
                            </ul>
                            <div className="flex gap-2">
                                <button className="hover:bg-green-300 w-fit px-3 bg-green-100/70" onClick={handleSelect} id={note.id}>Edit</button>
                                <button className="hover:bg-red-300 bg-red-100/70 w-fit px-3 " onClick={() => handleDelete(note.id)} id={note.id}>Delete</button>
                            </div>

                        </div>
                    )
                })}
            </div>

            {(toEdit) ? (
                <div className="flex w-full lg:w-1/2">
                    {displayEvents()}
                </div>
            )
                : null}

            <Timeline filtrd={filtrd} />


        </div>
    )
}

export default NoteList;