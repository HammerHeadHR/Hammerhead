import React, {useState, useEffect} from 'React';
import { BarChart, Bar, Cell, AreaChart, Area, LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const GraphKey = ({propertyName}) => {
  const [current, setCurrent] = useState('');
  const [color, setColor] = useState('');

  const handleChange = (e) => {
    console.log(e.target.name);
  };

  return (
    <>
      <p>{propertyName}</p>
      <label>X Axis</label>
      <input type="radio" name="xAxis" onChange={handleChange}></input>
      <label>Rendered Data</label>
      <input type="radio" name="data" onChange={handleChange}></input>
      {current === 'data' ? <input type="color"></input> : null}
    </>
  )
};



const Graph = ({data, xAxis, keys}) => {

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
        {keys.map(key => { return <Line type="monotone" dataKey={key} stroke="#8884d8" activeDot={{ r: 8 }} /> })}
      </LineChart>
    </ResponsiveContainer>
  );
};

const DynamicGraphWrapper = ({data}) => {


  const [xAxis, setXAxis] = useState('year');
  const [keys, setKeys] = useState(['price']);
  const [dataKeys, setDataKeys] = useState([]);


  for (let key in data[0]) {
    setDataKeys(prev => {
      return [...prev, key];
    })
  }

  return (
    <div>
      <div>
        {dataKeys.map((property, i) => { return <GraphKey propertyName={property} key={i}/>})}
      </div>
      <div style={{height: '40vh', width: '30vw'}}>
        <Graph xAxis={dataKeys[0]} keys={dataKeys.slice(1)} data={data}/>
      </div>
    </div>
  )
};


export default DynamicGraphWrapper;