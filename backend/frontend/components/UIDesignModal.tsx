"use client"
import Modal from './Modal';
import { UIDesignModalProps } from '../types';
import { toast } from "sonner"; // Or remove this line if you don't want toast


const UIDesignModal: React.FC<UIDesignModalProps> = ({ uiDesign, isOpen, onClose }) => {
  if (!uiDesign) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            <span className="text-blue-800 font-semibold">UI Design Generated</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Custom UI Design
          </h2>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Description
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {uiDesign.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Generated Code
            </h3>
            <button
              onClick={() => copyToClipboard(uiDesign.code)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 text-sm font-medium text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Code
            </button>
          </div>
          
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-auto max-h-96 text-sm leading-relaxed border border-gray-700 shadow-inner">
              <code className="language-jsx">{uiDesign.code}</code>
            </pre>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UIDesignModal;