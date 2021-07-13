import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SortBar from './SortBar.jsx';

const styles = {
  container: {
    width: '70%',
    float: 'right',
    // padding: '20px 0px',
    // margin: '20px 0px'
  },
  // nav: {
  //   height: '30px',
  //   backgroundColor: 'whitesmoke',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   padding: '0px 15px',

  // },
  // headers: {
  //   display: 'inline',
  //   textAlign: 'center',
  //   fontSize: '22px'
  // },
  section: {
    height: '500px',
    backgroundColor: 'rgb(211, 225, 227)',
    padding: '20px',
    borderRadius: '0 0 15px 15px '
  },
  result: {
    backgroundColor: 'white',
    width: '96%',
    margin: '10px auto',
    borderRadius: '15px',
    height: '80px'
  },
  info: {
    display: 'inline'
  },
  interiorDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 15px',
    height: '35px'
  }
}


const DataCharts = () => {



  const [results, setResults] = useState([{
    title: 'Corn prices over time',
    author: 'Thomas Johnson',
    dates: '03/16/20-03/16/21',
    team: 'Agriculture',
    id: 1
  }, {
    title: 'Corn prices over bitcoins',
    author: 'Thomas Johnson',
    dates: '03/16/21-01/16/21',
    team: 'Agriculture',
    id: 1
  }
  ]);

  const generateCharts = () => {
    var numbo = 0;
    return results.map((result) => {
      numbo++;
      return (
        <div key={result+numbo} style={styles.result}>
          <div style={styles.interiorDiv}>
            <h3 key={result.title}>{result.title}</h3>
            <p>{result.author}</p>
          </div>
          <div style={styles.interiorDiv}>
            <p>{result.dates}</p>
            <p>{result.team}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div style={styles.container}>
      <SortBar setResults={setResults} />
      <section style={styles.section}>
        {generateCharts()}

      </section>

    </div>
  );

};

export default DataCharts;
