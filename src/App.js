import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Account from "./components/Account";
import NavBar from "./components/NavBar";
import Notes from "./components/Notes";
import { AuthContextProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FlashCard from "./components/FlashCard";
import NoteList from "./components/NoteList";
import Forgot from "./components/Forgot";


function App() {


  return (
    <AuthContextProvider>
      <NoteProvider>
        <div className="flex flex-col h-screen text-slate-800">
          <NavBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/account" element={<ProtectedRoute>
              <Account />
              </ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute>
            <NoteList />
            </ProtectedRoute>} />
            <Route path="/new" element={<ProtectedRoute>
              <Notes />
              </ProtectedRoute>} />
            <Route path="/flash" element={<ProtectedRoute>
              <FlashCard />
              </ProtectedRoute>} />
          </Routes>
        </div>
      </NoteProvider>
    </AuthContextProvider>
  );
}

export default App;
