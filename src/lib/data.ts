import type { Archetype, Question, StageFit, PhaseFit } from "./types";

import archetypesData from "../../data/archetypes.json";
import questionsData from "../../data/questions.json";
import stageFitData from "../../data/stage-fit.json";
import phaseFitData from "../../data/phase-fit.json";

export const archetypes = archetypesData as Archetype[];
export const questions = questionsData as Question[];
export const stageFit = stageFitData as StageFit[];
export const phaseFit = phaseFitData as PhaseFit[];

const archetypeById = new Map(archetypes.map((a) => [a.id, a]));

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypeById.get(id as Archetype["id"]);
}

export function getArchetypesByIds(ids: string[]): Archetype[] {
  return ids
    .map((id) => getArchetypeById(id))
    .filter((a): a is Archetype => a != null);
}
