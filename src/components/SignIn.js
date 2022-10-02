import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";

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
      console.log(email + " has logged in");
    } catch (e) {
      setError(e.message);
      console.log(error);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col flex-1 
        items-center justify-center 
        gap-5 p-3 
        text-2xl
        bg-romano bg-cover bg-blend-soft-light bg-slate-300"
    >
      <h1 className="text-6xl font-bold">Historja</h1>
      <br />
      <h1 className="text-3xl">Sign in to your account</h1>
      <br />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-3 mb-4"
      >
        <div className="flex flex-col items-center">
          <label className="text-3xl mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="p-2"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            type="text"
            
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="text-3xl mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="p-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            type="password"
          />
        </div>

        <button
          className="w-[fit-content] bg-green-300 
        px-2 rounded py-1 hover:bg-green-500 drop-shadow"
        >
          Sign in
        </button>
      </form>

      <div className="flex justify-center items-center flex-col">
        Forgot your password?
        <Link
          to="forgot-password"
          className="w-[fit-content] bg-slate-200 
        px-2 rounded py-1 hover:bg-slate-300 drop-shadow"
        >
          Reset password
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col">
        Don't have an account?
        <Link
          to="signup"
          className="w-[fit-content] bg-blue-200 
        px-2 rounded py-1 hover:bg-blue-300 drop-shadow"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
