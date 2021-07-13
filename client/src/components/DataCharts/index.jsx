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
    padding: '20px'
  },
  result: {
    backgroundColor: 'white',
    width: '96%',
    margin: '10px auto',
    borderRadius: '5px',
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
    team: 'Agriculture'
  }, {
    title: 'Corn prices over bitcoins',
    author: 'Thomas Johnson',
    dates: '03/16/21-01/16/21',
    team: 'Agriculture'
  }
  ]);

  return (
    <div style={styles.container}>
      <SortBar setResults={setResults} />
      <section style={styles.section}>
        {results.map((result) => {
          return (
            <div style={styles.result}>
              <div style={styles.interiorDiv}>
                <h3>{result.title}</h3>
                <p>{result.author}</p>
              </div>
              <div style={styles.interiorDiv}>
                <p>{result.dates}</p>
                <p>{result.team}</p>
              </div>
            </div>
          )
        })}

      </section>

    </div>
  );

};

export default DataCharts;
