import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser, logout } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUser(email, password);
      navigate("/");
      alert(
        "Check your inbox and verify your email. The email might end up in the spam folder"
      );
      logout();
    } catch (e) {
      setError(e.message);
      alert(error);
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
      <h1 className="text-5xl text-center font-bold">Create a new account</h1>
      <br />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center
            gap-3 mb-4"
      >
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="text"
          className="text-2xl p-2"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="text"
          className="text-2xl p-2"
        />
        <button
          className="w-[fit-content] bg-green-400 
        px-2 rounded py-1 hover:bg-green-500 drop-shadow"
        >
          Sign Up
        </button>
      </form>
      Already have an account?{" "}
      <Link to="/" className="underline">
        Sign in
      </Link>
    </div>
  );
};

export default SignUp;
