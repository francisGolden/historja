/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { NoteContext } from "../context/NoteContext";
import {
  onSnapshot,
  collection,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./MapContainer";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import EditForm from "./EditForm";
import sortArray from "sort-array";
import Timeline from "./Timeline";
import Switch from "react-switch";
import { motion } from "framer-motion";

const NoteList = () => {
  const { notes, setNotes, loading } = useContext(NoteContext);

  const { user } = UserAuth();

  const [checked, setChecked] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [seeMap, setSeeMap] = useState(false);
  const [seeTimeline, setSeeTimeline] = useState(false);

  const [seeTags, setSeeTags] = useState(false);

  const [toEdit, setToEdit] = useState("");

  const [newEvent, setNewEvent] = useState("");
  const [newWhere, setNewWhere] = useState("");
  const [newWhen, setNewWhen] = useState("");
  const [newWho, setNewWho] = useState("");
  const [newBeginning, setNewBeginning] = useState("");
  const [newUnfold, setNewUnfold] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [newSource, setNewSource] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newCoords, setNewCoords] = useState();
  const [newWhy, setNewWhy] = useState("");
  const [newImg, setNewImg] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [showEvent, setShowEvent] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [coords, setCoords] = useState();

  const [address, setAddress] = useState("");

  const handleSelect = (e) => {
    setToEdit(e.target.id);

    // show only event the user is editing
    if (search !== e.target.name) {
      setSearch(e.target.name);
    } else if (search === e.target.name) {
      setSearch("");
      setToEdit("");
    }

    notes.forEach((note) => {
      if (note.id === e.target.id) {
        setNewEvent(note.event);
        setNewWhere(note.where);
        setNewWhen(note.when);
        setNewWho(note.who);
        setNewBeginning(note.beginning);
        setNewUnfold(note.unfold);
        setNewEnd(note.end);
        setNewSource(note.source);
        setNewTag(note.tag);
        setNewCoords(note.coords);
        setNewWhy(note.why);
        setNewImg(note.img);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setToEdit("");
    setSearch("");
  };

  const handleToggle = () => {
    setChecked(!checked);
  };

  // this function makes it so that changes to newTitle and newContent
  // states are reflected on the original notes state
  const handleEditChange = (e) => {
    // eslint-disable-next-line array-callback-return
    setNotes((current) =>
      current.map((obj) => {
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
            img: newImg,
          };
        }
      })
    );
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
      img: newImg,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const displayEvents = () => {
    return (
      // eslint-disable-next-line array-callback-return
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
          );
        }
      })
    );
  };

  useEffect(() => {
    handleSort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  // const [forMap, setForMap] = useState()

  // useEffect(()=>{
  //     setForMap(notes)
  // }, [])

  const handleSort = () => {
    if (sort === "desc") {
      setNotes(
        sortArray(
          notes.map((note) => {
            return { ...note, when: Number(note.when) };
          }),
          {
            by: "when",
            order: "desc",
          }
        )
      );
    }

    if (sort === "asc") {
      setNotes(
        sortArray(
          notes.map((note) => {
            return { ...note, when: Number(note.when) };
          }),
          {
            by: "when",
            order: "asc",
          }
        )
      );
    }
  };

  let arr = new Set();
  //   let peopleArr = new Set();

  const getTags = () => {
    notes.map((note) => {
      // eslint-disable-next-line no-useless-escape, array-callback-return
      return Array.from(
        note.tag
          .toLowerCase()
          .trim()
          .replace(/\s*\,\s*/g, ",")
          .split(",")
          .map((t) => {
            arr.add(t);
          })
      );
    });

    return Array.from(arr);
  };

  //   const getNames = () => {
  //     notes.map((note) => {
  //       // eslint-disable-next-line no-useless-escape, array-callback-return
  //       return Array.from(
  //         note.who
  //           .toLowerCase()
  //           .trim()
  //           .replace(/\s*\,\s*/g, ",")
  //           .split(",")
  //           .map((t) => {
  //             peopleArr.add(t);
  //           })
  //       );
  //     });

  //     return Array.from(peopleArr);
  //   };

  useEffect(() => {
    getTags();
    // getNames();
  }, [notes]);

  const filtrd = notes.filter(
    (item) =>
      item.event.toLowerCase().includes(search.toLowerCase()) ||
      item.when.toString().includes(search) ||
      item.tag.toLowerCase().includes(search.toLowerCase()) ||
      item.where.toLowerCase().includes(search.toLowerCase())
  );

  const [libraries] = useState(["places"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
    libraries,
  });

  const handleTags = () => {
    setSeeTags(!seeTags);
  };

  const handleShowEvent = (id) => {
    if (showEvent === id) {
      setShowEvent("");
    } else {
      setShowEvent(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="flex flex-col justify-start 
        p-3
        items-center flex-1 text-2xl bg-slate-300 gap-5"
    >
      <div className=" text-7xl font-bold mt-4 mb-4">
        <div
          className="p-4 bg-clip-text text-center 
        text-transparent bg-gradient-to-r from-sky-400 to-cyan-500 "
        >
          <h1>My Events</h1>
        </div>
      </div>

      <input
        className="py-1 text-center bg-zinc-100/80"
        type="text"
        placeholder="event, year, location or tag"
        onClick={() => setToEdit("") && setSearch("")}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-4 w-fit">
        <select
          defaultValue={"default"}
          className="bg-zinc-500/80 text-zinc-100 px-4"
          onChange={(e) => setSort(e.target.value)}
          name="sort"
          id="sort"
        >
          <option value="default" disabled>
            Sort by year
          </option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <label className="flex justify-center items-center gap-1">
          <div>Hide Event List</div>
          <Switch onChange={handleToggle} checked={checked} />
        </label>
      </div>

      <div className="flex justify-center items-center gap-1">
        {seeTags ? (
          <button
            onClick={handleTags}
            className="w-fit px-2 shadow-lg sm:hover:animate-pulse 
                sm:hover:bg-red-100 bg-red-200 transition-colors"
          >
            Hide tags
          </button>
        ) : (
          <button
            onClick={handleTags}
            className="w-fit px-2 shadow-lg sm:hover:animate-pulse 
                sm:hover:bg-slate-100 bg-slate-200 transition-colors"
          >
            Show tags
          </button>
        )}
      </div>

      {arr && seeTags ? (
        <ul className="grid grid-cols-2 lg:grid-cols-3 w-full lg:w-1/3 items-center gap-2">
          <li
            onClick={() => setSearch("")}
            className="cursor-pointer shadow-sm text-white max-h-[30px]
            font-bold bg-zinc-600/70 list-item px-2 text-xl rounded-lg"
          >
            All events
          </li>

          {getTags().map((t, index) => {
            return (
              <li
                id={t}
                key={index}
                className=" odd:bg-slate-400/70 font-bold max-h-[30px] truncate
                                    even:bg-slate-400/70 shadow-sm cursor-pointer
                        text-slate-100 list-item px-2 text-xl rounded-lg"
                onClick={(e) => setSearch(e.target.id)}
              >
                {t}
              </li>
            );
          })}
        </ul>
      ) : null}

      {checked === false && !loading ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          className="flex flex-col w-full lg:w-1/2 gap-2 "
        >
          {filtrd.map((note) => {
            return (
              <motion.div
                whileHover={{ y: -2, zIndex: 1 }}
                transition={{
                  type: "spring",
                  zIndex: 100,
                  duration: 0.4,
                }}
                className="flex flex-col
                        p-6 bg-slate-200/80 bg-blend-soft-light bg-cover bg-center shadow-sm"
                style={note.img ? { backgroundImage: `url(${note.img})` } : {}}
                key={note.id}
                id={note.id}
              >
                <p
                  className="text-4xl font-bold cursor-pointer"
                  onClick={() => handleShowEvent(note.id)}
                >
                  {note.event}{" "}
                </p>
                <p>{note.when}</p>
                {/* <ul className="flex gap-2 py-1">
                                    {Array.from(note.tag.toLowerCase().split(",")).map((t, index) => {
                                        return (
                                            <li key={index} className="bg-blue-300 list-item px-2 w-fit text-sm rounded-lg max-h-[20px] truncate">{t}</li>
                                        )
                                    })}
                                </ul> */}
                {/* <ul className="flex py-1 gap-2 mb-6">
                                    {Array.from(note.who.toLowerCase().split(",")).map((t, index) => {
                                        return (
                                            <li key={index} className="bg-yellow-300 list-item px-2 text-sm rounded-lg max-h-[20px] w-fit truncate">{t}</li>
                                        )
                                    })}
                                </ul> */}

                {showEvent === note.id ? (
                  <div
                    className="flex flex-col mb-4
                                     p-2 rounded gap-4"
                  >
                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">
                        Where did the event take place?
                      </h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                            p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>
                          {note.where.split(",")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">When did it happen?</h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                         p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>
                          {note.when}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">Why?</h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                         p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>{note.why}</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">
                        Who are the people/groups involved?
                      </h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                         p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>{note.who}</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">How did it start?</h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                         p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>
                          {note.beginning}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">How did it develop?</h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                         p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>
                          {note.unfold}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">
                        How and why did it end?
                      </h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                            p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>{note.end}</p>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="font-bold px-4">
                        What sources did you use?
                      </h1>
                      <div
                        className="flex flex-col bg-slate-100/60 border-2 border-slate-500
                                         p-4"
                      >
                        <p style={{ whiteSpace: "break-spaces" }}>
                          {note.source}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      className="hover:bg-green-300 w-fit px-3 border-2 border-stone-500 bg-zinc-100/80"
                      onClick={handleSelect}
                      name={note.event}
                      id={note.id}
                    >
                      Edit
                    </button>

                    <button
                      className="hover:bg-red-300 border-2 border-stone-500 bg-zinc-100/80 w-fit px-3 "
                      onClick={() => handleDelete(note.id)}
                      id={note.id}
                    >
                      Delete
                    </button>
                  </div>

                  <div>
                    <button
                      className="hover:bg-blue-300 border-2 border-stone-500 bg-zinc-100/80 w-fit px-3 "
                      onClick={() => handleShowEvent(note.id)}
                      name={note.event}
                      id={note.id}
                    >
                      {showEvent === note.id ? "Shrink" : "Expand"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : null}

      {loading ? <p>loading...</p> : null}

      {toEdit ? (
        <div className="flex w-full lg:w-1/2">{displayEvents()}</div>
      ) : null}

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

      {notes.length === 0 ? null : (
        <div
          className="flex justify-center text-blue-500
      font-bold text-5xl w-full"
        >
          <button
            onClick={() => {
              setSeeMap(!seeMap);
            }}
            className="bg-slate-200/50 hover:bg-slate-100/60 p-4 w-full"
            id="map"
          >
            Show Map
          </button>
        </div>
      )}

      {!isLoaded || !seeMap ? null : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          className="font-bold flex flex-col  decoration-green-500 items-center justify-center 
                text-4xl border-slate-500 w-full"
        >
          <div className="p-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
            <h1>Map</h1>
          </div>
          <Map filtrd={filtrd} />
          <p className="text-xl text-center">
            Refresh the page if the events are not being displayed correctly in
            the map
          </p>
        </motion.div>
      )}

      {notes.length === 0 ? null : (
        <div
          className="flex justify-center text-blue-500
      font-bold text-5xl w-full"
        >
          <button
            onClick={() => setSeeTimeline(!seeTimeline)}
            className="bg-slate-200/50 hover:bg-slate-100/60 p-4 w-full"
          >
            Show Timeline
          </button>
        </div>
      )}

      {seeTimeline ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          className="font-bold flex flex-col items-center
                 justify-center text-4xl border-slate-500 w-full"
        >
          <div className="p-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-600">
            <h1>Timeline</h1>
          </div>
          <Timeline filtrd={filtrd} />
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default NoteList;
