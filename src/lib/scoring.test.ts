import { describe, it, expect } from "vitest";
import { computeArchetypeResult } from "./scoring";

describe("computeArchetypeResult", () => {
  it("returns dominant archetype when one letter appears 4+ times", () => {
    const result = computeArchetypeResult(["B", "B", "B", "B", "A"]);
    expect(result.dominant).toBe("systems-thinker");
    expect(result.secondary).toBe("visionary");
    expect(result.isHybrid).toBe(false);
    expect(result.isAdaptiveGeneralist).toBe(false);
    expect(result.distribution["systems-thinker"]).toBe(4);
  });

  it("returns hybrid when two archetypes tie for first", () => {
    const result = computeArchetypeResult(["A", "A", "G", "G", "B"]);
    expect(result.dominant).toBe("visionary");
    expect(result.secondary).toBe("strategic-partner");
    expect(result.isHybrid).toBe(true);
    expect(result.isAdaptiveGeneralist).toBe(false);
  });

  it("returns adaptive generalist when all five answers are different", () => {
    const result = computeArchetypeResult(["A", "B", "C", "D", "E"]);
    expect(result.dominant).toBe("visionary");
    expect(result.isHybrid).toBe(false);
    expect(result.isAdaptiveGeneralist).toBe(true);
    expect(result.distribution["visionary"]).toBe(1);
    expect(result.distribution["researcher"]).toBe(1);
  });

  it("returns dominant and secondary when clear first and second", () => {
    const result = computeArchetypeResult(["B", "B", "B", "G", "A"]);
    expect(result.dominant).toBe("systems-thinker");
    expect(result.secondary).toBeDefined();
    expect(["visionary", "strategic-partner"]).toContain(result.secondary);
    expect(result.isHybrid).toBe(false);
    expect(result.distribution["systems-thinker"]).toBe(3);
    expect(result.distribution["strategic-partner"]).toBe(1);
  });

  it("maps letters A–G to correct archetype ids", () => {
    expect(computeArchetypeResult(["A", "A", "A", "A", "A"]).dominant).toBe("visionary");
    expect(computeArchetypeResult(["B", "B", "B", "B", "B"]).dominant).toBe("systems-thinker");
    expect(computeArchetypeResult(["C", "C", "C", "C", "C"]).dominant).toBe("growth-optimization");
    expect(computeArchetypeResult(["D", "D", "D", "D", "D"]).dominant).toBe("craft-purist");
    expect(computeArchetypeResult(["E", "E", "E", "E", "E"]).dominant).toBe("researcher");
    expect(computeArchetypeResult(["F", "F", "F", "F", "F"]).dominant).toBe("design-operator");
    expect(computeArchetypeResult(["G", "G", "G", "G", "G"]).dominant).toBe("strategic-partner");
  });
});
