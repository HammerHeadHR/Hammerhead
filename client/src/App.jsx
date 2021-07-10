import React from 'react';
import axios from 'axios';

const App = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    var file = document.getElementById('file').files[0];
    axios.post('/dataset', file)
      .then(res => console.log(res));
  }

  return (
    <form>
      <input type='file' id='file'></input>
      <button onClick={handleSubmit}></button>
    </form>
  )
}

export default App;