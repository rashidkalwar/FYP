import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from '@nextui-org/react';
import { ChevronLeft, Link, CheckCheck, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

function StepThree({ setSelected }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Icon, setIcon] = React.useState(<Copy size={18} />);
  const [tooltipText, setTooltipText] = React.useState('Copy');

  const navigate = useNavigate();

  const handleClick = () => {
    navigator.clipboard.writeText('This is Link text');
    setIcon(<CheckCheck size={18} />);
    setTooltipText('Copied');
    setTimeout(() => {
      setIcon(<Copy size={18} />);
      setTooltipText('Copy');
    }, 5000);
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
    <div className="max-w-2xl mx-auto py-20 px-5">
      <div className="flex justify-center items-center gap-10 min-h-[300px]">
        <Button
          disableRipple
          className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl text-white bg-blue-900/90 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-blue-900/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
          size="lg"
          onPress={handleConfetti}
          onClick={onOpen}
        >
          Publish
        </Button>
      </div>
      <div className="flex justify-start mt-10">
        <Button
          className="bg-blue-900/90 hover:bg-blue-900/80"
          radius="full"
          color="primary"
          disableRipple
          onClick={() => setSelected('step-2')}
          startContent={<ChevronLeft size={20} />}
        >
          Previous
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
        <ModalContent className="min-h-[150px]">
          {() => (
            <>
              <ModalHeader className="flex justify-center">
                Share your visualization
              </ModalHeader>
              <ModalBody className="flex justify-center items-center pb-10">
                <p>
                  Use the following link to share your visualization with
                  others!
                </p>
                <Input
                  isReadOnly
                  type="text"
                  color="default"
                  variant="faded"
                  size="lg"
                  radius="full"
                  defaultValue="junior@nextui.org"
                  className="max-w-sm"
                  classNames={{
                    inputWrapper: 'pr-0',
                  }}
                  startContent={<Link className="text-gray-500" size={20} />}
                  endContent={
                    <Tooltip showArrow={true} content={tooltipText}>
                      <Button
                        className="bg-blue-900/90 hover:bg-blue-900/80"
                        color="primary"
                        radius="full"
                        size="lg"
                        isIconOnly
                        onClick={handleClick}
                      >
                        {Icon}
                      </Button>
                    </Tooltip>
                  }
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default StepThree;
