import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Register.css';

function Register({ handleRedirect }) {
  const [name, setName] = useState('');

  function handleUsernameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Submitting registration for user: ${name}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <button className="slide" type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/login">Log in here</Link></p>
    </div>
  );
}

export default Register;
