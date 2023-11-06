import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
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
  Input,
  Textarea,
} from '@nextui-org/react';
import {
  Eye as EyeIcon,
  Trash2 as DeleteIcon,
  Pencil as EditIcon,
  AlertCircle as AlertIcon,
} from 'lucide-react';
import {
  deleteDataset,
  fetchDataset,
  updateDataset,
} from '../../redux/dataset/datasetSlice';
import DatasetsTable from './DatasetTable';

function View({ slug }) {
  const { loading, dataset } = useSelector((state) => state.dataset);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchDataset(slug));
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="View Dataset">
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
        className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl h-full max-h-[550px]"
      >
        <ModalContent>
          {loading ? (
            <ModalBody className="min-h-[550px] flex justify-center items-center">
              <Spinner size="lg" color="default" />
            </ModalBody>
          ) : (
            <>
              <ModalHeader className="flex justify-center items-center gap-1">
                Dataset details
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center">
                  <div className="font-semibold">Title:</div>
                  <p className="ml-2">{dataset && dataset.title}</p>
                </div>
                <div className="flex items-center">
                  <div className="font-semibold">Description:</div>
                  <p className="ml-2">{dataset && dataset.description}</p>
                </div>
                <DatasetsTable data={dataset.data} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const EditModelContent = (props) => {
  const { slug, onClose, dataset } = props;

  const [file, setFile] = React.useState();
  const [title, setTitle] = React.useState(dataset.title);
  const [description, setDescription] = React.useState(dataset.description);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    dispatch(updateDataset({ slug, formData }));
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Update Dataset</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit}>
          <Input
            autoFocus
            required={true}
            label="Title"
            placeholder="Title for the Dataset"
            variant="bordered"
            labelPlacement="outside"
            type="text"
            defaultValue={dataset.title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <Textarea
            className="my-2"
            label="Description"
            placeholder="Description of the dataset"
            variant="bordered"
            labelPlacement="outside"
            defaultValue={dataset.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Input
            required={true}
            className="my-4"
            label="Data set"
            placeholder="Select file with Data"
            type="file"
            variant="bordered"
            labelPlacement="outside"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <div className="flex justify-center items-center">
            <Button
              className="bg-blue-900/90 hover:bg-blue-900/80"
              color="primary"
              type="submit"
              onPress={onClose}
            >
              Save
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

function Edit({ slug }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { loading, dataset } = useSelector((state) => state.dataset);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchDataset(slug));
  };

  return (
    <>
      <Tooltip content="Edit Dataset">
        <Button
          className="text-default-500 cursor-pointer active:opacity-50 rounded-full"
          isIconOnly
          variant="light"
          disableRipple
          size="sm"
          onPress={onOpen}
          onClick={handleClick}
        >
          <EditIcon size={18} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {loading ? (
                <ModalBody className="min-h-[200px] flex justify-center items-center">
                  <Spinner size="lg" color="default" />
                </ModalBody>
              ) : (
                <EditModelContent
                  slug={slug}
                  onClose={onClose}
                  dataset={dataset}
                />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function Delete(props) {
  const { slug } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { error, loading, message } = useSelector((state) => state.dataset);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteDataset(slug));
    message && toast.success(message);
    error && toast.error(error.message);
  };
  return (
    <>
      <Tooltip color="danger" content="Delete Dataset">
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
                <AlertIcon className="text-rose-600" /> Delete dataset
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this dataset?</p>
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

function RowActions({ slug }) {
  return (
    <div className="flex justify-center items-center">
      <View slug={slug} />
      <Edit slug={slug} />
      <Delete slug={slug} />
    </div>
  );
}

export default RowActions;
