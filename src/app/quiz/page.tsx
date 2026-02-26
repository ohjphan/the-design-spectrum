import { questions } from "@/lib/data";
import { QuizFlow } from "@/components/QuizFlow";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-4 sm:px-12 sm:py-6 lg:px-16">
        <QuizFlow questions={questions} />
      </main>
    </div>
  );
}
