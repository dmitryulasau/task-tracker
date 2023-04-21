import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import EditTask from './component/EditTask';
import CreateTask from './component/CreateTask';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin(username, password) {
    // Perform authentication logic here
    // If authenticated, set loggedIn to true
    setLoggedIn(true);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/edit" element={<EditTask />} />
          <Route path="/create" element={<CreateTask />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
