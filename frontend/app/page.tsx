"use client"
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Section, UIDesign } from '../types';
import IdeaForm from '../components/IdeaForm';
import SectionsList from '../components/SectionList';
import UIDesignModal from '../components/UIDesignModal';
import ErrorModal from '../components/ErrorModal';

const Home = () => {
  const [currentIdea, setCurrentIdea] = useState<string>(''); // Store the current idea
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uiDesign, setUIDesign] = useState<UIDesign | null>(null);
  const [uiLoading, setUILoading] = useState<string | null>(null);
  const [uiError, setUIError] = useState<string | null>(null);

  const handleIdeaSubmit = async (idea: string) => {
    setLoading(true);
    setError(null);
    setSections([]);
    setCurrentIdea(idea); // Store the idea for later use

    console.log('Sending request with idea:', idea);

    try {
      const response = await axios.post('http://localhost:3001/api/sections', 
        { idea }, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30010, // 30 second timeout
        }
      );
      console.log('Response received:', response.data);
      setSections(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('API Error:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        message: axiosError.message,
        request: axiosError.request ? 'Request made but no response' : 'No request made'
      });
      
      let errorMessage = 'Failed to generate sections';
      
      if (axiosError.response?.status === 400) {
        errorMessage = 'Invalid request. Please check your input and try again.';
      } else if (axiosError.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (axiosError.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Make sure your backend is running on port 3001.';
      } else if (axiosError.code === 'TIMEOUT') {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      if (typeof axiosError.response?.data === 'object' && 
          axiosError.response?.data !== null && 
          'message' in axiosError.response.data) {
        errorMessage = (axiosError.response.data as { message?: string }).message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateUIDesign = async (sectionId: string, sectionName: string) => {
    setUILoading(sectionId);
    setUIError(null);
    setUIDesign(null);

    console.log('Generating UI for:', { sectionId, sectionName, idea: currentIdea });

    try {
      const response = await axios.get(`http://localhost:3001/api/sections/${sectionId}/ui-design`, {
        params: { 
          idea: currentIdea, // Send the original website idea
          sectionName: sectionName 
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30010,
      });
      console.log('UI Design response:', response.data);
      setUIDesign(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('UI Design API Error:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        message: axiosError.message,
      });
      
      let errorMessage = 'Failed to generate UI design';
      
      if (axiosError.response?.status === 400) {
        errorMessage = 'Invalid section data. Please try generating sections again.';
      } else if (axiosError.response?.status === 404) {
        errorMessage = 'Section not found. Please try generating sections again.';
      } else if (axiosError.response?.status === 500) {
        errorMessage = 'Server error while generating UI. Please try again.';
      } else if (axiosError.code === 'ECONNREFUSED') {
        errorMessage = 'Cannot connect to server. Make sure your backend is running.';
      }
      
      if (typeof axiosError.response?.data === 'object' &&
          axiosError.response?.data !== null &&
          'message' in axiosError.response.data) {
        errorMessage = (axiosError.response.data as { message?: string }).message || errorMessage;
      }
      
      setUIError(errorMessage);
    } finally {
      setUILoading(null);
    }
  };

  const closeUIDesignModal = () => {
    setUIDesign(null);
  };

  const closeErrorModal = () => {
    setUIError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none`} />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <IdeaForm 
          onSubmit={handleIdeaSubmit}
          loading={loading}
          error={error}
        />

        <SectionsList
          sections={sections}
          onGenerateUI={handleGenerateUIDesign}
          uiLoading={uiLoading}
        />

        <UIDesignModal
          uiDesign={uiDesign}
          isOpen={!!uiDesign}
          onClose={closeUIDesignModal}
        />

        <ErrorModal
          error={uiError}
          isOpen={!!uiError}
          onClose={closeErrorModal}
        />
      </div>
    </div>
  );
};

export default Home;