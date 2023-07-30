import React, { useState } from 'react';

import styles from './modal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: Props) => {
  const { isOpen, onClose, children } = props;
  
  if (!isOpen) return null;

  const style = isOpen ? styles.open : styles.closed;

  return (
    <div className={styles.modal}>
      <div className={`${styles.content}`}>
        {children}
        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
