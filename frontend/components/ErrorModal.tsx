"use client"
import Modal from './Modal';
import { ErrorModalProps } from '../types';

const ErrorModal: React.FC<ErrorModalProps> = ({ error, isOpen, onClose }) => {
  if (!error) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while processing your request.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-red-700 font-medium">
            {error}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;