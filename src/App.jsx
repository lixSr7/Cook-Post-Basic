import { useState, useEffect } from "react";
import "./Css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar"; //* NavBar
import Home from "./Pages/Home";
import Chats from "./Pages/Chats";
import Login from "./Pages/Login";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "Tema claro" ? "dark" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/chats"
            element={
              <>
                <NavBar TogleTheme={toggleTheme} />
                <Chats />
              </>
            }
          />
          <Route
            path="/Home"
            element={
              <>
                <NavBar TogleTheme={toggleTheme} />
                <Home />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
