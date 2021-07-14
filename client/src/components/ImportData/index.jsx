import React, {useState, useEffect} from 'react';
import DynamicGraphWrapper from '../SharedComponents/Graph.jsx';
import CSVUpload from './CSVUpload.jsx';
import Share from './Submit.jsx';


const ImportData = () => {
  const [data, setData] = useState([]);
  const [datasetId, setDatasetId] = useState('');

  const handleData = (data) => {
    setData(data);
  }

  const handleDatasetId = (data) => {
    setDatasetId(data);
  }


  return (
    <div>
      <CSVUpload handleData={handleData} handleDatasetId={handleDatasetId}/>
      {data.length ?
      <>
        <DynamicGraphWrapper data={data}/>
        <Share datasetId={datasetId}/>
      </>
      : null}
    </div>
  );

};

export default ImportData;
