import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { GiCardExchange } from "react-icons/gi";
import {IoIosLogIn, IoMdAlbums, IoIosCreate} from "react-icons/io"

const NavBar = () => {   

    // I gather the nav boolean from the AuthContext 
    const {nav} = UserAuth()

    // logout logic
    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            let msg = user.email
            await logout()
            navigate("/")
            console.log(msg + " has logged out")
        }
        catch (e) {
            console.log(e.message)
        }
        
    }

    // Only show the nav if the user is logged in
    if (nav === true) {
        return (
        <div className="shadow-md flex flex-col md:flex-row 
        md:gap-10 gap-3 bg-gray-400/40 py-4 text-xl p-3
        justify-center items-center text-gray-700">
            <div className="flex gap-2 justify-start items-center">

                    <button>
                        <Link 
                        className="flex items-center gap-1" 
                        to="/notes">
                            My events
                            <IoMdAlbums color="white" size={28}/>
                        </Link>
                    </button>
                    
                    
                    <button>
                        <Link 
                        className="flex items-center gap-1" 
                        to="/new">
                            Create
                            <IoIosCreate color="white" size={28}/>
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
                        className="flex items-center gap-1" 
                        to="/flash">
                            Flash card
                            <GiCardExchange color="rgb(253 224 71)" size={28}/>
                        </Link>
                    </button>

                    
            </div>
            <div className="flex gap-3">
                {/* <button>
                    <Link 
                    className="flex items-center gap-1" 
                    to="/account">
                            My Account
                        <IoIosPerson size={28}/>
                    </Link>
                </button> */}

                <p>{user.email}</p>
                {/* <button onClick={handleLogout}>Logout</button> */}
                <button><IoIosLogIn size={28} onClick={handleLogout}/></button>
            </div>
            
        </div>
        )
    } else {
        return null
    }
}

export default NavBar;