"use client";
import { useEffect } from 'react';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-8 overflow-auto max-h-[90vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
