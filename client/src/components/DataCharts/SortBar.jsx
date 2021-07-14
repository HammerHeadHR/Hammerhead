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
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontWeight: 'bold',
    fontSize: '18px',
    color:'black'
  }
}

const SortBar = (props) => {
  const [categories, setCategories] = useState(['Agriculture', 'Bitcoin', 'dogs']);
  const [selectedCategory, setSelectedCategory] = useState('none');
  const [employees, setEmployees] = useState(['']);
  const [selectedEmployee, setSelectedEmployee] = useState('none');
  const [sortBy, setSortBy] = useState('newest');

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
      url: '/datasets'
    };
    axios(options).then((results) => {
      console.log('results: ', results);
      var users = {};
      for (var i = 0; i < results.data.length; i++) {
        users[results.data[i].owner] = true;
      }
      var newEmp = Object.keys(users);
      setEmployees(Object.keys(users));
      return results;
    }).then((results) => {

      filterResults(results.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const filterResults = (results) => {
    //Swap this out with results later
    //Restructuring data:
    // var newResults = [];
    // for (var i = 0; i < results.length; i++) {
    //   var recentYear = 0;
    //   for (var j = 0; j < results[i].datapoints.length; j++) {
    //     var entryYear = parseInt(results[i].datapoints[j].year);
    //     if (entryYear > recentYear) {
    //       recentYear = entryYear;
    //     }
    //   }
    //   var resultObj = {
    //     'year': recentYear,
    //     'title': results[i].title,
    //     'owner': results[i].owner,
    //     'team': results[i].team
    //   }
    //   newResults.push(resultObj);
    // }
    // results = newResults;
    //Running through filters:
    var filteredResults = [];
    var finalResults = [];
    if (selectedCategory === 'none') {
      filteredResults = results;
    } else {
      for (var i = 0; i < results.length; i++) {
        if (results[i].team === selectedCategory) {
          filteredResults.push(results[i]);
        }
      }
    }
    if (selectedEmployee === 'none') {
      finalResults = filteredResults;
    } else {
      for (var i = 0; i < filteredResults.length; i++) {
        // console.log('ownerid: ', filteredResults[i].owner_id);
        // console.log('selectedmployee: ', selectedEmployee);
        if (filteredResults[i].owner === selectedEmployee) {
          finalResults.push(filteredResults[i]);
        }
      }
    }
    if (sortBy === 'newest') {
      finalResults.sort((a, b) => {
        return a.created_at - b.created_at;
      });
    } else {
      finalResults.sort((a, b) => {
        return b.created_at - a.created_at;
      });
    }
    props.setResults(finalResults);
  }

  useEffect(() => {
    var options = {
      method: 'get',
      url: '/teams'
    };
    axios(options).then((result) => {
      console.log('teams request: ', result);
      var teams = {};
      for (var i = 0; i < result.data.length; i++) {
        teams[result.data[i].name] = true;
      }
      var finTeams = Object.keys(teams);
      setCategories(finTeams);
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    yieldResults();
  }, [selectedCategory, selectedEmployee, sortBy]);

  return (
    <nav style={styles.nav}>
        <div id="sort">
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
                  <option key={'nonedog'} value='none'>None</option>

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