import React from "react";
import Main from "./components/Main";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <div className="navigation">
        <Navbar />
      </div>
      <div className="section">
        <Main />
      </div>
      <div className="footer">© 2022 Turist, All rights reserved</div>
    </div>
  );
}

export default App;
