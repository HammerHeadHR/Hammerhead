import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

const styles = {
  nav: {
    height: '30px',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 15px',

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

  }
}

const SortBar = () => {
  const [categories, setCategories] = useState(['Agriculture', 'Bitcoin', 'dogs']);
  const [selectedCategory, setSelectedCategory] = useState(['Agriculture']);
  const [employees, setEmployees] = useState(['Thomas Johnson', 'Jane Janison']);
  const [selectedEmployee, setSelectedEmployee] = useState(['Thomas Johnson']);
  const [sortBy, setSortBy] = useState('newest');

  const changeCategories = (e) => {
    setSelectedCategory(e.target.value);
  }

  const changeEmployee = (e) => {
    setSelectedEmployee(e.target.value);
  }

  const setSort = (e) => {
    setSortBy(e.target.value);
  }

  const yieldResults = () => {
    //MAKE QUERY in here, and then sort and edit in here.
    props.setResults();
  }

  // useEffect(() => {

  // }, [selectedCategory, selectedEmployee, sortBy]);

  return (
    <nav style={styles.nav}>
        <div>
          <form>
            <label>
              <h4 style={styles.headers}>category</h4>
                <select value={selectedCategory} onChange={changeCategories}>
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>{category}</option>
                    )
                  })}
                </select>
            </label>
          </form>
        </div>
        <div style={{float: 'right'}}>
        <form style={{display: 'inline'}}>
            <label>
              <h4 style={styles.headers}>filter</h4>
                <select value={selectedEmployee} onChange={changeEmployee}>
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
              <h4 style={styles.headers}>sort by</h4>
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