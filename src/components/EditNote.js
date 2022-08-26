import { useContext } from "react";
// import { UserAuth } from "../context/AuthContext";
import { NoteContext } from "../context/NoteContext";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { doc, updateDoc, deleteDoc, query, collection, onSnapshot } from "firebase/firestore";
import {IoMdCreate, IoIosCreate} from "react-icons/io"
import {FaSpinner} from "react-icons/fa"
import {MdOutlineDelete} from "react-icons/md"


const EditNote = () => {
    const {notes, setNotes} = useContext(NoteContext)
    // const {user} = UserAuth()

    const [loading, setLoading] = useState(false)

    const [newTitle, setNewTitle] = useState("")
    const [newContent, setNewContent] = useState("")

    const [newEvent, setNewEvent] = useState("");
    const [newWhere, setNewWhere] = useState("");
    const [newWhen, setNewWhen] = useState("");
    const [newWho, setNewWho] = useState("");
    const [newBeginning, setNewBeginning] = useState("");
    const [newUnfold, setNewUnfold] = useState("");
    const [newEnd, setNewEnd] = useState("");
    const [newSource, setNewSource] = useState("");
    const [newTag, setNewTag] = useState("")

    const [toEdit, setToEdit] = useState("")

    // this useEffect makes it so that every render
    // the firebase database is Synced with the notes state
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

    // this function avoids the refreshing of the page
    // and gets the id of the element the user wants to change;
    // furthermore, it fills the input fields with the values
    // of the relative note
    const handleSelect = (e) => {
        e.preventDefault();

        setToEdit(e.target.id)

        notes.forEach((note)=>{
            if (note.id === e.target.id){
                setNewTitle(note.title)
                setNewContent(note.content)
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

    const handleDelete = async(id) => {
        await deleteDoc(doc(db, "notes", id))
    }

    // const capitalize = (text) => {
        
    //     let split = text.split("")
    //     split[0] = split[0].toUpperCase()

    //     const str = split.join("")

    //     return str
        
    // }

    // this function makes it so that changes to newTitle and newContent
    // states are reflected on the original notes state
    const handleEditChange = (e) => {
        // eslint-disable-next-line array-callback-return
        setNotes(current => current.map(obj => {
            if (obj.id === toEdit) {
                return {...obj, 
                    title: newTitle, 
                    content: newContent,
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
    }

    
    // this async function makes it so that the newTitle 
    // and newContent states are sent to the relative document in the database.
    // It receives the id of the note that's being edited so that
    // I dont have to iterate through the notes once more
    // in order to find the desired note
    const handleFirebaseEdit = async(id) => {        

        await updateDoc(doc(db, "notes", id), {
            title: newTitle,
            content: newContent,
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

    }

    // this function returns the form that allows me to edit the selected note
    // I decided to not put it in the main 'return section' so that I can
    // render it only if there are notes to edit.
    const display = () => {
        return (
            // eslint-disable-next-line array-callback-return
            notes.map((note)=>{
                if (note.id === toEdit) 
                return (
                    <form onSubmit={handleSubmit} id={note.id} 
                    className="flex flex-col gap-5 p-3" key={note.id}>

                        {/* <label htmlFor="title" >Title</label>
                        <input className="bg-slate-100/60" type="text" value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)} 
                        name="title" />

                        <label htmlFor="content">content</label>
                        <input className="bg-slate-100/60" type="text" value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        name="content" /> */}
                        
                        <div className="flex flex-col gap-2 w-full p-2 bg-slate-400/30">
                            <h1>Section 1</h1>
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="event">Event</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newEvent}
                                onChange={(e) => setNewEvent(e.target.value)}
                                name="event" />
                            </div>
                        </div>



                        <div className="flex flex-col gap-2 w-full p-2 bg-slate-400/30">
                            <h1>Section 2</h1>
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="where">Where</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newWhere}
                                onChange={(e) => setNewWhere(e.target.value)}
                                name="where" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="when">When</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newWhen}
                                onChange={(e) => setNewWhen(e.target.value)}
                                name="when" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="who">Who</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newWho}
                                onChange={(e) => setNewWho(e.target.value)}
                                name="who" />
                            </div>

                        </div>


                        <div className="flex flex-col gap-2 w-full p-2 bg-slate-400/30">
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="beginning">Beginning</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newBeginning}
                                onChange={(e) => setNewBeginning(e.target.value)}
                                name="beginning" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="unfold">Unfold</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newUnfold}
                                onChange={(e) => setNewUnfold(e.target.value)}
                                name="unfold" />
                            </div>

                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="end">End</label>
                                <textarea className="bg-slate-100/80 p-1" type="text" value={newEnd}
                                onChange={(e) => setNewEnd(e.target.value)}
                                name="end" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="source">Source</label>
                            <textarea className="bg-slate-100/80 p-1" type="text" value={newSource}
                            onChange={(e) => setNewSource(e.target.value)}
                            name="source" />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-bold" htmlFor="tag">Tag</label>
                            <textarea className="bg-slate-100/80 p-1" type="text" value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            name="tag" />
                        </div>


                        <button className="flex py-2 w-[fit-content] mt-4 bg-blue-300 px-2 items-center"  
                        type="submit" id={note.id} 
                        onClick={() => handleFirebaseEdit(note.id) && 
                        handleEditChange}>
                            <p>Edit</p>
                            <IoIosCreate size={28}/>
                        </button>


                    </form>
                )
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="flex flex-col justify-center bg-peirson bg-no-repeat 
        bg-cover bg-blend-soft-light p-2 flex-1
        text-2xl bg-slate-300 gap-5">
            {loading ? <FaSpinner className="animate-spin" size={46}/> : 
            <div className="flex m-1 flex-col gap-2 bg-slate-200 p-2">
                <div className="font-bold">Select the event you wish to edit</div>
                {notes.map((note)=>{
                    return (
                    <div className="bg-slate-50 p-2" key={note.id}>
                    
                        <div>{note.event}</div>
                        <div>{note.id}</div>

                        <div className="flex gap-2">
                            <button className="flex py-2 w-[fit-content] px-2 items-center" 
                                id={note.id}>
                                <p onClick={handleSelect} id={note.id}>Select</p>
                                <IoMdCreate onClick={handleSelect} id={note.id}/>
                            </button>

                            <button className="flex items-center w-[fit-content] bg-red-100 px-2 gap-1" 
                            onClick={() => handleDelete(note.id)} id={note.id}>
                                <p>Delete</p>
                                <MdOutlineDelete />
                            </button>
                        </div>

                    </div>
                    )
                
                })}
            </div>
            }
            

            {(toEdit) ? (
            <div>
                {display()}
            </div>):null}

        </div>
    )
}

export default EditNote;