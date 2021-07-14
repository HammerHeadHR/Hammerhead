import React, {useState, useEffect} from 'react';
import { BarChart, Bar, Cell, AreaChart, Area, LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const GraphKey = ({propertyName, addData, deleteData, addToColorKey, colorKey}) => {
  const [isData, setIsData] = useState(false);
  const [color, setColor] = useState('');

  const handleChange = (e) => {
    if (!isData) {
      addData(propertyName);
    } else {
      deleteData(propertyName);
    }
    setIsData(!isData);
  };

  const handleColorChange = (e) => {
    addToColorKey(propertyName, e.target.value);
  }

  return (
    <>
      <label>{propertyName}</label>
      <input type="checkbox" name="graph-placement" value="data" onChange={handleChange}></input>
      {isData ? <input type="color" value={colorKey[propertyName]} onChange={handleColorChange}></input> : null}
    </>
  )
};



const Graph = ({data, xAxis, keys, colorKey}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        {keys.map((key, i) => { return <Line key={i} type="monotone" dataKey={key} stroke={colorKey[key]} activeDot={{ r: 8 }} /> })}
      </LineChart>
    </ResponsiveContainer>
  );
};

const DynamicGraphWrapper = ({data}) => {

  const [xAxis, setXAxis] = useState('');
  const [keys, setKeys] = useState(['']);
  const [dataKeys, setDataKeys] = useState([]);
  const [colorKey, setColorKey] = useState({});


  useEffect(() => {
    let result = Object.keys(data[0]);

    setDataKeys(result);
    setXAxis(result[0]);

    let resultCopy = result.slice(0);
    setKeys(resultCopy.splice(1));
    setColorKey({[result[1]]: '#843592'})

  }, []);


  const addData = (name) => {
    if (!keys.includes(name)) {
      setKeys([...keys, name]);
    }
  }

  const deleteData = (name) => {
    let index = keys.indexOf(name);
    let keysCopy = keys.slice(0);
    console.log(keysCopy.splice(index, 1));
    keysCopy.splice(index, 1);
    setKeys(keysCopy);
  }

  const addToColorKey = (name, color) => {
    let tempColorKey = {
      ...colorKey
    };
    tempColorKey[name] = color;
    setColorKey(tempColorKey);
  }

  return (
    <div>
      <div>
        {dataKeys.map((property, i) => { return <GraphKey propertyName={property} key={i} addData={addData} deleteData={deleteData} addToColorKey={addToColorKey} colorKey={colorKey}/>})}
      </div>
      <div style={{height: '50vh', width: '30vw'}}>
        {dataKeys.length ? <Graph xAxis={xAxis} keys={keys} data={data} colorKey={colorKey}/> : null}
      </div>
    </div>
  )
};


export default DynamicGraphWrapper;