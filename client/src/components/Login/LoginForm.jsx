import React from 'react';
import axios from 'axios';

const LoginForm = ({ setUser, setAuthed }) => {

  const login = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    if (!username || !password) return alert('Please enter a username and password.');
    axios.post('/login', { username: username, password: password })
      .then(response => {
        console.log(response)
        setUser(response.data);
        setAuthed(true);
      })
      .catch(error => {
        console.error(error);
        return alert('An error occured. You may have entered the wrong username or password. Please try again.')
      })
  };

  return (
    <div>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password"/>
        <input type="submit" value="Log In" onClick={login}/>
      </form>
    </div>
  );

};

export default LoginForm;
