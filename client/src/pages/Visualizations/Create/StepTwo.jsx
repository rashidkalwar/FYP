import React from 'react';
import { Select, SelectItem, Button } from '@nextui-org/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const animals = [
  {
    label: 'Cat',
    value: 'cat',
    description: 'The second most popular pet in the world',
  },
  {
    label: 'Dog',
    value: 'dog',
    description: 'The most popular pet in the world',
  },
  {
    label: 'Elephant',
    value: 'elephant',
    description: 'The largest land animal',
  },
  { label: 'Lion', value: 'lion', description: 'The king of the jungle' },
  { label: 'Tiger', value: 'tiger', description: 'The largest cat species' },
];

function StepTwo({ setSelected }) {
  return (
    <div className="max-w-2xl mx-auto py-20 px-5">
      <div className="md:flex gap-10">
        <Select
          labelPlacement="outside"
          label="Chart Type"
          placeholder="Select a chart type"
          className=" mx-auto"
          size="lg"
          radius="full"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Plot Columns"
          placeholder="Select columns to plot"
          className="mx-auto"
          selectionMode="multiple"
          size="lg"
          radius="full"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="md:flex gap-10 mt-9">
        <Select
          labelPlacement="outside"
          label="X-Axis Column"
          placeholder="Select a column for x-axis"
          description="For auto select none"
          className=" mx-auto"
          size="lg"
          radius="full"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Y-Axis Column"
          placeholder="Select a column for y-axis"
          description="For auto select none"
          className="mx-auto"
          size="lg"
          radius="full"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-between mt-10">
        <Button
          className="bg-blue-900/90 hover:bg-blue-900/80"
          radius="full"
          color="primary"
          disableRipple
          onClick={() => setSelected('step-1')}
          startContent={<ChevronLeft size={20} />}
        >
          Previous
        </Button>
        <Button
          className="bg-blue-900/90 hover:bg-blue-900/80"
          radius="full"
          color="primary"
          disableRipple
          onClick={() => setSelected('step-3')}
          endContent={<ChevronRight size={20} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default StepTwo;
