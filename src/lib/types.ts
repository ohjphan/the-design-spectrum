export type ArchetypeId =
  | "visionary"
  | "systems-thinker"
  | "growth-optimization"
  | "craft-purist"
  | "researcher"
  | "design-operator"
  | "strategic-partner";

export interface Archetype {
  id: ArchetypeId;
  label: string;
  shortDescription: string;
  emoji?: string;
  strengths: string[];
  risks: string[];
  bestCompanyStage: string[];
  bestProjectPhase: string[];
  growthPath: string;
  icon?: string;
}

export interface QuestionOption {
  letter: string;
  archetypeId: ArchetypeId;
  text: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: QuestionOption[];
}

export interface StageFit {
  id: string;
  label: string;
  description: string;
  companySize?: string;
  examples?: string[];
  archetypeIds: ArchetypeId[];
}

export interface PhaseFit {
  id: string;
  label: string;
  description: string;
  archetypeIds: ArchetypeId[];
}

export type AnswerLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface ArchetypeResult {
  dominant: ArchetypeId;
  secondary?: ArchetypeId;
  isHybrid: boolean;
  isAdaptiveGeneralist: boolean;
  distribution: Record<ArchetypeId, number>;
}
