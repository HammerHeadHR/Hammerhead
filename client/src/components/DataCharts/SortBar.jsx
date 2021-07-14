import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';

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
        if (filteredResults[i].owner === selectedEmployee) {
          finalResults.push(filteredResults[i]);
        }
      }
    }
    for (var i = 0; i < finalResults.length; i++) {
      var formatDate = new Date(finalResults[i].created_at);
      finalResults[i].created_at = formatDate;
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
    // var postFormattedResults = [];
    for (var i = 0; i < finalResults.length; i++) {
      var preDate = finalResults[i].created_at.toString();
      var dateArr = preDate.split(' ');
      var finDate = dateArr[1] + ' ' + dateArr[2] + ', ' + dateArr[3];
      finalResults[i].created_at = finDate;
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
    <nav>
        <div>
          <form>
            <label>
              <h4>category: </h4>
                <select value={selectedCategory} onChange={changeCategories}>
                <option key={'nonecat'} value='none'>None</option>
                  {makeCategories()}
                </select>
            </label>
          </form>
        </div>
        <div>
          <form>
            <label>
              <h4>filter: </h4>
                <select value={selectedEmployee} onChange={changeEmployee}>
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
          <form>
            <label>
              <h4>sort by: </h4>
                <select value={sortBy} onChange={setSort}>
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