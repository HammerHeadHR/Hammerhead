import React, {useState, useEffect} from 'React';
import { BarChart, Bar, Cell, AreaChart, Area, LineChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const DynamicGraphWrapper = (data) => {
  return (
    
  )
}



const Graph = ({data, xAxis, keys}) => {
  // console.log(data.prices);
  // let keys = [];

  // for (let key in data) {
  //   if (key !== 'title' && key !== 'managers') {
  //     for (let property in data[key][0]) {
  //       keys.push(property);
  //     }
  //   }
  // }

  // let keysMinusX = keys.slice(1);
  // console.log(keys);

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data.prices}
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
          {keys.map(key => { return <Line type="monotone" dataKey={keys[2]} stroke="#8884d8" activeDot={{ r: 8 }} /> })}
        </LineChart>
      </ResponsiveContainer>
    );
}

export default Graph;