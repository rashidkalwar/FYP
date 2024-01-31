import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, CardBody, Divider } from '@nextui-org/react';
import { fetchDatasets } from '../../redux/dataset/datasetSlice';
import { fetchVisualizations } from '../../redux/visualization/visualizationSlice';

const InfoCard = ({ count, title }) => {
  return (
    <Card className="max-w-[300px]">
      <CardBody className="text-center">
        <p className="text-6xl font-bold m-5">{count}</p>
        <Divider />
        <span className="font-semibold">{title}</span>
      </CardBody>
    </Card>
  );
};

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const { datasets } = useSelector((state) => state.dataset);
  const { visualizations } = useSelector((state) => state.visualization);

  React.useEffect(() => {
    dispatch(fetchDatasets());
    dispatch(fetchVisualizations());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-3xl font-bold text-blue-900/90 ml-10">Dashboard</h2>
      <p className="text-xl font-medium mt-20 ml-10">Hi, {user.username}</p>
      <div className="flex space-x-5 m-10">
        <InfoCard title="Your Datasets" count={datasets.length} />
        <InfoCard title="Your Visualizations" count={visualizations.length} />
      </div>
    </>
  );
}
