import React from 'react';
import Modal from './Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const footer = (
    <div className="confirmation-buttons">
      <button className="btn btn-secondary" onClick={onClose}>
        {cancelText}
      </button>
      <button className="btn btn-danger" onClick={handleConfirm}>
        {confirmText}
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <div className="confirmation-content">
        <ExclamationTriangleIcon className="confirmation-icon" />
        <p>{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmationModal; 