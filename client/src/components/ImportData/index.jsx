import React from 'react';
import DynamicGraphWrapper from '../SharedComponents/Graph.jsx';


const ImportData = ({data}) => {

  return (
    <div>
      {/* <CSVUpload /> */}
      <DynamicGraphWrapper data={data}/>
      {/* <Submit /> */}
    </div>
  );

};

export default ImportData;
