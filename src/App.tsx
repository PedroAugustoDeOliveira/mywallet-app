import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NewIncome from "./pages/NewIncome";
import NewExpense from "./pages/NewExpense";
import UpdateIncome from "./pages/UpdateIncome";
import UpdateExpense from "./pages/UpdateExpense";

import "./style/reset.css";
import "./style/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newincome" element={<NewIncome />} />
        <Route path="/newexpense" element={<NewExpense />} />
        <Route path="/update/income/:id" element={<UpdateIncome />} />
        <Route path="/update/expense/:id" element={<UpdateExpense />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
