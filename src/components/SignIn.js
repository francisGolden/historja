import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { IoIosLogIn } from "react-icons/io";

const SignIn = () => {
  const { signIn, user } = UserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/notes");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/notes");
    } catch (e) {
      setError(e.message);

      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col flex-1 
        items-center justify-center 
        gap-5 p-3 
        text-2xl
        bg-peirson bg-cover bg-blend-soft-light bg-slate-300"
    >
      <div className="flex justify-center items-center flex-1">
        <h1 className="text-6xl font-bold">Login</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center bg-slate-100
        rounded-xl p-4 md:p-8 box-border max-w-[600px] w-full items-center gap-3 mb-4"
      >
        <div className="flex flex-col items-center">
          <label className="text-2xl mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 bg-transparent text-center border-b-2 w-full focus:outline-none focus:border-b-slate-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            type="text"
          />
        </div>

        <div className="flex flex-col items-center mb-4">
          <label className="text-2xl mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 bg-transparent text-center border-b-2 w-full focus:outline-none focus:border-b-slate-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
            
          />
        </div>

        <button
          className="w-[fit-content] bg-green-300 flex justify-center items-center gap-2
        px-2 rounded py-1 hover:bg-green-500 drop-shadow"
        >
          <span>Sign in</span>
          <IoIosLogIn />
        </button>
      </form>

      <div className="flex justify-center text-xl items-center flex-col">
        Forgot your password?
        <Link
          to="forgot-password"
          className="w-[fit-content] underline underline-offset-2"
        >
          Reset password
        </Link>
      </div>

      <div className="flex justify-center text-xl items-center flex-col">
        Don't have an account?
        <Link
          to="signup"
          className="w-[fit-content] underline underline-offset-2"
        >
          Sign up
        </Link>
      </div>
      <p className="text-sm text-center">
        Background image attribution <br></br>John Singleton Copley, Public
        domain, through Wikimedia Commons
      </p>
    </div>
  );
};

export default SignIn;
