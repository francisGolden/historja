import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const MobileNavBar = () => {
  const [isBurger, setBurger] = useState(false);

  // logout logic
  const { user, nav } = UserAuth();

  const buttons = [
    { id: 1, toPath: "/notes", content: "Events" },
    { id: 2, toPath: "/new", content: "Create" },
    { id: 3, toPath: "/flash", content: "Flash cards" },
    { id: 4, toPath: "/about", content: "About" },
    { id: 5, toPath: "/account", content: "My Account" },
    
  ];

  if (nav === true && user.emailVerified)
    return (
      <AnimatePresence>
        <div className="flex justify-start px-4 py-3 items-center w-full bg-transparent text-4xl">
          <button aria-controls="menu">
            <GiHamburgerMenu onClick={() => setBurger(!isBurger)} />
          </button>
        </div>
        {isBurger ? (
          <motion.nav
            initial={{ x: "-100%", borderRadius: "0% 50% 50% 0%" }}
            animate={{ x: 0, borderRadius: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            key={"burger"}
            transition={{ type: "spring", duration: 0.7, bounce: 0.25 }}
            className="grid grid-cols-1 grid-rows-3 text-4xl w-full z-10 justify-center 
        overflow-hidden scrollbar-hide h-full fixed bg-slate-200 gap-2"
          >
            <div className="flex justify-end items-start p-4">
              <button onClick={() => setBurger(!isBurger)}>
                <GrClose size={48} />
              </button>
            </div>

            <div className="flex flex-col gap-6 w-full p-4 font-bold justify-center items-center">
              {buttons.map((button, i) => (
                <motion.button key={button.id}
                initial={{opacity: 0, x: "-100%"}}
                animate={{opacity: 1, x: 0}}
                exit={{x: "-100%"}}
                transition={{delay: 0.05*i, type: "spring", bounce: 0}}>
                  <Link
                    className="flex items-center h-[60px] md:h-[60px]  bg-slate-200 p-2 leading-none
                rounded"
                    to={button.toPath}
                    onClick={() => setBurger(!isBurger)}
                  >
                    {button.content}
                  </Link>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    );
};

export default MobileNavBar;
