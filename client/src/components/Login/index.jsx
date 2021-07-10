import React from 'react';

const Login = () => {

  return (
    <div>
      <form action="/login" method="POST">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password"/></form>
        <input type="submit" value="Log In"/>
    </div>
  );

};

export default Login;
