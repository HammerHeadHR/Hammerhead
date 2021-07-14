import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {UserContext} from '../../App.jsx';


const CSVUpload = ({handleData, handleDatasetId}) => {
  let user = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [teamId, setTeamId] = useState(1);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('/teams')
    .then((teams) => {
      setTeams(teams.data);
    })
  }, []);

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleTeamChange = (e) => {
    setTeamId(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var file = document.getElementById('file');
    const formData = new FormData();
    formData.append('csv', file.files[0]);
    formData.append('title', title);
    formData.append('ownerId', user.user.id);
    formData.append('teamId', teamId);
    console.log(formData);
    const res = axios.post(`/datasets/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      console.log(res.data.id);
      handleDatasetId(res.data.id);
      return axios.get(`/datasets/${res.data.id}`)
    })
    .then(dataset => {
      handleData(dataset.data.datapoints);
    })
  }

  return (
    <form>
      <input type='file' id='file'></input>
      <input type='text' value={ title } onChange={ handleChange }></input>
      <select onChange={handleTeamChange} value={teamId}>
        {teams.map((team, i) => { return <Team teamName={team.name} teamId={team.id} key={i}/>})}
      </select>
      <button onClick={ handleSubmit }>Submit</button>
    </form>
  )
}

const Team = ({teamName, teamId}) => {
  return (
    <option value={teamId}>{teamName}</option>
  );
};



export default CSVUpload;