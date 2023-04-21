import React, { useState } from "react";
import style from "./Register.css";
import axios from "axios";
const Login = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [axiosdata, setAxiosData] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: name,
      password: password,
    };
    axios
      .post("http://localhost:8000/auth/login", data)
      .then((response) => setAxiosData(response.data));
  };

  function handleUsernameChange(e) {
    setName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <div class="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div class="input-field">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={name}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div class="input-field">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" class="btn">
          Login
        </button>
        <div class="login-link">
          <span>Don't have an account?</span>
          <a href="/">Register Here</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
