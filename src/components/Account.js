import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Account = () => {

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

    return (
        <div className="flex flex-col justify-center  
        bg-wolfe bg-no-repeat bg-cover bg-blend-soft-light
        items-center text-left flex-1 bg-slate-200">
            
            <ul>
                <li>User: {user && user.email}</li>
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    )
}

export default Account;