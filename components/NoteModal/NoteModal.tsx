'use client';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import { FormValues } from '../NoteForm/NoteForm';
import { FormikHelpers } from 'formik';
import css from './NoteModal.module.css';

export interface NoteModalProps {
  onClose: () => void;
  onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}

export default function NoteModal({ onClose, onSubmit }: NoteModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        <NoteForm 
          onClose={onClose} 
          onSubmit={onSubmit}
        />
      </div>
    </div>,
    document.body
  );
}