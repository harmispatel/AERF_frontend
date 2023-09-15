import React from 'react'
import { ComposedChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Line,LineChart, Legend } from "recharts";

const LinesChart = (props) => {
  return (
    <>
    <LineChart
        width={props.width}
        height={props.height}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        >
        <XAxis dataKey={props.XAxis} />
        <YAxis type="number" domain={props.domain} />
        <Tooltip  />
        {/* <Line type="monotone" dataKey="pv" stroke="#38b6ff"activeDot={{ r: 8 }}/> */}
        <Line type="monotone" dataKey={props.dataKey} stroke={props.stroke} strokeWidth={4}  />
    </LineChart>
    </>
  )
}

export default LinesChart