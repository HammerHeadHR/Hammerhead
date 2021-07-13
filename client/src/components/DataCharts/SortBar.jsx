import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';

const styles = {
  nav: {
    height: '30px',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 15px',
    borderRadius: '15px 15px 0 0'

  },
  headers: {
    display: 'inline',
    textAlign: 'center',
    fontSize: '22px'
  },
  downArrow: {
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px'
  },
  rightArrow: {
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: '3px',
    transform: 'rotate(-45deg)'
  },
  option: {
    appearance: 'none',
    border: 'none',
    /* needed for Firefox: */
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontWeight: 'bold',
    fontSize: '18px',
    color:'black'
  }
}

const SortBar = () => {
  const [categories, setCategories] = useState(['Agriculture', 'Bitcoin', 'dogs']);
  const [selectedCategory, setSelectedCategory] = useState('Agriculture');
  const [employees, setEmployees] = useState(['Thomas Johnson', 'Jane Janison']);
  const [selectedEmployee, setSelectedEmployee] = useState('Thomas Johnson');
  const [sortBy, setSortBy] = useState('newest');
  //Temp data to work on filtering
  const [preResults, preSetResults] = useState([{
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
  }, {
    title: 'Bitcoin over years',
    author: 'Jane Washburry',
    dates: '03/16/02-01/16/21',
    team: 'Bitcoin',
    id: 1
  }, {
    title: 'Bitcoin over months',
    author: 'Jane Washburry',
    dates: '03/16/02-01/16/14',
    team: 'Bitcoin',
    id: 1
  }
  ]);

  const changeCategories = (e) => {
    setSelectedCategory(e.target.value);
  }

  const makeCategories = () => {
    var numby = 0;
    return categories.map((category) => {
      numby++;
      return (
        <option key={category + numby} value={category}>{category}</option>
      )
    });

  };

  const changeEmployee = (e) => {
    setSelectedEmployee(e.target.value);
  }

  const setSort = (e) => {
    setSortBy(e.target.value);
  }

  const yieldResults = () => {
    //MAKE QUERY in here, and then sort and edit in here.
    var options = {
      method: 'get',
      url: '/users'
    };
    axios(options).then((results) => {
      //filterResults(results.data);
    }).catch((err) => {
    })
  }

  const filterResults = (results) => {
    //Swap this out with results later
    //Restructuring data:
    var newResults = [];
    for (var i = 0; i < results.length; i++) {
      var recentYear = 0;
      for (var j = 0; j < results[i].datapoints.length; j++) {
        var entryYear = parseInt(results[i].datapoints[j].year);
        if (entryYear > recentYear) {
          recentYear = entryYear;
        }
      }
      var resultObj = {
        'year': recentYear,
        'title': results[i].title,
        'owner': results[i].owner,
        'team': results[i].team
      }
      newResults.push(resultObj);
    }
    results = newResults;
    //Running through filters:
    var filteredResults = [];
    var finalResults = [];
    if (selectedCategory === 'none') {
      filteredResults = results;
    } else {
      for (var i = 0; i < results.length; i++) {
        if (results[i] === selectedCategory) {
          filteredResults.push(results[i]);
        }
      }
    }
    if (selectedEmployee === 'none') {
      return filteredResults;
    } else {
      for (var i = 0; i < filteredResults.length; i++) {
        if (filteredResults[i].author === selectedEmployee) {
          finalResults.push(filteredResults[i]);
        }
      }
    }
    if (sortBy === 'newest') {
      return newResults.sort((a, b) => {
        return a - b;
      });
    } else {
      return newResults.sort((a, b) => {
        return b - a;
      });
    }

    // props.setResults();
  }


  // useEffect(() => {
  //   yieldResults();

  // }, [selectedCategory, selectedEmployee, sortBy]);

  return (
    <nav style={styles.nav}>
        <div>
          <form>
            <label>
              <h4 style={styles.headers}>category: </h4>
                <select style={styles.option}   value={selectedCategory} onChange={changeCategories}>
                <option key={'nonecat'} value='none'>None</option>
                  {makeCategories()}
                </select>
            </label>
          </form>
        </div>
        <div style={{float: 'right'}}>
          <form style={{display: 'inline'}}>
            <label>
              <h4 style={styles.headers}>filter: </h4>
                <select style={styles.option} value={selectedEmployee} onChange={changeEmployee}>
                  {employees.map((employee) => {
                    return (
                      <option key={employee} value={employee}>{employee}</option>
                    )
                  })}
                </select>
            </label>
          </form>
          <span>    </span>
          <form style={{display: 'inline'}}>
            <label>
              <h4 style={styles.headers}>sort by: </h4>
                <select style={styles.option} value={sortBy} onChange={setSort}>
                  <option key={'newest'} value='newest'>newest</option>
                  <option key={'oldest'} value='oldest'>oldest</option>
                </select>
            </label>
          </form>
        </div>
      </nav>
  )
}

export default SortBar;