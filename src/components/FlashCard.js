import { useContext, useState, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../firebase";

import { onSnapshot, collection, query } from "firebase/firestore";



const FlashCard = () => {
    const [question, setQuestion] = useState("");
    const [what, setWhat] = useState("");
    const [answer, setAnswer] = useState("");

    const [playing, setPlaying] = useState(false)

    const [incremental, setIncremental] = useState(0)
    const [play, setPlay] = useState("")

    const [toPlay, setToPlay] = useState("")

    const {notes, setNotes} = useContext(NoteContext)

    // this useEffect makes it so that every render
    // the firebase database is synced with the notes state
    useEffect(()=>{
        
        const q = query(collection(db, "notes"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setAns("")
            let notesArr = []
            querySnapshot.forEach((doc)=>{
                notesArr.push({...doc.data(), id: doc.id})
            });
            setNotes(notesArr);
            
        
        })
        return () => unsubscribe()
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let arr = []
    let arrContainer = []

    const capitalize = (text) => {
        if (question){
            let split = text.split("")
            split[0] = split[0].toUpperCase()
    
            const str = split.join("")
    
            return str
        }
    }

    const selectCard = (e) => {
        
        notes.forEach((note)=>{
            if (note.id === e.target.id && 
                note.event && note.when
                && note.where && note.who
                && note.unfold && note.beginning
                && note.source && note.end) {
                setIncremental(0)
                setWhat("")
                setAnswer("")
                setAns("")
                setQuestion("")
                setPlay("PLAY")
                setPlaying(true)

                setToPlay(e.target.id)

                
            } else {
                // alert("not enough filled fields")
                // return false
                
                return false
            }
        })
        
    }

    const playGame = () => {
        notes.forEach((note)=>{
            if (note.id === toPlay) {
                Object.keys(note).forEach((item)=>{
                    if (item !== "title" && 
                    item !== "userid" && 
                    item !== "id" &&
                    item !== "content" &&
                    item !== "event" && 
                    item !== "tag" &&
                    item !== "coords" &&
                    item !== "img") {
                        arr = []
                        arr[0] = item;
                        arr[1] = note[item]
                        arr[2] = note.event
                        arrContainer.push(arr)
                    }
                    
                })
            }
            
        })
        
        setAns("Click here to show the answer")
        setPlaying(true)
        setPlay("NEXT!")
        
        if (incremental<=7){
            setIncremental(incremental + 1)
            setQuestion(arrContainer[incremental][0] + "?")
            setWhat(arrContainer[incremental][2])
            setAnswer(arrContainer[incremental][1])
        } else if (incremental > 6) {
            setIncremental(0)
            setQuestion("")
            setPlay("PLAY")
            setPlaying(false)
        }
        
    }

    const [ans, setAns] = useState("");

    const show = () => {
        setAns(answer)
    }

    
    return (
        <div className="flex flex-col justify-center bg-cardsharps bg-no-repeat 
        bg-cover p-3 bg-blend-soft-light
        items-center flex-1 text-2xl bg-slate-300 gap-5">

            <div className="flex flex-col text-center rounded-xl 
            justify-start items-center
             bg-slate-500/90 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border-8 border-black p-3 h-5/6">

                {playing === false ? (<h2 className="text-3xl p-3">Select the event <br></br>and press <b>PLAY</b></h2>):
                <p className="font-bold mb-3 text-3xl p-3">{what.toUpperCase()}</p>
                }
                
                <div className="flex flex-col border-4 border-black 
                flex-1 bg-yellow-200/50 w-[100%] 
                justify-center items-center">

                    
                    {playing === false ? null : (<p className="bg-gradient-to-r from-yellow-300/60
                    to-yellow-500/60 
                    py-5 text-4xl w-[100%]">{capitalize(question)} {playing === true ? `${incremental}/8` : null }</p>)}

                    {playing === false ? (notes.map((note)=>{
                        return (

                                <div onClick={selectCard} className="flex items-center justify-center flex-1 w-full
                                bg-blue-500/80 hover:bg-blue-500/70" key={note.id}
                                    id={note.id}>
                                    <p onClick={selectCard} id={note.id}>{note.event}</p>
                                    
                                </div>
                        )
                
                    })):null}

                    {playing === true ? (<div className="flex flex-col flex-1 cursor-pointer 
                    justify-center">
                        <button onClick={show}>{ans}</button>

                    </div>):null}

                    {playing === true ? (<button className="bg-green-300 hover:bg-green-300 
                        animate-pulse mb-3
                        rounded px-3 text-5xl" onClick={playGame}>{play}
                    </button>) : null}
                </div>
                
            </div>

        </div>
    )
};

export default FlashCard;