import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Register.css";
import axios from "axios";
function Register({ handleRedirect }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [axiosdata, setAxiosData] = useState();

  function handleUsernameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(`Submitting registration for user: ${name}`);
    // console.log(`Submitting registration for user: ${email}`);
    // console.log(`Submitting registration for user: ${password}`);

    const data = {
      username: name,
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/auth/register", data)
      .then((response) => setAxiosData(response.data));
  }

  return (
    <div class="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div class="input-field">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
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
          Register
        </button>
        <div class="login-link">
          <span>Already have an account? </span>
          <a href="/login">Login Here</a>
        </div>
      </form>
    </div>
  );
}

export default Register;
