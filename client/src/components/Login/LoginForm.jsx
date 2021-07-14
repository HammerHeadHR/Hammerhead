import React from 'react';
import axios from 'axios';

const login = (event) => {
  event.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  axios.post('/login', { username: username, password: password })
    .then(response => console.log(response))
    .catch(error => console.error(error));
};

const LoginForm = () => {
  return (
    <div id="form-div">
      <form autocomplete="off">
        <label htmlFor="username" for="username">Username:</label>
        <input id='username' type="text" name="username"/>
        <label htmlFor="password" for="password">Password:</label>
        <input id='password' type="password" name="password"/>
        <input type="submit" value="Log In" onClick={login}/>
      </form>
    </div>
  );
};

export default LoginForm;
