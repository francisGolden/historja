import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <AuthContextProvider>
      <NoteProvider>
        <div className="flex flex-col h-screen overflow-x-hidden text-slate-800 bg-slate-300">
          <NavBar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </NoteProvider>
    </AuthContextProvider>
  );
}

export default App;
