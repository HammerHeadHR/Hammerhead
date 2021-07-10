import React, { useState } from 'react';
import axios from 'axios';

const App = () => {

  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var file = document.getElementById('file');
    const formData = new FormData();
    formData.append('csv', file.files[0]);
    formData.append('name', name);
    const res = axios.post(`/dataset`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => console.log(res));
  }

  return (
    <form>
      <input type='file' id='file'></input>
      <input type='text' value={ name } onChange={ handleChange }></input>
      <button onClick={ handleSubmit }>Submit</button>
    </form>
  )
}

export default App;