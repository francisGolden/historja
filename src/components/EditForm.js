import { useState } from "react";
import { IoIosCreate } from "react-icons/io";
import EditAutocomplete from "./EditAutocomplete";
import { useLoadScript } from "@react-google-maps/api";


const EditForm = ({ note
    , handleDelete
    , handleFirebaseEdit
    , handleEditChange
    , newEvent
    , newWhere
    , newWhen
    , newWho
    , newBeginning
    , newUnfold
    , newEnd
    , newSource
    , newTag
    , setNewEvent
    , setNewWhere
    , setNewWhen
    , setNewWho
    , setNewBeginning
    , setNewUnfold
    , setNewEnd
    , setNewSource
    , setNewTag,
    setNewWhy, newWhy,
    handleSubmit, newCoords, setNewCoords }) => {

    const [libraries] = useState(["places"])


    const [address, setAddress] = useState("")


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
        libraries
    })

    return (
        <form onSubmit={handleSubmit} id={note.id} className="flex flex-col gap-2 w-full">

            <h2 className="text-center">
                Edit the desired fields and then <br></br>click the
                <b className="bg-blue-100 p-1 rounded">Save edits</b> button at the bottom of the page
            </h2>

            <div className="flex flex-col gap-2 p-2 bg-slate-300/70">
                <h1>Section 1</h1>
                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="event">Event</label>
                    <textarea className="bg-slate-100/80 p-1" type="text" value={newEvent}
                        onChange={(e) => setNewEvent(e.target.value)}
                        name="event" />
                </div>
            </div>


            <div className="flex flex-col gap-2 p-2 bg-slate-300/70">
                <h1>Section 2</h1>
                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="where">Where</label>
                    {/* <textarea className="bg-slate-100/80 p-1" type="text" value={newWhere}
                        onChange={(e) => setNewWhere(e.target.value)}
                        name="where" /> */}

                    <EditAutocomplete isLoaded={isLoaded} setNewWhere={setNewWhere}
                        newWhere={newWhere} address={address} setAddress={setAddress}
                        newCoords={newCoords} setNewCoords={setNewCoords} />

                </div>

                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="when">When</label>
                    <textarea className="bg-slate-100/80 p-1" type="text" value={newWhen}
                        onChange={(e) => setNewWhen(e.target.value)}
                        name="when" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="why">Why</label>
                    <textarea className="bg-slate-100/80 p-1" type="text" value={newWhy}
                        onChange={(e) => setNewWhy(e.target.value)}
                        name="why" />
                </div>

                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="who">Who</label>
                    <textarea className="bg-slate-100/80 p-1" type="text" value={newWho}
                        onChange={(e) => setNewWho(e.target.value)}
                        name="who" />
                </div>

            </div>


            <div className="flex flex-col gap-2 p-2 bg-slate-300/70">
                <h1>Section 3</h1>
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

            <div className="flex flex-col gap-2 p-2 bg-slate-300/70">
                <h1>Section 4</h1>
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
            </div>



            <button className="flex py-2 w-[fit-content] mt-4 bg-blue-300 px-2 items-center"
                type="submit" id={note.id}
                onClick={() => handleFirebaseEdit(note.id) &&
                    handleEditChange}>
                <p>Save edits</p>
                <IoIosCreate size={28} />
            </button>
        </form>
    )
}

export default EditForm;