import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SortBar from './SortBar.jsx';

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
        <div class="result" key={result+numbo}>
          <div class="interior-div">
            <h3 key={result.title}>{result.title}</h3>
            <p>{result.author}</p>
          </div>
          <div class="interior-div">
            <p>{result.dates}</p>
            <p>{result.team}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div id="container">
      <SortBar setResults={setResults} />
      <section>
        {generateCharts()}
      </section>
    </div>
  );

};

export default DataCharts;
