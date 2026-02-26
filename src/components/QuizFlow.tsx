"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { Button } from "./Button";
import { ResultsLoading } from "./ResultsLoading";

interface QuizFlowProps {
  questions: Question[];
}

export function QuizFlow({ questions }: QuizFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentQuestion = questions[step];
  const selectedLetter =
    currentQuestion && answers[step] !== undefined ? answers[step] : null;

  const handleSelect = useCallback(
    (letter: string) => {
      const next = [...answers];
      next[step] = letter;
      setAnswers(next);
      if (step < questions.length - 1) {
        setStep(step + 1);
      }
    },
    [answers, step, questions.length]
  );

  const handleSeeResults = useCallback(() => {
    if (selectedLetter == null) return;
    setIsCompleting(true);
    const params = new URLSearchParams();
    params.set("s", [...answers, selectedLetter].join(","));
    setTimeout(() => {
      router.push(`/results?${params.toString()}`);
    }, 1500);
  }, [selectedLetter, answers, router]);

  const handleBack = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  if (isCompleting) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <ResultsLoading />
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="space-y-4">
      <ProgressBar current={step + 1} total={questions.length} />
      <QuestionCard
        questionText={currentQuestion.questionText}
        options={currentQuestion.options}
        selectedLetter={selectedLetter}
        onSelect={handleSelect}
      />
      <div className="flex gap-4">
        {step > 0 && (
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        )}
        {step === questions.length - 1 && (
          <Button
            variant="primary"
            onClick={handleSeeResults}
            disabled={!selectedLetter}
          >
            See results
          </Button>
        )}
      </div>
    </div>
  );
}
