import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const LoginForm = ({ setUser }) => {

  const history = useHistory();


  const login = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    if (!username || !password) return alert('Please enter a username and password.');
    axios.post('/login/', { username: username, password: password })
      .then(response => {
        document.getElementById('login').classList.add('hidden')
        setTimeout(() => {
          setUser(response.data);
          history.push('/dashboard/data-charts');
        }, 600);
      })
      .catch(error => {
        console.error(error);
        return alert('An error occured. You may have entered the wrong username or password. Please try again.');
      });
  };

  return (
    <div id="form-div">
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
