import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DynamicGraphWrapper from '../SharedComponents/Graph.jsx';
import Notes from './Notes.jsx';
import Info from './Info.jsx';


const ViewChart = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [team, setTeam] = useState('');
  const [data, setData] = useState({});
  const [notes, setNotes] = useState([]);

  const {datasetId} = useParams();

  useEffect(() => {
    axios.get(`/datasets/${datasetId}`)
    .then((dataset) => {
      setTitle(dataset.data.title);
      setAuthor(dataset.data.owner);
      setTeam(dataset.data.team);
      setData(dataset.data.datapoints);
    })
  }, [datasetId]);

  useEffect(() => {
    axios.get(`/notes/${datasetId}`)
    .then(chartNotes => {
      setNotes(chartNotes.data);
    })
  }, [datasetId]);

  const getNotes = (id) => {
    axios.get(`/notes/${id}`)
    .then(chartNotes => {
      setNotes(chartNotes.data);
    })
  };

  return (
  <div id="view-chart">
    {data.length ? <DynamicGraphWrapper data={data}/> : null}
    <div id="bottom-grid">
      <Info author={author} team={team} title={title}/>
      {notes.length ? <Notes notes={notes} datasetId={datasetId} getNotes={getNotes}/> : null}
    </div>
  </div>
  )
}

export default ViewChart;