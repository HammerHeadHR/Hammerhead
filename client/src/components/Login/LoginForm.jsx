import React from 'react';
import axios from 'axios';

const LoginForm = () => {

  const login = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    axios.post('/login', { username: username, password: password })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <form >
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password"/>
        <input type="submit" value="Log In"/>
      </form>
    </div>
  );

};

export default LoginForm;
