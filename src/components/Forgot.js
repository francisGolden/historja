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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4 mb-4"
      >
        <div className="flex flex-col items-center gap-4">
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
      <Link to="/" className="w-[fit-content] underline underline-offset-4">
        Back
      </Link>
      {/* Don't have an account?<Link to="signup">Sign up</Link> */}
    </div>
  );
};

export default Forgot;
