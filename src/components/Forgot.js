import React from "react";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Forgot = () => {
  const { user, resetPassword } = UserAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const style = {
    foundation: "",
    btn: "w-[fit-content] bg-pink-200 px-2 rounded py-1 hover:bg-purple-300 drop-shadow",
    form: "",
    label: "",
  };

  //   useEffect(() => {
  //     if (user) {
  //       navigate("/new");
  //     }
  //   }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await resetPassword(email);
      navigate("/");
      console.log(email + " has reset the password");
      alert("Check your email to reset the password");
    } catch (e) {
      setError(e.message);
      console.log(error);
      alert("Invalid email.");
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
      <h1 className="text-3xl">Reset your password</h1>
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
            className="p-1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            type="text"
          />
        </div>

        <button className={style.btn}>Reset password</button>
      </form>
      <Link to="/" className="flex flex-col text-center
       justify-center items-center">
        or <br></br>go back to the Login page
      </Link>
      {/* Don't have an account?<Link to="signup">Sign up</Link> */}
    </div>
  );
};

export default Forgot;
