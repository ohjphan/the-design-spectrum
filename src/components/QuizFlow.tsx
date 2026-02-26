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

  const isLastStep = step === questions.length - 1;
  const showBack = step > 0;
  const showSeeResults = isLastStep;
  const showFooter = showBack || showSeeResults;

  return (
    <>
      <div className={`space-y-4 ${showFooter ? "pb-24" : ""}`}>
        <ProgressBar current={step + 1} total={questions.length} />
        <QuestionCard
          questionText={currentQuestion.questionText}
          options={currentQuestion.options}
          selectedLetter={selectedLetter}
          onSelect={handleSelect}
        />
      </div>

      {showFooter && (
        <footer
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-light bg-background py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
          aria-label="Quiz actions"
        >
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 sm:px-12 lg:px-16">
            <div className="min-w-0 flex-1">
              {showBack && (
                <Button variant="secondary" onClick={handleBack}>
                  ← Back
                </Button>
              )}
            </div>
            <div className="flex shrink-0">
              {showSeeResults && (
                <Button
                  variant="primary"
                  onClick={handleSeeResults}
                  disabled={!selectedLetter}
                >
                  See results →
                </Button>
              )}
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
