import { useContext, useState, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";

import { onSnapshot, collection, query } from "firebase/firestore";
import { GiConsoleController } from "react-icons/gi";

const FlashCard = () => {
  const [question, setQuestion] = useState("");
  const [what, setWhat] = useState("");
  const [answer, setAnswer] = useState("");

  const { user } = UserAuth();

  const [playing, setPlaying] = useState(false);

  const [incremental, setIncremental] = useState(0);
  const [play, setPlay] = useState("");

  const [toPlay, setToPlay] = useState("");

  const { notes, loading, setLoading } = useContext(NoteContext);

  // this useEffect makes it so that every render
  // the firebase database is Synced with the notes state
  // it also manages the loading spinner
  //   useEffect(() => {
  //     const q = query(collection(db, "notes"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       let notesArr = [];
  //       querySnapshot.forEach((doc) => {
  //         // push only the user's own notes
  //         if (doc.data().userid === user.uid) {
  //           notesArr.push({ ...doc.data(), id: doc.id });
  //         }
  //       });
  //       setNotes(notesArr);
  //     });
  //     return () => unsubscribe();

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  let arr = [];
  let arrContainer = [];

  const capitalize = (text) => {
    if (question) {
      let split = text.split("");
      split[0] = split[0].toUpperCase();

      const str = split.join("");

      return str;
    }
  };

  const selectCard = (e) => {
    notes.forEach((note) => {
      if (
        note.id === e.target.id &&
        note.event &&
        note.when &&
        note.where &&
        note.who &&
        note.unfold &&
        note.beginning &&
        note.source &&
        note.end
      ) {
        setIncremental(0);
        setWhat("Press PLAY");
        setAnswer("");
        setAns("");
        setQuestion("");
        setPlay("PLAY");
        setPlaying(true);

        setToPlay(e.target.id);
      } else {
        // alert("not enough filled fields")
        // return false

        return false;
      }
    });
  };

  const [cardBackground, setCardBackground] = useState("");

  const playGame = () => {
    notes.forEach((note) => {
      if (note.id === toPlay) {
        Object.keys(note).forEach((item) => {
          if (
            item !== "title" &&
            item !== "userid" &&
            item !== "id" &&
            item !== "content" &&
            item !== "event" &&
            item !== "tag" &&
            item !== "coords" &&
            item !== "img"
          ) {
            arr = [];
            arr[0] = item;
            arr[1] = note[item];
            arr[2] = note.event;
            arr[3] = note.img;
            arrContainer.push(arr);
          }
        });
      }
    });

    setAns("Click here to show the answer");
    setPlaying(true);

    setPlay("NEXT!");

    if (incremental <= 7) {
      setIncremental(incremental + 1);
      setQuestion(arrContainer[incremental][0] + "?");
      setWhat(arrContainer[incremental][2]);
      setAnswer(arrContainer[incremental][1]);

      setCardBackground(arrContainer[incremental][3]);
    } else if (incremental > 6) {
      setIncremental(0);
      setQuestion("");
      setPlay("PLAY");
      setPlaying(false);

      setCardBackground("");
    }
  };

  const [ans, setAns] = useState("");

  const show = () => {
    setAns(answer);
  };

  const gridCustom = () => {
    if (notes.length <= 1) {
      return "md:grid-cols-1"
    } else {
      return "md:grid-cols-2"
    }
  }

  return (
    <div
      className="flex flex-col justify-center 
        bg-cardsharps bg-no-repeat bg-slate-300
        bg-cover p-3 bg-blend-soft-light
        items-center flex-1 text-2xl gap-2"
    >
      <div
        className="flex flex-col text-center
            justify-start items-center lg:w-1/2 w-full
            h-full"
      >
        {playing === false ? (
          <h2 className="text-2xl p-5">
            Select the event and press <b>PLAY</b>
          </h2>
        ) : (
          <p className="font-bold mb-3 text-3xl p-3">{what.toUpperCase()}</p>
        )}

        <div
          style={playing ? { display: `flex` } : { display: "grid" }}
          className={`grid ${gridCustom()} flex-col overflow-scroll 
          scrollbar-hide w-full gap-2 md:gap-0
          bg-transparent
          h-full
          justify-center items-center`}
          //   style={
          //     cardBackground ? { backgroundImage: `url(${cardBackground})` } : {}
          //   }
        >
          {playing === false ? null : (
            <p
              className="bg-gradient-to-r from-yellow-300/60
                    to-yellow-500/60 
                    py-5 text-4xl w-screen"
            >
              {capitalize(question)}{" "}
              {playing === true ? `${incremental}/8` : null}
            </p>
          )}

          {playing === false
            ? notes.map((note) => {
                return (
                  <div
                    onClick={selectCard}
                    className="flex items-center justify-center 
                                hover:bg-blue-200/70 h-full w-screen
                                 md:w-full
                                bg-slate-200/80 hover:animate-pulse 
                                bg-blend-soft-light bg-cover bg-center"
                    key={note.id}
                    id={note.id}
                    style={
                      note.img ? { backgroundImage: `url(${note.img})` } : {}
                    }
                  >
                    <p onClick={selectCard} id={note.id} className="font-bold text-3xl">
                      {note.event}
                    </p>
                  </div>
                );
              })
            : null}

          {playing === true ? (
            <div
              className="flex flex-col flex-1 cursor-pointer 
                        justify-center"
            >
              <button
                style={{ whiteSpace: "break-spaces" }}
                className="overflow-scroll text-3xl p-2 max-h-[300px] scrollbar-hide"
                onClick={show}
              >
                {ans}
              </button>
            </div>
          ) : null}

          {loading ? (
            <div className="flex justify-center items-center flex-1 text-3xl font-bold">
              loading
            </div>
          ) : null}

          {playing === true ? (
            <button
              className="bg-green-300 hover:bg-green-300 
                        animate-pulse mb-3
                        rounded px-3 text-5xl"
              onClick={playGame}
            >
              {play}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
