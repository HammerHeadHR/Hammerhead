import React from 'react';
import LoginForm from './LoginForm.jsx';
import SiteHeader from './SiteHeader.jsx';
import { useParams } from 'react-router-dom';

const Login = () => {

  return (
    <div>
      <SiteHeader />
      <LoginForm />
    </div>
  );

};

export default Login;
