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
      <label htmlFor="graph-placement">{propertyName}</label>
      <input type="checkbox" name="graph-placement" id="graph-placement" value="data" onChange={handleChange}></input>
      {isData ? <input type="color" value={colorKey[propertyName]} onChange={handleColorChange}></input> : null}
    </>
  )
};



const Graph = ({data, xAxis, keys, colorKey, dataMin, dataMax}) => {

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
        {/* {
        typeof dataMin === 'number' ?
        <XAxis dataKey={xAxis} type="number" domain={[`dataMin + ${dataMin}, dataMax - ${dataMax}`]}/>
        : */}
        <XAxis dataKey={xAxis} />
        {/* } */}
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
  const [startData, setStartData] = useState(0);
  const [endData, setEndData] = useState(0);
  const [dataMin, setDataMin] = useState(0);
  const [dataMax, setDataMax] = useState(0);


  useEffect(() => {
    let result = Object.keys(data[0]);

    setDataKeys(result);
    setXAxis(result[0]);

    let resultCopy = result.slice(0);
    setKeys(resultCopy.splice(1));
    setColorKey({[result[1]]: '#843592'})

  }, []);

  useEffect(() => {
    let start = data[0][dataKeys[0]];
    let end = data[data.length - 1][dataKeys[0]];
    if (Number(start) !== NaN) {
      start = Number(start);
      end = Number(end);
    }
    console.log(start, end);
    setStartData(start);
    setDataMin(start);
    setEndData(end);
    setDataMax(end);
  }, [dataKeys])


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

  const handleDataMin = (e) => {
    console.log(e.target.value, dataMin);
    setDataMin(Number(e.target.value));
  };

  const handleDataMax = (e) => {
    console.log(e.target.value, dataMax);
    setDataMax(Number(e.target.value));
  }

  return (
    <div id="graph">
      <div id="graphWrapperDiv">
        <div id="choices">
          {dataKeys.map((property, i) => { return <GraphKey propertyName={property} key={i} addData={addData} deleteData={deleteData} addToColorKey={addToColorKey} colorKey={colorKey}/>})}
        </div>
        {/* {
        dataMax && typeof dataMax === 'number' ?
        <>
        <div className="dataDiv">
          <label htmlFor="dataMin">X Axis Start</label>
          <input
            type="range"
            name="dataMin"
            id="dataMin"
            onInput={handleDataMin}
            min='0'
            max='5'
            defaultValue='0'
            step="1"
          ></input>
        </div>

        <div className="dataDiv">
        <label htmlFor="dataMax">X Axis End</label>
          <input
            type="range"
            name="dataMax"
            id="dataMax"
            onInput={handleDataMax}
            min='0'
            defaultValue='5'
            max='5'
            step="1"
          ></input>
        </div>
        </>
        :
        null
       } */}
      </div>
      <div id="graphDiv">
        {dataKeys.length ? <Graph xAxis={xAxis} keys={keys} data={data} colorKey={colorKey} dataMin={dataMin} dataMax={dataMax}/> : null}
      </div>
    </div>
  )
};


export default DynamicGraphWrapper;