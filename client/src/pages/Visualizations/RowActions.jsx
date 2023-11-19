import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
  Snippet,
} from '@nextui-org/react';
import {
  Eye as EyeIcon,
  Trash2 as DeleteIcon,
  Share2 as ShareIcon,
  AlertCircle as AlertIcon,
} from 'lucide-react';
import {
  deleteVisualization,
  fetchVisualization,
} from '../../redux/visualization/visualizationSlice';

const Info = ({ name, data }) => {
  return (
    <div className="border-blue-900/90 border-2 flex justify-start rounded-md">
      <span className="bg-blue-900/90 text-white p-2 rounded-sm">{name}:</span>
      <span className="p-2">{data}</span>
    </div>
  );
};

function View({ id }) {
  const { loading, visualization } = useSelector(
    (state) => state.visualization
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchVisualization(id));
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="View Details">
        <Button
          className="text-blue-900/90 bg-white hover:bg-blue-900/20 cursor-pointer active:opacity-50 rounded-full"
          isIconOnly
          disableRipple
          size="sm"
          onPress={onOpen}
          onClick={handleClick}
        >
          <EyeIcon size={18} />
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl"
      >
        <ModalContent>
          {loading ? (
            <ModalBody className="min-h-[350px] flex justify-center items-center">
              <Spinner size="lg" color="default" />
            </ModalBody>
          ) : (
            <>
              <ModalHeader className="flex justify-center items-center gap-1">
                Visualization details
              </ModalHeader>
              <ModalBody className="min-h-[350px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mx-auto py-5">
                  <Info name="UID" data={visualization.uniqueId} />
                  <Info name="Title" data={visualization.title} />
                  <Info name="Description" data={visualization.description} />
                  <Info
                    name="Dataset"
                    data={visualization.dataset?.split('-').join(' ')}
                  />
                  <Info
                    name="Chart Type"
                    data={visualization.chartType?.split('-').join(' ')}
                  />
                  <Info name="Plot columns" data={visualization.plotColumns} />
                  <Info name="X-Axis column" data={visualization.xAxisColumn} />
                  <Info name="y-Axis column" data={visualization.yAxisColumn} />
                  <Info
                    name="Date created"
                    data={visualization.createdAt?.split('T')[0]}
                  />
                  <Info
                    name="Date updated"
                    data={visualization.updatedAt?.split('T')[0]}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function Edit({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { loading, visualization } = useSelector(
    (state) => state.visualization
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchVisualization(id));
  };

  return (
    <>
      <Tooltip content="Share">
        <Button
          className="text-default-500 cursor-pointer active:opacity-50 rounded-full"
          isIconOnly
          variant="light"
          disableRipple
          size="sm"
          onPress={onOpen}
          onClick={handleClick}
        >
          <ShareIcon size={18} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent className="min-h-200px min-w-max">
          {() => (
            <>
              {loading ? (
                <ModalBody className="flex justify-center items-center">
                  <Spinner size="lg" color="default" />
                </ModalBody>
              ) : (
                <>
                  <ModalHeader className="flex justify-center">
                    Share Visualization
                  </ModalHeader>
                  <ModalBody className="flex mb-10 p-10">
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function Delete({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { loading } = useSelector((state) => state.visualization);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteVisualization(id));
  };

  return (
    <>
      <Tooltip color="danger" content="Delete">
        <Button
          onPress={onOpen}
          className="text-danger cursor-pointer active:opacity-50 rounded-full"
          isIconOnly
          color="danger"
          variant="light"
          disableRipple
          size="sm"
        >
          <DeleteIcon size={18} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-1">
                <AlertIcon className="text-rose-600" /> Delete visualization
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this visualization?</p>
              </ModalBody>
              <ModalFooter className="justify-center">
                <Button
                  className="hover:bg-gray-200"
                  color="default"
                  variant="flat"
                  onPress={onClose}
                >
                  No
                </Button>
                <Button
                  color="primary"
                  className="bg-blue-900/90 hover:bg-blue-900/80"
                  isLoading={loading}
                  onClick={handleClick}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function RowActions({ id }) {
  return (
    <div className="flex justify-center items-center">
      <View id={id} />
      <Edit id={id} />
      <Delete id={id} />
    </div>
  );
}
