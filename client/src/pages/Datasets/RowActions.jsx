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
} from '@nextui-org/react';
import {
  Eye as EyeIcon,
  Trash2 as DeleteIcon,
  Pencil as EditIcon,
  AlertCircle as AlertIcon,
} from 'lucide-react';
import { deleteDataset } from '../../redux/dataset/datasetSlice';

function View() {
  return (
    <>
      <Tooltip content="View Dataset">
        <Button
          className="text-blue-900/90 bg-white hover:bg-blue-900/20 cursor-pointer active:opacity-50 rounded-full"
          isIconOnly
          disableRipple
          size="sm"
        >
          <EyeIcon size={18} />
        </Button>
      </Tooltip>
    </>
  );
}

function Edit() {
  return (
    <>
      <Tooltip content="Edit Dataset">
        <Button
          className="text-default-500 cursor-pointer active:opacity-50 rounded-full"
          isIconOnly
          variant="light"
          disableRipple
          size="sm"
        >
          <EditIcon size={18} />
        </Button>
      </Tooltip>
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
          {/* {slug} */}
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
                  //   onPress={onClose}
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

function RowActions(props) {
  return (
    <>
      <View />
      <Edit />
      <Delete slug={props.slug} />
    </>
  );
}

export default RowActions;
