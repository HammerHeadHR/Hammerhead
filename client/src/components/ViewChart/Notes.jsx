import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../../App.jsx';

const Notes = ({notes, datasetId, getNotes}) => {
  let user = useContext(UserContext);

  const [newNote, setNewNote] = useState('');

  const handleChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleSubmit = () => {
    const formData = {
      datasetId: datasetId,
      ownerId: user.user.id,
      body: newNote
    }


    axios.post('/notes/', formData)
    .then(() => {
      getNotes(datasetId);
    });
  }

  return (
    <div id="notes">
      <div id="notesScroll">
        {notes.map((note, i) => { return <Note note={note} key={i}/>})}
      </div>
      <form>
        <input type="text" onChange={handleChange} placeholder="Add Your Thoughts"></input>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
};

const Note = ({note}) => {
  return (
    <div className="note">
      <p>{note.body}</p>
      <h5>{note.owner}</h5>
    </div>
  )
}

export default Notes;