'use client';

import styles from './Modal.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ isOpen, title, message, onConfirm, onCancel }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onCancel}>
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{message}</p>
            <div className={styles.actions}>
                <button className={styles.confirmBtn} onClick={onConfirm}>
                <FiCheckCircle size={20} />
              </button>
              <button className={styles.cancelBtn} onClick={onCancel}>
                <FiXCircle size={20} />
              </button>            
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
