import React, { useState } from 'react';
import styles from './Register.css';

function Register() {
  const [name, setName] = useState('');

  function handleUsernameChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Submitting registration for user: ${name}`);
  }

  return (
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
      <button class ="slide" type="submit">Register</button>
    </form>
  );
}

export default Register;
