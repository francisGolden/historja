import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import { AuthContextProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EditNote from "./components/EditNote";
import FlashCard from "./components/FlashCard";


function App() {

  console.log(process.env.REACT_APP_apiKey)

  return (
    <NoteProvider>
      <AuthContextProvider>
        <div className="flex flex-col w-[100%] h-[100vh] text-slate-800 font-sans">
          <NavBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<ProtectedRoute>
              <Account />
              </ProtectedRoute>} />
            <Route path="/new" element={<ProtectedRoute>
              <Notes />
              </ProtectedRoute>} />
            <Route path="/edit" element={<ProtectedRoute>
              <EditNote />
              </ProtectedRoute>} />
            <Route path="/flash" element={<ProtectedRoute>
              <FlashCard />
              </ProtectedRoute>} />
          </Routes>
        </div>
      </AuthContextProvider>
    </NoteProvider>
  );
}

export default App;
