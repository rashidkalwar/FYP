import React from 'react';
import { Input, Select, SelectItem, Button } from '@nextui-org/react';
import { ChevronRight } from 'lucide-react';

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

function StepOne({ setSelected }) {
  return (
    <div className="max-w-2xl mx-auto py-20 px-5">
      <div className="md:flex gap-10">
        <Input
          className="md:min-w-[250px]"
          type="email"
          label="Title"
          labelPlacement="outside"
          placeholder="Enter a title"
          size="lg"
          radius="full"
        />
        <Input
          className="md:min-w-[250px]"
          type="email"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter some description"
          size="lg"
          radius="full"
        />
      </div>
      <div className="mt-10">
        <Select
          labelPlacement="outside"
          label="Dataset"
          placeholder="Select a dataset"
          className="md:min-w-[350px] mx-auto"
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
      <div className="flex justify-end mt-10">
        <Button
          className="bg-blue-900/90 hover:bg-blue-900/80"
          radius="full"
          color="primary"
          disableRipple
          onClick={() => setSelected('step-2')}
          endContent={<ChevronRight size={20} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default StepOne;
