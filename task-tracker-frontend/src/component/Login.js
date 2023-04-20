import React, { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
  };
  
  function handleUsernameChange(e) {
    setName(e.target.value);
  }
  return (
    <div>
      <h1>Login</h1>
      <form >
        <label htmlFor="name">Name:</label>
        <input
            type="text"
            value={name}
            onChange={handleUsernameChange}
            required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/">Register here</a>.
      </p>
    </div>
  );
};

export default Login;
