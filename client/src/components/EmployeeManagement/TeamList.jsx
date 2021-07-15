import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamList = ({ teams, setTeams, getTeams }) => {

  const [addTeam, setAddTeam] = useState(false);
  const [editTeam, setEditTeam] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);

  const createTeam = (event) => {
    if (!addTeam) return setAddTeam(true);
    const newTeamName = document.querySelector('#new-team').value;
    if (newTeamName.length) {
      axios.post('/teams/', { name: newTeamName })
        .then(response => getTeams())
        .catch(error => console.error(error));
      setAddTeam(false);
    } else {
      alert('Please enter a team name.');
    }
  };

  const updateTeam = (team) => {
    if (!editTeam) {
      setTeamToEdit(team);
      setEditTeam(true);
      return;
    }
    const updatedName = document.querySelector('#update-team').value;
    axios.put('/teams/', { teamId: team.id, name: updatedName })
      .then(response => getTeams())
      .catch(error => console.error(error));
    setTeamToEdit(null);
    setEditTeam(false);
  };

  return (
    <div id="team-management">
      <h2 id="team-heading">Teams</h2>
      {editTeam ?
        <>
          <label htmlFor="update-team">Updated name for "{teamToEdit.name}": </label>
          <input type="text" name="update-team" id="update-team"/>
          <button onClick={() => updateTeam(teamToEdit)}>Update Name</button>
          <button onClick={() => setEditTeam(false)}>Cancel</button>
        </>
      :
        <div id="teams-container">
          {teams.map(team =>
            <div key={team.id}>
              <span>{team.name}</span>
              <button onClick={() => updateTeam(team)}>Edit Team Name</button>
            </div>)}
        </div>
      }
      {addTeam &&
        <>
          <label htmlFor="new-team">New Team Name: </label>
          <input type="text" name="new-team" id="new-team"/>
          <button onClick={() => setAddTeam(false)}>Cancel</button>
        </>
      }
      {!editTeam && <button onClick={createTeam}>Add Team</button>}
    </div>
  );

};

export default TeamList;
