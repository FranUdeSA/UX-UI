export type MarkerType = 'pain' | 'quote' | 'dropoff' | 'idea';

export interface InterviewTimestampMarker {
  id: string;
  timeSeconds: number;
  timeFormatted: string; // ej: "07:15"
  type: MarkerType;
  label: string;
  note?: string;
  questionRef?: string;
}

export type ArchetypeProfile = 'preventivo_esporadico' | 'intensivo_cronico' | 'sin_definir';

export interface InterviewSession {
  id: string;
  number: number;
  title: string;
  participantCode: string;
  interviewers: string[];
  date: string;
  status: 'pendiente' | 'en_curso' | 'completada';
  elapsedSeconds: number;
  currentSectionId: string;
  currentQuestionId: string;
  archetype: ArchetypeProfile;
  branchSelections: Record<string, string>; // ej: { P7: 'app' | 'externo', P11: 'si' | 'no' }
  markers: InterviewTimestampMarker[];
  generalNotes: string;
}

export interface BranchOption {
  id: string;
  label: string;
  script: string;
  deepDiveTip?: string;
  subPrompts?: string[];
}

export interface InterviewQuestion {
  id: string; // ej: "P1", "P7", "INTRO"
  number?: number;
  code: string;
  title: string;
  verbalScript: string;
  subScript?: string;
  moderatorRules?: string[];
  fiveWhys?: {
    context?: string;
    prompts: string[];
  };
  observerChecklist?: string[];
  branching?: {
    conditionTitle: string;
    options: BranchOption[];
  };
  methodologySlides: string[];
  methodologyRationale: string;
}

export interface InterviewSection {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  suggestedMinutes: number;
  description: string;
  methodologySlides: string[];
  methodologyRationale: string;
  questions: InterviewQuestion[];
}
