import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: () => void;
    children?:  ReactNode;
}

function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen)
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          maxWidth: '736px',
          width: 'calc(100% - 32px)',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
