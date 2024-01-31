import React from 'react';
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import colors, { getRandomColor } from './Colors';

function AreaChart(props) {
  const plotColumns = props.plotColumns[0].split(',');
  const [takenColors, setTakenColors] = React.useState([]);

  const getUniqueColor = () => {
    const color = getRandomColor();

    if (color in takenColors) {
      return getUniqueColor();
    }

    if (takenColors.length === colors.length) {
      return 'Generating limit reached!';
    }

    takenColors.push(color);
    return color;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReAreaChart width="100%" height="100%" data={props.data}>
        <text
          x={500 / 2}
          y={20}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="14">{props.title}</tspan>
        </text>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={props.XAxisColumn} />
        <YAxis dataKey={props.YAxisColumn} />
        <Tooltip />
        <Legend />
        {plotColumns.map((column) => {
          const uniqueColor = getUniqueColor();

          return (
            <Area
              key={Math.random().toString()}
              type="monotone"
              dataKey={column}
              stroke={uniqueColor}
              fill={uniqueColor}
            />
          );
        })}
      </ReAreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChart;
