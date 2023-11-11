import { Link, useLocation, Outlet } from 'react-router-dom';
import { Tabs, Tab } from '@nextui-org/react';

function CreateVisualization() {
  const { pathname } = useLocation();

  return (
    <>
      <Tabs selectedKey={pathname.split('/')[-1]} aria-label="Tabs">
        <Tab id="/Step 1" as={Link} to="step-1" title="Step 1" />
        <Tab id="/Step 2" as={Link} to="step-2" title="Step 2" />
        <Tab id="/Step 3" as={Link} to="step-3" title="Step 3" />
      </Tabs>
      <Outlet />
    </>
  );
}

export default CreateVisualization;
