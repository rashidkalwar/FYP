import { Spinner } from '@nextui-org/react';

function FallbackSpinner() {
  return (
    <div>
      <Spinner color="default" size="lg" label="Loading..." />
    </div>
  );
}

export default FallbackSpinner;
