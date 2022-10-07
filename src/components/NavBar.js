import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const NavBar = () => {
  // I gather the nav boolean from the AuthContext
  const { nav } = UserAuth();

  // logout logic
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await logout();
      navigate("/");
    } catch (e) {console.log(e)}
  };

  // Only show the nav if the user is logged in
  if (nav === true && user.emailVerified) {
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
  } else {
    return null;
  }
};

export default NavBar;
