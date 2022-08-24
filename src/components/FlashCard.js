import { useContext, useState, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../firebase";

import {BsFillPlayFill} from "react-icons/bs"

import { onSnapshot, collection, query } from "firebase/firestore";



const FlashCard = () => {
    const [question, setQuestion] = useState("");
    const [what, setWhat] = useState("");
    const [answer, setAnswer] = useState("");

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
                setToPlay(e.target.id)

                console.log(note)
            } else {
                // alert("not enough filled fields")
                // return false
                console.log("note enough")
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
                    item !== "event") {
                        arr = []
                        arr[0] = item;
                        arr[1] = note[item]
                        arr[2] = note.event
                        arrContainer.push(arr)
                    }
                    
                })
            }
            
        })
        
        setAns("Click to show the answer")
        setPlay("NEXT!")
        console.log(arrContainer)

        setQuestion(arrContainer[incremental][0] + "?")
        setWhat(arrContainer[incremental][2])
        setAnswer(arrContainer[incremental][1])

        
        console.log(arrContainer[0])

        if (incremental<6){
            setIncremental(incremental + 1)
        } else {
            setIncremental(0)
            setPlay("PLAY")
        }
        
        
    }

    const [ans, setAns] = useState("");

    const show = () => {
        setAns(answer)
    }

    
    return (
        <div className="flex flex-col justify-center bg-cardsharps bg-no-repeat 
        bg-cover bg-blend-soft-light p-6
        items-center flex-1 text-2xl bg-slate-300 gap-5">

            <h2 className="text-3xl">Select the event and press PLAY</h2>

            {notes.map((note)=>{
                return (
                <div className="flex m-1 flex-col rounded text-slate-50 gap-2 
                bg-gradient-to-l from-green-300/70 cursor-pointer
                to-green-500/80 hover:animate-pulse p-3 w-[400px]" key={note.id}>

                    <div onClick={selectCard} id={note.id} className="flex gap-2 cursor-pointer">
                        <div onClick={selectCard} className="flex py-2 w-[fit-content] px-2  items-center" 
                            id={note.id}>
                            <p onClick={selectCard} id={note.id}>{note.event}</p>
                            <BsFillPlayFill onClick={selectCard} id={note.id}/>
                        </div>
                    </div>

                </div>
                )
            
            })}

            <button className="bg-slate-300 hover:bg-slate-200 
            hover:animate-pulse
            rounded px-3 text-5xl" onClick={playGame}>{play}</button>

            <div className="flex flex-col text-center rounded-xl 
            justify-start items-center
             bg-slate-500/50 w-[400px] border-8 border-black p-3 h-[600px]">

                

                <p className="font-bold mb-3 text-3xl">{what.toUpperCase()}</p>
                <div className="flex flex-col border-4 border-black 
                flex-1 bg-yellow-200/50 w-[100%] 
                justify-center items-center">

                    <p className="bg-gradient-to-r from-yellow-300/60
                    to-yellow-500/60 
                    py-5 text-4xl w-[100%]">{capitalize(question)}</p>

                    <div onClick={show} className="flex flex-col flex-1 cursor-pointer 
                    justify-center">
                        <button >{ans}</button>
                    </div>

                </div>
                
            </div>

        </div>
    )
};

export default FlashCard;