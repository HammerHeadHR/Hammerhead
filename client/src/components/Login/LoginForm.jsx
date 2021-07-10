import React from 'react';

const LoginForm = () => {
  return (
    <div>
      <form action="/login" method="POST">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password"/>
        <input type="submit" value="Log In"/>
      </form>
    </div>
  );
};

export default LoginForm;
