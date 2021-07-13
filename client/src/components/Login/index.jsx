import React, { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import SiteHeader from './SiteHeader.jsx';
import { useParams } from 'react-router-dom';

const Login = () => {

  return (
    <div>
      <SiteHeader />
      <LoginForm handleLogin={ handleLogin } handleChange={ handleChange }/>
    </div>
  );

};

export default Login;
