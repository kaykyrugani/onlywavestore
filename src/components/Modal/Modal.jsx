import React from 'react';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './Modal.module.css';

ReactModal.setAppElement('#root');

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  closeTimeoutMS = 300,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={title || "Modal"}
      className={{
        base: styles.modal,
        afterOpen: "ReactModal__Content--after-open",
        beforeClose: "ReactModal__Content--before-close"
      }}
      overlayClassName={{
        base: styles.overlay,
        afterOpen: "ReactModal__Overlay--after-open",
        beforeClose: "ReactModal__Overlay--before-close"
      }}
      closeTimeoutMS={closeTimeoutMS}
      {...props}
    >
      <div className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
