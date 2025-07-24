"use client"
import { useState, FormEvent } from 'react';
import { IdeaFormProps } from '../types';

const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit, loading, error }) => {
  const [idea, setIdea] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Website Idea Generator
        </h1>
        <p className="text-gray-600 text-lg">
          Transform your ideas into structured website sections with AI-powered insights
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your website idea (e.g., Landing page for bakery)"
            className="w-full text-zinc-700 px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
            required
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-6">
            <div className={`w-2 h-2 rounded-full ${idea.length > 10 ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-300`} />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !idea.trim()}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Sections
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default IdeaForm;