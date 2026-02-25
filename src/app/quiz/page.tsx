import { questions } from "@/lib/data";
import { QuizFlow } from "@/components/QuizFlow";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-12 sm:px-12 lg:px-16">
        <QuizFlow questions={questions} />
      </main>
    </div>
  );
}
