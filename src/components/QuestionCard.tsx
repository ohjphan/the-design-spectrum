import type { QuestionOption } from "@/lib/types";

interface QuestionCardProps {
  questionText: string;
  options: QuestionOption[];
  selectedLetter: string | null;
  onSelect: (letter: string) => void;
}

export function QuestionCard({
  questionText,
  options,
  selectedLetter,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        {questionText}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-1">
        {options.map((opt) => (
          <li key={opt.letter}>
            <button
              type="button"
              onClick={() => onSelect(opt.letter)}
              className={`w-full border px-6 py-4 text-left text-base transition-colors ${
                selectedLetter === opt.letter
                  ? "border-foreground bg-foreground text-background"
                  : "border-gray-light bg-background text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              <span className="font-medium">{opt.letter}.</span> {opt.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
