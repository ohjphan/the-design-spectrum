import Link from "next/link";
import { archetypes } from "@/lib/data";

export default function ArchetypesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-[868px] px-6 py-12 sm:px-12 lg:px-16">
        <h1 className="mb-10 text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
          7 Design Archetypes
        </h1>

        <ul className="grid gap-6 grid-cols-1">
          {archetypes.map((archetype) => (
            <li key={archetype.id}>
              <Link
                href={`/archetypes/${archetype.id}`}
                className="block border border-gray-light bg-background px-6 py-6 transition-colors hover:border-foreground"
              >
                <h2 className="text-lg font-medium text-foreground">
                  {archetype.emoji && <span>{archetype.emoji} </span>}
                  {archetype.label}
                </h2>
                <p className="mt-2 text-sm text-gray-mid line-clamp-3">
                  {archetype.shortDescription}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
