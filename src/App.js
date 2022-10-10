import NavBar from "./components/NavBar";
import { AuthContextProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { useState, useEffect } from "react";
import MobileNavBar from "./components/MobileNavBar";

function App() {
  // resize navbar logic
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1000);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  
  return (
    <AuthContextProvider>
      <NoteProvider>
        <div className="flex flex-col h-screen overflow-x-hidden text-slate-800 bg-slate-300">
          {isDesktop ? <NavBar />:<MobileNavBar />}
          <AnimatedRoutes />
          <Footer />
        </div>
      </NoteProvider>
    </AuthContextProvider>
  );
}

export default App;
