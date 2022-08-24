import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

const SignIn = () => {
    
    const {signIn, user} = UserAuth();
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const style = {
        foundation: "flex flex-col justify-center items-center bg-slate-300 text-left flex-1 bg-romano bg-no-repeat bg-cover bg-blend-soft-light",
        btn: "w-[fit-content] bg-pink-200 px-2 rounded py-1 hover:bg-purple-300 drop-shadow",
        form: "flex flex-col justify-center items-center gap-3 mb-4",
        label: "text-xl"
    }

    useEffect(()=>{
        if (user) {
            navigate("/new")
        }
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")

        try {
            await signIn(email, password)
            navigate("/new")
            console.log(email + " has logged in")
        }
        catch (e){
            setError(e.message)
            console.log(error)
            alert("Invalid email or password. Please try again.")
        }
        
        
    }
    
    
    return (
        <div className={style.foundation}>
            <h1 className="text-6xl font-bold">Historja</h1><br />
            <h1 className="text-3xl">Sign in to your account</h1><br />

            <form onSubmit={handleSubmit} className={style.form}>
                <label className={style.label} htmlFor="email">Email</label>
                <input  onChange={(e) => {
                    setEmail(e.target.value)
                }} name="email" type="text" />
                <label className={style.label} htmlFor="password">Password</label>
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} name="password" type="text" />
                <button className={style.btn}>Sign in</button>
            </form>


            Don't have an account?<Link to="signup">Sign up</Link>

        </div>
    )
}

export default SignIn;