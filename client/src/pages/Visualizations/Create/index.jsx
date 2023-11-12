import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

function CreateVisualization() {
  const [selected, setSelected] = React.useState('photos');
  return (
    <Tabs
      aria-label="Steps"
      selectedKey={selected}
      onSelectionChange={setSelected}
      radius="full"
      className="mt-5 rounded-full flex justify-center"
      classNames={{
        tabList:
          'md:gap-6 relative rounded-full p-0 flex justify-center bg-blue-900/10',
        cursor: 'w-full bg-blue-900/90',
        tab: 'max-w-fit px-4 md:px-16 h-12 md:h-14 min-w-[80px] md:min-w-[250px]',
        tabContent: 'group-data-[selected=true]:text-white',
      }}
    >
      <Tab
        key="step-1"
        title={
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm md:text-base">Step: 01</span>
            <span className="text-xs md:text-sm">Choose a Dataset</span>
          </div>
        }
      >
        <StepOne setSelected={setSelected} />
      </Tab>
      <Tab
        key="step-2"
        title={
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm md:text-base">Step: 02</span>
            <span className="text-xs md:text-sm">Customize</span>
          </div>
        }
      >
        <StepTwo setSelected={setSelected} />
      </Tab>
      <Tab
        key="step-3"
        title={
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm md:text-base">Step: 03</span>
            <span className="text-xs md:text-sm">Publish</span>
          </div>
        }
      >
        <StepThree setSelected={setSelected} />
      </Tab>
    </Tabs>
  );
}

export default CreateVisualization;
