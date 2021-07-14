import React, { useState } from 'react';
import axios from 'axios';
// import { createHash, compareHash, createRandom32String } from '../../server/hashUtil.js';

const Example = () => {

  // const [name, setName] = useState('');

  // const handleChange = (e) => {
  //   setName(e.target.value);
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   var file = document.getElementById('file');
  //   const formData = new FormData();
  //   formData.append('csv', file.files[0]);
  //   formData.append('name', name);
  //   const res = axios.post(`/dataset`, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
  //   .then(res => console.log(res));
  // }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // let salt = createRandom32String();

    console.log(salt);

    let data = {
      username: username,
      password: password
    }
    const res = axios.post(`/users/create`, data)
      .then(res => console.log(res));
  }

  // const createHash = (data, salt = '') => {
  //   let shasum = crypto.createHash('sha256');
  //   shasum.update(data + salt);
  //   return shasum.digest('hex');
  // };

  return (
    // <form>
    //   <input type='file' id='file'></input>
    //   <input type='text' value={ name } onChange={ handleChange }></input>
    //   <button onClick={ handleSubmit }>Submit</button>
    // </form>

    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" onChange={ handleChange }/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" onChange={ handleChange }/>
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default Example;