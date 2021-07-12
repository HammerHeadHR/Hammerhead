import React from 'react';

const TeamList = ({ teams }) => {

  return (
    <div>
      <h3>Teams</h3>
      {teams.map(team => <li key={team.name}>{team.team}</li> )}
    </div>
  );

};

export default TeamList;
