import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import CsvDownload from "react-json-to-csv";

const Account = () => {
  const { user, logout, delUser } = UserAuth();
  const { notes } = useContext(NoteContext);
  const [forCsv, setForCsv] = useState([]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {}
  };

  useEffect(() => {
    let arr = [];
    notes.forEach((note) => {
      Object.keys(note).forEach((item) => {
        if (
          item !== "title" &&
          item !== "userid" &&
          item !== "id" &&
          item !== "content" &&
          item !== "event" &&
          item !== "tag" &&
          item !== "coords" &&
          item !== "img"
        ) {
          let question = "";
          switch (item) {
            case "where":
              question = `Where did ${note.event} take place?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "when":
              question = `When did ${note.event} take place?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "why":
              question = `Why did ${note.event} take place?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "who":
              question = `Who was involved in ${note.event}?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "beginning":
              question = `How did ${note.event} start?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "unfold":
              question = `How did ${note.event} unfold?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "end":
              question = `How did ${note.event} end?`;
              arr.push({ question: question, answer: note[item] });
              break;
            case "source":
              question = `What sources did you use for ${note.event}?`;
              arr.push({ question: question, answer: note[item] });
              break;
            default:
              console.log();
          }
        }
      });
    });
    setForCsv(arr);
  }, [notes]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  return (
    <div
      className="flex flex-col flex-1 
        items-center justify-center 
        gap-5 p-3 
        text-2xl
        bg-wolfe bg-cover bg-blend-soft-light bg-slate-300"
    >
      <ul className="flex flex-col gap-4 text-center justify-center items-center">
        <li>Email: {user && user.email}</li>
        <li>
          <CsvDownload
            className="w-[fit-content] bg-blue-400 
        px-2 rounded py-1 hover:bg-blue-500 drop-shadow"
            data={forCsv}
            filename={`historja-${year}-${month}-${day}.csv`}
          >
            Export events as Csv ✨
          </CsvDownload>
        </li>
        <li></li>

        <li>
          <button
            onClick={handleLogout}
            className="w-[fit-content] bg-green-400 
        px-2 rounded py-1 hover:bg-green-500 drop-shadow"
          >
            Logout
          </button>
        </li>
        <li>
          <button
            onClick={delUser}
            className="w-[fit-content] bg-red-400 
        px-2 rounded py-1 hover:bg-red-500 drop-shadow"
          >
            Delete Account
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Account;
