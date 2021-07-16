import React, {useState, useEffect, useContext, useRef} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {shareData} from '../utilFunctions.js';
import {UserContext} from '../../App.jsx';
import DynamicGraphWrapper from '../SharedComponents/Graph.jsx';
import Notes from './Notes.jsx';
import Info from './Info.jsx';
import SharingModal from './SharingModal.jsx';


const ViewChart = () => {

  let user = useContext(UserContext);

  const buttonRef = useRef();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [team, setTeam] = useState('');
  const [data, setData] = useState({});
  const [notes, setNotes] = useState([]);
  const [sharing, setSharing] = useState(false);
  const [receivers, setReceivers] = useState([]);

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

  const shareAllData = (receivers) => {
    let requests = receivers.map((employeeId) => {
      shareData(Number(user.user.id), Number(employeeId), Number(datasetId))
    })

    Promise.all(requests)
    .then(() => console.log('All Notified'));
  }

  const handleShare = () => {
    if (sharing) {
      shareAllData(receivers);
      buttonRef.current.innerHTML = 'Shared';
      setSharing(false);
    } else {
      setSharing(true);
    }
  }

  const makeShareList = (id) => {
    let tempReceivers = [...receivers];
    tempReceivers.push(id);
    setReceivers(tempReceivers);
  }

  const takeFromShareList = (id) => {
    // change to .filter
    let index = receivers.indexOf(id);
    let tempReceivers = [...receivers];
    tempReceivers.splice(index, 1);
    setReceivers(tempReceivers);
  }

  return (
  <div id="view-chart">
    <button id="shareButton" ref={buttonRef} onClick={handleShare}>Share</button>
    {sharing ? <SharingModal datasetId={datasetId} makeShareList={makeShareList} takeFromShareList={takeFromShareList}/> : null}
    {data.length ? <DynamicGraphWrapper data={data}/> : null}
    <div id="bottom-grid">
      <Info author={author} team={team} title={title}/>
      {notes.length ? <Notes notes={notes} datasetId={datasetId} getNotes={getNotes}/> : null}
    </div>
  </div>
  )
}

export default ViewChart;