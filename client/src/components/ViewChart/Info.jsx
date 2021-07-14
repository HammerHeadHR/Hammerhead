import React from 'react';


const Info = ({title, author, team}) => {
  if (title.length && author.length && team.length) {
    return (
      <div>
        <h3>{title}</h3>
        <p>{author}</p>
        <p>{team}</p>
      </div>
    )
  } else {
    return null;
  }
};

export default Info;