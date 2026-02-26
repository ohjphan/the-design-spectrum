import Link from "next/link";
import { Button } from "@/components/Button";
import { HeroParallax } from "@/components/HeroParallax";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroParallax />
      <main className="mx-auto max-w-3xl px-6 pt-10 pb-24 sm:px-12 sm:pt-12 lg:px-16">
        <div className="flex flex-col gap-12">
          <header className="space-y-6">
            <h1 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
              Discover Your Product Design Archetype
            </h1>
            <p className="max-w-xl text-lg text-gray-mid">
              Answer 5 quick questions to see what kind of designer you are and where you thrive.
            </p>
          </header>
          <div className="flex flex-col gap-4">
            <Button href="/quiz" variant="primary">
              Start →
            </Button>
          </div>

          <section className="grid grid-cols-1 gap-0 pt-6 sm:grid-cols-3 sm:gap-0">
            <Link
              href="/archetypes"
              className="flex flex-col border border-gray-light bg-background p-6 transition-colors hover:border-foreground sm:border-r-0"
            >
              <h2 className="font-heading text-lg font-medium leading-tight text-foreground">
                Meet the design archetypes
              </h2>
              <p className="mt-2 text-sm text-gray-mid">
                Learn about each design type and what makes them unique.
              </p>
              <span className="mt-4 block text-foreground" aria-hidden>→</span>
            </Link>
            <Link
              href="/explore/company-stage"
              className="-mt-px flex flex-col border border-gray-light bg-background p-6 transition-colors hover:border-foreground sm:mt-0 sm:border-r-0"
            >
              <h2 className="font-heading text-lg font-medium leading-tight text-foreground">
                Find your fit by company stage
              </h2>
              <p className="mt-2 text-sm text-gray-mid">
                Explore which environments amplify different design instincts.
              </p>
              <span className="mt-4 block text-foreground" aria-hidden>→</span>
            </Link>
            <Link
              href="/explore/project-lifecycle"
              className="-mt-px flex flex-col border border-gray-light bg-background p-6 transition-colors hover:border-foreground sm:mt-0"
            >
              <h2 className="font-heading text-lg font-medium leading-tight text-foreground">
                Find your fit by project phase
              </h2>
              <p className="mt-2 text-sm text-gray-mid">
                See where each archetype shines in the product journey.
              </p>
              <span className="mt-4 block text-foreground" aria-hidden>→</span>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
