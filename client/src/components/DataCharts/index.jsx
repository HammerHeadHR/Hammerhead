import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import SortBar from './SortBar.jsx';
import ViewChart from '../ViewChart/index.jsx';

const DataCharts = () => {
  const [results, setResults] = useState([{
    title: 'Corn prices over time',
    author: 'Thomas Johnson',
    dates: '03/16/20-03/16/21',
    team: 'Agriculture',
    id: 1
  }]);

  const generateCharts = () => {
    var numbo = 0;
    return results.map((result) => {
      numbo++;
      return (
        <Link key={result.id + numbo * 2} style={{textDecoration: 'none', color: 'black'}} to={`/dashboard/view-chart/${result.id}`} >
          <div className="result" key={result.id + numbo}>
            <div className="interior-div">
              <h3 key={result.id + numbo}>{result.title}</h3>
              <p>{result.owner}</p>
            </div>
            <hr></hr>
            <div className="interior-div">
              <p>{result.created_at}</p>
              <p>{result.team}</p>
            </div>
          </div>
        </Link>
      );
    })
  };

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
