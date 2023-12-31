import React, { useEffect, useRef } from 'react';

import styles from './modal.module.css';

import {
  language,
  CLOSE,
} from '@/config/texts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: Props) => {
  const { isOpen, onClose, children } = props;
  const modalContentRef = useRef<HTMLDivElement>(null);

  // If the user clicks outside of the modal or presses the escape key, close the modal
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.content} ref={modalContentRef}>
        {children}
        <button onClick={onClose}>
          {CLOSE[language]}
        </button>
      </div>
    </div>
  );
};

export default Modal;
