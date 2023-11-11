import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { Button } from '@nextui-org/react';
import { Plus } from 'lucide-react';
import data from './data';

function Visualizations() {
  function reverseArr(input) {
    var ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  return (
    <>
      <div className="flex justify-end items-center p-20">
        <Button
          className="bg-blue-900/90 hover:bg-blue-900/80"
          color="primary"
          as={Link}
          to="create"
          endContent={<Plus />}
          radius="full"
        >
          Create
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center min-h-[300px]">
        <div>Population of Pakistan</div>
        <LineChart
          width={730}
          height={300}
          data={reverseArr(data)}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Population"
            strokeWidth={2}
            stroke="#0ea5e9"
          />
          <Line
            type="monotone"
            dataKey="Urban Population"
            strokeWidth={2}
            stroke="#f59e0b"
          />
          <Line
            type="monotone"
            dataKey="Yearly Change"
            strokeWidth={2}
            stroke="#8b5cf6"
          />
        </LineChart>
      </div>
      <Outlet />
    </>
  );
}

export default Visualizations;
