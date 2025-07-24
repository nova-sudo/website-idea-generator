"use client"
import { Section } from '../types';
import SectionCard from './SectionCard';

interface SectionsListProps {
  sections: Section[];
  onGenerateUI: (sectionId: string, sectionName: string) => void;
  uiLoading: string | null;
}

const SectionsList: React.FC<SectionsListProps> = ({ sections, onGenerateUI, uiLoading }) => {
  if (sections.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Generated Sections
        </h2>
        <p className="text-gray-600 text-lg">
          Here are the AI-generated sections for your website idea
        </p>
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-800 font-medium text-sm">
              {sections.length} section{sections.length !== 1 ? 's' : ''} ready
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="animate-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <SectionCard
              section={section}
              onGenerateUI={onGenerateUI}
              uiLoading={uiLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionsList;