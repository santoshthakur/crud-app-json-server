import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./style.css";
import Create from "./components/Create";
import Update from "./components/Update";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="app-bg">
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
