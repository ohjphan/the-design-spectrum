import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-24 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-16">
          <header className="space-y-6">
            <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
              Discover Your Product Design Archetype
            </h1>
            <p className="max-w-xl text-lg text-gray-mid">
              A 5-question diagnostic to map your design instincts and see where
              you thrive across company and project stages.
            </p>
          </header>
          <div className="flex flex-col gap-4">
            <Button href="/quiz" variant="primary">
              Start (2 minutes)
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
