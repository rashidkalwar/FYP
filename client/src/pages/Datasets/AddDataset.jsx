import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { addDataset } from '../../redux/dataset/datasetSlice';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';

function AddDataset() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { error, loading, message } = useSelector((state) => state.dataset);

  const [file, setFile] = React.useState();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    dispatch(addDataset({ formData }));

    // for (let obj of formData) {
    //   console.log(obj);
    // }
  };

  React.useEffect(() => {
    message && toast.success(message);
    error && toast.error(error.message);
  }, [error, message]);

  return (
    <>
      <Button
        className="bg-blue-900/90 hover:bg-blue-900/80"
        onPress={onOpen}
        endContent={<Plus />}
        color="primary"
        disableRipple
      >
        Add New
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new Dataset
              </ModalHeader>
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
                      isLoading={loading}
                    >
                      {loading ? 'Loading...' : 'Submit'}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddDataset;
