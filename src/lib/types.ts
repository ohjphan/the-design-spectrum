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
  /** Legacy; used when strengthsPoints is not set. */
  strengths?: string[];
  /** Legacy; used when risksPoints is not set. */
  risks?: string[];
  /** Structured strengths: intro + list of title/description points. */
  strengthsPoints?: { title: string; description: string }[];
  /** Structured risks: intro + list of title/description points. */
  risksPoints?: { title: string; description: string }[];
  bestCompanyStage: string[];
  bestProjectPhase: string[];
  /** Legacy single-line growth path; used when growthPathPoints is not set. */
  growthPath?: string;
  /** Structured growth path: intro line + list of title/description points. */
  growthPathPoints?: { title: string; description: string }[];
  /** Tips for managers: intro + list of title/description points. */
  tipsForManagersPoints?: { title: string; description: string }[];
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
  advantages?: string[];
  constraints?: string[];
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
