import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const { createUser } = UserAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")

        try {
            await createUser(email, password)
            navigate("/account")
        } 
        catch(e) {
            setError(e.message)
            console.log(error)
        }
    }
    
    return (
        <div className="flex flex-col justify-center
        items-center text-left flex-1 bg-slate-200">
            <h1 className="text-4xl">Create a new account</h1><br />

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center
            gap-3 mb-4">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} name="email" type="text" />
                <label htmlFor="password">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} name="password" type="text" />
                <button>Sign Up</button>
            </form>


            Already have an account? <Link to="/">Sign in</Link>

        </div>
    )
}

export default SignUp;