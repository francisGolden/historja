/* eslint-disable array-callback-return */
import { db } from "../firebase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import Autocomplete from "./Autocomplete";

import { UserAuth } from "../context/AuthContext";

import { useLoadScript } from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Notes = () => {
  const { user } = UserAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [event, setEvent] = useState("");
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [why, setWhy] = useState("");
  const [who, setWho] = useState("");
  const [beginning, setBeginning] = useState("");
  const [unfold, setUnfold] = useState("");
  const [end, setEnd] = useState("");
  const [source, setSource] = useState("");
  const [img, setImg] = useState("");
  const [tag, setTag] = useState("");

  const TextareaAutosize = require("react-textarea-autosize").default;

  // const [name, setName] = useState("")
  // const [birthDate, setBirthDate] = useState("")
  // const [birthPlace, setBirthPlace] = useState("")
  // const [alias, setAlias] = useState("")
  // const [marital, setMarital] = useState("")
  // const [gender, setGender] = useState("")
  // const [family, setFamily] = useState("")
  // const [religion, setReligion] = useState("")
  // const [role, setRole] = useState("")
  // const [events, setEvents] = useState("")
  // const [deathDate, setDeathDate] = useState("")
  // const [deathPlace, setDeathPlace] = useState("")
  // const [charImg, setCharImg] = useState("")

  const [coords, setCoords] = useState("");

  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const [address, setAddress] = useState("");

  const handleNew = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "notes"), {
      title: title,
      content: content,
      event: event,
      where: where,
      why: why,
      coords: coords,
      when: when,
      who: who,
      beginning: beginning,
      unfold: unfold,
      end: end,
      source: source,
      tag: tag,
      img: img,
      userid: user.uid,
    });
    notify(event);
    setEvent("");
    setWhen("");
    setWhere("");
    setWhy("");
    setCoords("");
    setWho("");
    setBeginning("");
    setUnfold("");
    setEnd("");
    setAddress("");
    setSource("");
    setTag("");
    setImg("");

    setAddress("");
    // navigate("/notes")
  };

  // const handleNewChar = async (e) => {
  //     e.preventDefault();

  //     await addDoc(collection(db, "characters"), {
  //         name: name,
  //         birthDate: birthDate,
  //         birthPlace: birthPlace,
  //         alias: alias,
  //         marital: marital,
  //         gender: gender,
  //         family: family,
  //         religion: religion,
  //         role: role,
  //         events: events,
  //         deathDate: deathDate,
  //         deathPlace: deathPlace,
  //         userid: user.uid,
  //         charImg: charImg,

  //     });

  //     setName("")
  //     setBirthDate("")
  //     setBirthPlace("")
  //     setAlias("")
  //     setMarital("")
  //     setGender("")
  //     setFamily("")
  //     setReligion("")
  //     setRole("")
  //     setEvents("")
  //     setDeathDate("")
  //     setDeathPlace("")
  //     setCharImg("")

  // }

  const [libraries] = useState(["places"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_app_googleMapsApiKey,
    libraries,
  });

  const notify = (event) => toast(`${event} created!`);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", duration: 0.3 }}
      className="flex flex-col justify-start
          items-center flex-1 text-2xl bg-slate-300 gap-2
          "
    >
      <ToastContainer
        position="top-right"
        autoClose={400}
        hideProgressBar={true}
        theme="dark"
      />

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.1,
          delayChildren: 0.2,
        }}
        className="flex items-center flex-col w-full"
        onSubmit={handleNew}
      >
        <div className="flex flex-col p-4 w-full lg:w-1/2 gap-6">
          <section className="flex flex-col gap-2 text-4xl w-full p-2">
            <div
              className="flex justify-center items-center 
            border-b-2 border-slate-500 gap-2 "
            >
              <p className="flex justify-center items-center">✍</p>
              <TextareaAutosize
                minRows={1}
                maxRows={4}
                className="bg-transparent font-bold overflow-y resize-none scrollbar-hide
                  w-full py-4 
            focus:outline-none"
                placeholder="Name of the event"
                value={event}
                required
                onChange={(e) => {
                  setEvent(e.target.value);
                }}
                type="text"
                name="event"
                autoFocus={true}
              />
            </div>
          </section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            id="where"
            className="flex flex-col gap-4 w-full p-2"
          >
            {event ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
                className="flex flex-col"
              >
                {/* <textarea className="bg-slate-100/80 p-1"
                      placeholder="Waterloo" value={where}
                      // onChange={(e) => { setWhere(e.target.value) }} 
                      type="text" name="where" />
                   */}
                <Autocomplete
                  setWhere={setWhere}
                  address={address}
                  setAddress={setAddress}
                  where={where}
                  coords={coords}
                  setCoords={setCoords}
                  isLoaded={isLoaded}
                />
              </motion.div>
            ) : null}

            {where && event ? (
              <motion.div
                className="flex flex-col w-full text-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>⌛</p>
                  <TextareaAutosize
                    className="bg-transparent focus:outline-none resize-none overflow-hidden w-full h-[50px] md:text-3xl py-2"
                    placeholder="When did the event take place?"
                    value={when}
                    required
                    onChange={(e) => {
                      setWhen(e.target.value);
                    }}
                    type="number"
                    name="when"
                  />
                </div>
              </motion.div>
            ) : null}

            {when && event ? (
              <motion.div
                className="flex flex-col w-full text-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🤔</p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="bg-transparent  focus:outline-none resize-none overflow-y scrollbar-hide w-full h-[50px] md:text-3xl py-2"
                    placeholder="Why did the event happen?"
                    value={why}
                    required
                    onChange={(e) => {
                      setWhy(e.target.value);
                    }}
                    type="text"
                    name="why"
                  />
                </div>
              </motion.div>
            ) : null}

            {why && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🪪</p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="bg-transparent 
                    focus:outline-none resize-none 
                    overflow-y scrollbar-hide w-full h-[50px] md:text-3xl py-2"
                    placeholder="Who was involved in this event?"
                    value={who}
                    required
                    onChange={(e) => {
                      setWho(e.target.value);
                    }}
                    type="text"
                    name="who"
                  />
                </div>
              </motion.div>
            ) : null}
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            id="evo"
            className="flex flex-col gap-2 w-full p-2"
          >
            {who && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🎬</p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="bg-transparent
                  focus:outline-none resize-none 
                  overflow-y scrollbar-hide w-full h-[50px] md:text-3xl py-2"
                    placeholder="How did it start?"
                    value={beginning}
                    required
                    onChange={(e) => {
                      setBeginning(e.target.value);
                    }}
                    type="text"
                    name="beginning"
                  />
                </div>
              </motion.div>
            ) : null}

            {beginning && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🎞</p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="bg-transparent focus:outline-none overflow-y overflow-y scrollbar-hide resize-none w-full h-[50px] md:text-3xl py-2"
                    placeholder="How did it unfold?"
                    value={unfold}
                    required
                    onChange={(e) => {
                      setUnfold(e.target.value);
                    }}
                    type="text"
                    name="unfold"
                  />
                </div>
              </motion.div>
            ) : null}

            {unfold && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🏁</p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="bg-transparent focus:outline-none overflow-y overflow-y scrollbar-hide resize-none w-full h-[50px] md:text-3xl py-2"
                    placeholder="How did it end?"
                    value={end}
                    required
                    onChange={(e) => {
                      setEnd(e.target.value);
                    }}
                    type="text"
                    name="end"
                  />
                </div>
              </motion.div>
            ) : null}
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            id="end"
            className="flex flex-col gap-2 w-full"
          >
            {end && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>📜</p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={4}
                    className="bg-transparent focus:outline-none overflow-y overflow-y scrollbar-hide resize-none w-full h-[50px] md:text-3xl py-2"
                    placeholder="What sources did you use for it?"
                    value={source}
                    required
                    onChange={(e) => {
                      setSource(e.target.value);
                    }}
                    type="text"
                    name="source"
                  />
                </div>
              </motion.div>
            ) : null}

            {source && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🖼</p>
                  <input
                    className="bg-transparent focus:outline-none overflow-hidden w-full h-[50px] md:text-3xl py-2"
                    placeholder="Image URL"
                    value={img}
                    onChange={(e) => {
                      setImg(e.target.value);
                    }}
                    type="text"
                    name="img"
                  />
                </div>
              </motion.div>
            ) : null}

            {source && event ? (
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                variants={{
                  visible: { opacity: 1 },
                  hidden: { opacity: 0 },
                }}
              >
                <div
                  className="flex gap-2 justify-start items-center w-full 
                  border-b-2 border-slate-500"
                >
                  <p>🏷</p>
                  <input
                    className="bg-transparent focus:outline-none overflow-hidden w-full h-[50px] md:text-3xl py-2"
                    placeholder="Tag1, Tag2, ..."
                    value={tag}
                    required
                    onChange={(e) => {
                      setTag(e.target.value);
                    }}
                    type="text"
                    name="tag"
                  />
                </div>
              </motion.div>
            ) : null}
          </motion.section>

          {tag && event ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              variants={{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
              }}
              className="flex w-full justify-center items-center"
            >
              <button
                className="bg-teal-400 hover:bg-teal-300 text-slate-100 p-4 my-4 text-4xl font-bold"
                type="submit"
              >
                Create event
              </button>
            </motion.div>
          ) : null}
        </div>
      </motion.form>

      {/* {(showCreateChar) ? (
              <form className="flex flex-col items-center w-full" onSubmit={handleNewChar}>
                  <div className="flex flex-col w-full lg:w-1/2 gap-6">
                      <div className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                          <h2 className="">What is the name of the person we are talking about?</h2>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="name">Full name</label>
                              <textarea className="bg-slate-100/80 p-1"
                                  placeholder="Nicolò Machiavelli" value={name} required
                                  onChange={(e) => { setName(e.target.value) }} type="text" name="name" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="alias">Alias</label>
                              <textarea className="bg-slate-100/80 p-1"
                                  placeholder="The Great" value={alias} required
                                  onChange={(e) => { setAlias(e.target.value) }} type="text" name="alias" />
                          </div>

                      </div>

                      <div id="where" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">
                          <h2 className="">What is the birth date?</h2>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="birthDate">Birth Date</label>
                              
                              <textarea className="bg-slate-100/80 p-1"
                                  placeholder="22/02/1492" value={birthDate}
                                  onChange={(e) => { setBirthDate(e.target.value) }} 
                                  type="date" name="birthDate" />


                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="birthPlace">Birth Place</label>
                              <input className="bg-slate-100/80 p-1"
                                  placeholder="Rome"
                                  value={birthPlace} required
                                  onChange={(e) => { setBirthPlace(e.target.value) }} type="text" name="birthPlace" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="marital">Husband/Wife</label>
                              <textarea className="bg-slate-100/80 p-1" value={marital} required
                                  placeholder="Caterina de' Medici"
                                  onChange={(e) => { setMarital(e.target.value) }} type="text" name="marital" />
                          </div>

                      </div>

                      <div id="evo" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="gender">Gender</label>
                              <textarea className="bg-slate-100/80 p-1" required
                                  placeholder="Male" value={gender}
                                  onChange={(e) => { setGender(e.target.value) }} type="text" name="gender" />
                          </div>


                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="family">Family</label>
                              <textarea className="bg-slate-100/80 p-1" required
                                  placeholder="Medici" value={family}
                                  onChange={(e) => { setFamily(e.target.value) }} type="text" name="family" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="religion">Religion</label>
                              <textarea className="bg-slate-100/80 p-1" required
                                  placeholder="Catholicism" value={religion}
                                  onChange={(e) => { setReligion(e.target.value) }} type="text" name="religion" />
                          </div>


                      </div>

                      <div id="end" className="flex flex-col gap-2 w-full p-2 bg-slate-200/70">

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="role">Role</label>
                              <textarea className="bg-slate-100/80 p-1" required
                                  placeholder="King of France" value={role}
                                  onChange={(e) => { setRole(e.target.value) }} type="text" name="role" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="img">Image URL</label>
                              <input className="bg-slate-100/80 p-1"
                                  value={img}
                                  onChange={(e) => { setImg(e.target.value) }} type="text" name="img" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="events">Events</label>
                              <textarea className="bg-slate-100/80 p-1"
                                  placeholder="Vienna, Garibaldi, Early Modern, .." value={events}
                                  onChange={(e) => { setEvents(e.target.value) }} type="text" name="events" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="deathDate">Death Date</label>
                              <textarea className="bg-slate-100/80 p-1"
                                  value={deathDate}
                                  onChange={(e) => { setDeathDate(e.target.value) }} type="date" name="events" />
                          </div>

                          <div className="flex flex-col">
                              <label className="font-bold" htmlFor="deathPlace">Death Place</label>
                              <textarea className="bg-slate-100/80 p-1"
                                  placeholder="Vienna" value={deathPlace}
                                  onChange={(e) => { setDeathPlace(e.target.value) }} 
                                  type="text" name="deathPlace" />
                          </div>

                      </div>

                      <button className="bg-slate-100 p-2" type="submit">Create character</button>

                  </div>
              </form>
          ) : null} */}
    </motion.div>
  );
};

export default Notes;
