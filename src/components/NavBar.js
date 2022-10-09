import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  // I gather the nav boolean from the AuthContext
  const { nav } = UserAuth();

  // resize logic
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // logout logic
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  // burger logic
  const [isBurger, setBurger] = useState(false);

  // Show the desktop nav if the user is logged in and window is desktop size
  if (nav === true && user.emailVerified && isDesktop) {
    return (
      <div
        className="shadow-md flex flex-col md:flex-row 
        md:gap-10 gap-3 bg-gray-400/40 py-4 text-xl font-bold p-3
        justify-between items-center text-gray-700"
      >
        <div className="flex gap-2 justify-start items-center">
          <button>
            <Link
              className="flex items-center h-[60px] md:h-[60px]  bg-slate-200 p-2 leading-none
            rounded"
              to="/notes"
            >
              My events
            </Link>
          </button>

          <button>
            <Link
              className="flex items-center h-[60px] md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
              to="/new"
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

          <button>
            <Link
              className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
              to="/flash"
            >
              Flash cards
            </Link>
          </button>
        </div>
        <div className="flex gap-3">
          <button>
            <Link
              className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
              to="/about"
            >
              About this app
            </Link>
          </button>
          <button>
            <Link
              className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
              to="/account"
            >
              My Account
            </Link>
          </button>
          <button
            className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
          >
            <IoIosLogOut size={28} onClick={() => handleLogout()} />
          </button>
        </div>
      </div>
    );
  } else if (nav === true && user.emailVerified && !isDesktop) {
    return (
      <AnimatePresence>
        {isBurger ? (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            key={"burger"}
            transition={{ type: "spring", duration: 0.7 }}
            className="grid grid-cols-1 grid-rows-3 text-4xl w-full justify-center 
      overflow-hidden scrollbar-hide h-full fixed bg-slate-200 z-10 gap-2"
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
                  className="flex items-center h-[60px] md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
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
                  className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
                  to="/flash"
                  onClick={() => setBurger(!isBurger)}
                >
                  Flash cards
                </Link>
              </button>
              <button className="">
                <Link
                  className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
                  to="/about"
                  onClick={() => setBurger(!isBurger)}
                >
                  About this app
                </Link>
              </button>
              <button className="">
                <Link
                  className="flex items-center h-[60px] leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
                  to="/account"
                  onClick={() => setBurger(!isBurger)}
                >
                  My Account
                </Link>
              </button>
              <button
                onClick={() => handleLogout()}
                className="flex items-center h-[60px] text-red-500 leading-none md:h-[60px] hover:bg-slate-100 bg-slate-200 p-2 gap-1 
            rounded"
              >
                Logout
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-start px-4 py-3 items-center w-full bg-transparent text-4xl">
            <button>
              <GiHamburgerMenu onClick={() => setBurger(!isBurger)} />
            </button>
          </div>
        )}
      </AnimatePresence>
    );
  } else {
    return null;
  }
};

export default NavBar;
