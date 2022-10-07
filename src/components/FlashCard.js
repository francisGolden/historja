import { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FlashCard = () => {
  const [question, setQuestion] = useState("");
  const [what, setWhat] = useState("");
  const [answer, setAnswer] = useState("");
  const [height, setHeight] = useState("h-screen");

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
        setHeight("h-full");

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
            // arr[0] = item;
            let question = "";
            switch (item) {
              case "where":
                question = `Where did ${note.event} take place?`;
                arr[0] = question;
                break;
              case "when":
                question = `When did ${note.event} take place?`;
                arr[0] = question;
                break;
              case "why":
                question = `Why did ${note.event} happen?`;
                arr[0] = question;
                break;
              case "who":
                question = `Who was involved in ${note.event}?`;
                arr[0] = question;
                break;
              case "beginning":
                question = `How did ${note.event} start?`;
                arr[0] = question;
                break;
              case "unfold":
                question = `How did ${note.event} unfold?`;
                arr[0] = question;
                break;
              case "end":
                question = `How did ${note.event} end?`;
                arr[0] = question;
                break;
              case "source":
                question = `What sources did you use for ${note.event}?`;
                arr[0] = question;
                break;
              default:
                console.log();
            }
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
      setQuestion(arrContainer[incremental][0]);
      setWhat(arrContainer[incremental][2]);
      setAnswer(arrContainer[incremental][1]);

      setCardBackground(arrContainer[incremental][3]);
    } else if (incremental > 6) {
      setIncremental(0);
      setQuestion("");
      setPlay("PLAY");
      setPlaying(false);
      setHeight("h-screen");
      setCardBackground("");
    }
  };

  const [ans, setAns] = useState("");

  const show = () => {
    setAns(answer);
  };

  const gridCustom = () => {
    if (notes.length <= 1) {
      return "md:grid-cols-1";
    } else {
      return "md:grid-cols-2";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="flex flex-col justify-center 
       bg-slate-300
         p-3
        items-center flex-1 text-2xl gap-2"
    >
      <div
        className="flex flex-col text-center
            justify-start items-center lg:w-1/2 w-full
            h-full"
      >
        {playing === false && notes.length !== 0 ? (
          <div>
            <div className=" text-7xl font-bold mt-4 mb-4">
              <div
                className="p-4 bg-clip-text text-center 
        text-transparent bg-gradient-to-r from-amber-600 to-amber-700"
              >
                <h1>Flash cards</h1>
              </div>
            </div>
            <h2 className="text-2xl p-5">
              Select an event and press <b>PLAY</b>
            </h2>
          </div>
        ) : (
          <p className="font-bold mb-3 text-3xl p-3">{what.toUpperCase()}</p>
        )}

        <div
          style={playing ? { display: `flex` } : { display: "grid" }}
          className={`grid ${gridCustom()} flex-col overflow-scroll 
          scrollbar-hide w-full h-full
          bg-transparent gap-2
          
          justify-center items-start`}
          //   style={
          //     cardBackground ? { backgroundImage: `url(${cardBackground})` } : {}
          //   }
        >
          {playing === false ? null : (
            <div
              className="flex flex-col bg-gradient-to-r from-yellow-300/60
                    to-yellow-500/60 
                    py-5 text-4xl w-full"
            >
              <p className="text-2xl">{capitalize(question)}</p>{" "}
              <p className="text-2xl">
                {playing === true ? `${incremental}/8` : null}
              </p>
            </div>
          )}

          {notes.length === 0 ? (
            <p className="text-center">
              There's nothing here yet. <br></br>
              Go{" "}
              <Link to="/new" className="underline">
                ahead
              </Link>{" "}
              and create your first note
            </p>
          ) : null}

          {playing === false
            ? notes.map((note) => {
                return (
                  <motion.div
                    onClick={selectCard}
                    className="flex items-center justify-center 
                                hover:bg-blue-200/70 w-screen
                                 md:w-full min-h-[200px] cursor-pointer
                                bg-slate-200/80 hover:animate-pulse 
                                bg-blend-soft-light bg-cover bg-center"
                    key={note.id}
                    id={note.id}
                    style={
                      note.img ? { backgroundImage: `url(${note.img})` } : {}
                    }
                  >
                    <p
                      onClick={selectCard}
                      id={note.id}
                      className="font-bold text-3xl cursor-pointer"
                    >
                      {note.event}
                    </p>
                  </motion.div>
                );
              })
            : null}

          {playing === true ? (
            <div
              className="flex flex-col flex-1 cursor-pointer 
                        justify-center items-center w-full "
            >
              <button
                style={{ whiteSpace: "break-spaces" }}
                className="overflow-scroll text-2xl p-2 max-h-[300px] scrollbar-hide"
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
            <div className="flex justify-center items-center w-full">
              <button
                className="bg-green-300 hover:bg-green-300 
                        animate-pulse mb-3
                        rounded px-3 text-5xl"
                onClick={playGame}
              >
                {play}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default FlashCard;
