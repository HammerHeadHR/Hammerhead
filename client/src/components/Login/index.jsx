import React, { useState } from 'react';
import LoginForm from './LoginForm.jsx';
import SiteHeader from './SiteHeader.jsx';
import { useParams } from 'react-router-dom';

const Login = ({ setUser, setAuthed}) => {

  return (
    <div id="login">
      <SiteHeader />
      <LoginForm setUser={setUser} setAuthed={setAuthed}/>
    </div>
  );

};

export default Login;
