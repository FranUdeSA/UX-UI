export type LawStatus = 'cumple' | 'rompe' | 'pendiente';

export type SeverityLevel = 0 | 1 | 2 | 3 | 4 | null;

export interface UxLawItem {
  id: string;
  number: number;
  name: string;
  category?: string;
  guidingQuestion: string;
  status: LawStatus;
  screenName: string;
  evidenceImage: string;
  explanation: string;
}

export interface NielsenHeuristicItem {
  id: string; // ej: "H1"
  number: number; // 1 a 10
  name: string;
  principleDescription: string;
  severity: SeverityLevel;
  screenName: string;
  evidenceImage: string;
  explanation: string;
  userImpact: string;
}

export interface TeamData {
  university: string;
  course: string;
  project: string;
  members: string[];
  brand: {
    name: string;
    primaryColor: string;
    pantone: string;
    description: string;
  };
}

export type ActiveTab = 'dashboard' | 'interview' | 'laws' | 'nielsen' | 'team';

export interface EvidenceModalData {
  isOpen: boolean;
  type: 'law' | 'heuristic';
  itemId: string;
  title: string;
  subtitle?: string;
  badgeLabel?: string;
  badgeColor?: string;
  imageSrc: string;
  screenName: string;
  explanation: string;
  userImpact?: string;
  guidingQuestion?: string;
}
