import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CSVUpload = () => {
  const [title, setTitle] = useState('');
  const [ownerId, setOwnerId] = useState('4');
  const [teamId, setTeamId] = useState('3');

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var file = document.getElementById('file');
    const formData = new FormData();
    formData.append('csv', file.files[0]);
    formData.append('title', title);
    formData.append('ownerId', ownerId);
    formData.append('teamId', teamId);
    console.log(formData);
    const res = axios.post(`/datasets/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => console.log(res));
  }

  return (
    <form>
      <input type='file' id='file'></input>
      <input type='text' value={ title } onChange={ handleChange }></input>
      <button onClick={ handleSubmit }>Submit</button>
    </form>
  )
}



export default CSVUpload;