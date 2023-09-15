import React from 'react'
import { Bar, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis } from 'recharts'

const BarChart = (props) => {
  return (
    <>
        <ComposedChart
            width={500}
            height={300}
            data={props.data}
            margin={{
            top: 0,
            right: 20,
            bottom: 0,
            left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey={props.xAxis} />
            <YAxis type="number" domain={props.domain} />
            <Tooltip />
            <Bar dataKey={props.dataKey} barSize={100} fill={props.fill} />
        </ComposedChart>
    </>
  )
}

export default BarChart