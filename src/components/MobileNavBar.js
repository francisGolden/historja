import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MobileNavBar = () => {
  const [isBurger, setBurger] = useState(false);

  // logout logic
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { nav } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  if (nav === true && user.emailVerified)
    return (
      <AnimatePresence>
        <div className="flex justify-start px-4 py-3 items-center w-full bg-transparent text-4xl">
          <button>
            <GiHamburgerMenu onClick={() => setBurger(!isBurger)} />
          </button>
        </div>
        {isBurger ? (
          <motion.div
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
              <button className="">
                <Link
                  className="flex items-center h-[60px] md:h-[60px]  bg-slate-200 p-2 leading-none
                rounded"
                  to="/notes"
                  onClick={() => setBurger(!isBurger)}
                >
                  Events
                </Link>
              </button>

              <button className="">
                <Link
                  className="flex items-center h-[60px] md:h-[60px] bg-slate-200 p-2 gap-1 
                rounded"
                  to="/new"
                  onClick={() => setBurger(!isBurger)}
                >
                  Create
                </Link>
              </button>

              {/* <button>
                            <Link 
                            className="flex items-center gap-1" 
                            to="/edit">
                                Edit event
                                <IoIosCreate color="white" size={28}/>
                            </Link>
                        </button> */}

              <button className="">
                <Link
                  className="flex items-center h-[60px] leading-none md:h-[60px] bg-slate-200 p-2 gap-1 
                rounded"
                  to="/flash"
                  onClick={() => setBurger(!isBurger)}
                >
                  Flash cards
                </Link>
              </button>
              <button className="">
                <Link
                  className="flex items-center h-[60px] leading-none md:h-[60px] bg-slate-200 p-2 gap-1 
                rounded"
                  to="/about"
                  onClick={() => setBurger(!isBurger)}
                >
                  About this app
                </Link>
              </button>
              <button className="">
                <Link
                  className="flex items-center h-[60px] leading-none md:h-[60px] bg-slate-200 p-2 gap-1 
                rounded"
                  to="/account"
                  onClick={() => setBurger(!isBurger)}
                >
                  My Account
                </Link>
              </button>
              <button
                onClick={() => handleLogout()}
                className="flex items-center h-[60px] text-red-500 leading-none md:h-[60px] bg-slate-200 p-2 gap-1 
                rounded"
              >
                Logout
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
};

export default MobileNavBar;
