"use client";
import { useState } from "react";
import { toast } from "sonner";
import { SectionCardProps } from "../types";
import Modal from "./Modal";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

const SectionCard: React.FC<SectionCardProps> = ({ section, onGenerateUI, uiLoading }) => {
  const [showModal, setShowModal] = useState(false);

  const isLoading = uiLoading === section.id;

  const handleCopy = () => {
    navigator.clipboard.writeText(section.code);
    toast.success("Code copied to clipboard!");
  };

  const handleGenerate = () => {
    setShowModal(true);
    onGenerateUI(section.id, section.name);
  };

  return (
    <>
      <div className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {section.name}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>
          </div>
          <div className="flex-shrink-0 ml-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="mb-6 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Generated Code</span>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </div>

          <div className="relative border border-gray-700 rounded-2xl overflow-hidden">
            <CodeMirror
              value={section.code}
              height="300px"
              theme={vscodeDark}
              readOnly
              extensions={[javascript()]}
            />
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="group/btn w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <svg
              className={`w-5 h-5 transition-transform ${
                isLoading ? "animate-spin" : "group-hover/btn:rotate-12"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
            {isLoading ? "Crafting UI Design..." : "Generate UI Design"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center min-h-[200px] text-center space-y-4">
          {isLoading ? (
            <>
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-lg font-semibold text-gray-700">Generating UI for <span className="text-emerald-600">{section.name}</span>...</p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-600">Done! 🎉</p>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition"
              >
                Close
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SectionCard;
