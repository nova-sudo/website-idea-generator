export interface Section {
  id: string;
  name: string;
  content: string;
  code: string;
}

export interface UIDesign {
  description: string;
  code: string;
}

export interface IdeaFormProps {
  onSubmit: (idea: string) => void;
  loading: boolean;
  error: string | null;
}

export interface SectionCardProps {
  section: Section;
  onGenerateUI: (sectionId: string, sectionName: string) => void;
  uiLoading: string | null;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface UIDesignModalProps {
  uiDesign: UIDesign | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ErrorModalProps {
  error: string | null;
  isOpen: boolean;
  onClose: () => void;
}