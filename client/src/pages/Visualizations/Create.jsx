import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Snippet,
} from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { fetchDatasets, fetchDataset } from '../../redux/dataset/datasetSlice';
import { addVisualization } from '../../redux/visualization/visualizationSlice';
import FallbackSpinner from '../../components/FallbackSpinner';

const chartTypes = [
  { label: 'Area Chart', value: 'area-chart' },
  { label: 'Bar Chart', value: 'bar-chart' },
  { label: 'Line Chart', value: 'line-chart' },
];

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { datasets, dataset } = useSelector((state) => state.dataset);
  const { loading, error, message, visualization } = useSelector(
    (state) => state.visualization
  );

  React.useEffect(() => {
    dispatch(fetchDatasets());
    message && toast.success(message);
    error && toast.error(error.message);
  }, [dispatch, error, message]);

  let datasetList = [];

  if (datasets) {
    for (let i in datasets) {
      const item = datasets[i];
      datasetList.push({
        label: item.title,
        value: item.slug,
      });
    }
  }

  let columnsList = [];

  if (dataset.data) {
    for (let x in dataset.data[0]) {
      columnsList.push({ label: x, value: x });
    }
  }

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedDataset, setSelectedDataset] = React.useState(null);
  const [chartType, setChartType] = React.useState('');
  const [plotColumns, setPlotColumns] = React.useState(null);
  const [xAxisColumn, setXAxisColumn] = React.useState(null);
  const [yAxisColumn, setYAxisColumn] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      description: description,
      dataset: selectedDataset,
      chartType: chartType,
      plotColumns: plotColumns,
      xAxisColumn: xAxisColumn,
      yAxisColumn: yAxisColumn,
    };

    dispatch(addVisualization({ formData }));
  };

  const handleConfetti = () => {
    confetti({
      // origin: {
      //   x: 0.6,
      //   y: 0.5,
      // },
      particleCount: 130,
      spread: 90,
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl py-10 px-20 rounded-2xl mx-20 shadow-2xl mt-5 space-y-5"
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-blue-900/90">
        Create a Data Visualization
      </h2>
      <div className="md:flex gap-10 w-full">
        <Input
          className="md:min-w-[250px]"
          type="text"
          label="Title"
          labelPlacement="outside"
          placeholder="Enter a title"
          radius="full"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className="md:min-w-[250px]"
          type="text"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter some description"
          radius="full"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        {datasetList && (
          <Select
            labelPlacement="outside"
            label="Dataset"
            placeholder="Select a dataset"
            className="md:min-w-[350px] mx-auto"
            radius="full"
            onChange={(e) => {
              dispatch(fetchDataset(e.target.value));
              setSelectedDataset(e.target.value);
            }}
          >
            {datasetList?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>
      <div className="md:flex gap-10">
        <Select
          labelPlacement="outside"
          label="Chart Type"
          placeholder="Select a chart type"
          className=" mx-auto"
          radius="full"
          onChange={(e) => setChartType(e.target.value)}
          required
        >
          {chartTypes.map((chart) => (
            <SelectItem key={chart.value} value={chart.value}>
              {chart.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Plot Columns"
          placeholder="Select columns to plot"
          className="mx-auto"
          selectionMode="multiple"
          radius="full"
          onChange={(e) => setPlotColumns(e.target.value)}
        >
          {columnsList.map((animal) => (
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
          description="For auto, leave empty"
          className=" mx-auto"
          radius="full"
          onChange={(e) => setXAxisColumn(e.target.value)}
        >
          {columnsList.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          labelPlacement="outside"
          label="Y-Axis Column"
          placeholder="Select a column for y-axis"
          description="For auto, leave empty"
          className="mx-auto"
          radius="full"
          onChange={(e) => setYAxisColumn(e.target.value)}
        >
          {columnsList.map((animal) => (
            <SelectItem key={animal.value} value={animal.value}>
              {animal.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex justify-center items-center pt-10">
        <Button
          disableRipple
          className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl text-white bg-blue-900/90 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-blue-900/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
          onPress={handleConfetti}
          type="submit"
          onClick={onOpen}
          size="lg"
        >
          Submit
        </Button>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={() => {
          onClose();
          navigate(-1);
        }}
      >
        <ModalContent className="min-h-[150px] min-w-max">
          {loading ? (
            <ModalBody className="min-h-[150px] flex justify-center items-center">
              <FallbackSpinner />
            </ModalBody>
          ) : (
            <>
              <ModalHeader className="flex justify-center">
                Share your visualization
              </ModalHeader>
              <ModalBody className="flex justify-center items-center pb-10">
                <p>
                  Use the following link to share your visualization with
                  others!
                </p>
                <Snippet
                  className="bg-blue-900/90 shadow-blue-900/40"
                  hideSymbol
                  variant="shadow"
                  size="lg"
                  color="primary"
                  tooltipProps={{ color: 'default' }}
                >
                  {`http://localhost:3000/charts/${visualization.uniqueId}`}
                </Snippet>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
}

export default Form;
