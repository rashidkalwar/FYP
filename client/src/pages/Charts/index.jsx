import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChart } from '../../redux/charts/chartsSlice';
import { fetchDataset } from '../../redux/dataset/datasetSlice';
import { AreaChart, BarChart, LineChart } from '../../components/Charts';

const Loading = () => {
  return <>loading...</>;
};

const getChart = (chartType) => {
  switch (chartType) {
    case 'area-chart':
      return AreaChart;
    case 'bar-chart':
      return BarChart;
    case 'line-chart':
      return LineChart;
    default:
      return Loading;
  }
};

function Chart() {
  const params = useParams();
  const dispatch = useDispatch();

  const [datasetLoaded, setDatasetLoaded] = React.useState(false);

  const { loading, chart } = useSelector((state) => state.chart);
  const { dataset } = useSelector((state) => state.dataset);

  if (!loading && chart.dataset) {
    if (!datasetLoaded) {
      dispatch(fetchDataset(chart.dataset));
      setDatasetLoaded(true);
    }
  }

  const Chart = getChart(chart.chartType);
  React.useEffect(() => {
    dispatch(fetchChart(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-h-[730px] md:w-full max-w-sm md:max-w-3xl">
      <div className="relative w-[390px] h-[300px] md:w-[550px] md:h-[400px]">
        <Chart
          data={datasetLoaded && dataset.data}
          title={chart && chart.title}
          plotColumns={chart && chart.plotColumns}
          XAxisColumn={chart && chart.xAxisColumn}
          YAxisColumn={chart && chart.yAxisColumn}
        />
      </div>
      <p className="mt-3">{chart && chart.description}</p>
    </div>
  );
}

export default Chart;
