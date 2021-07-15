import React, {useState, useEffect} from 'react';

const Notes = ({notes, datasetId}) => {
  const [newNote, setNewNote] = useState('');

  const handleChange = (e) => {
    setNewNote(e.target.value);
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('datasetId', datasetId);
    formData.append('ownerId', ownerId);
    formData.append('body', newNote);

    axios.post('/notes/', formData)
    .then(() => console.log('Note Submitted'));
  }

  return (
    <div>
      <div>
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
    <div>
      <h5>{note.body}</h5>
      <p>{note.owner}</p>
    </div>
  )
}

export default Notes;