import React from 'react';
import DynamicGraphWrapper from '../SharedComponents/Graph.jsx';
import CSVUpload from './CSVUpload.jsx';
import Share from './Submit.jsx';


const ImportData = ({data}) => {


  return (
    <div>
      <CSVUpload />
      <DynamicGraphWrapper data={data}/>
      <Share />
    </div>
  );

};

export default ImportData;
