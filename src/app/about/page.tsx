import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-6 py-12 sm:px-12 lg:px-16">
        <h1 className="mb-10 text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
          About This Project
        </h1>

        <div className="space-y-6 text-foreground">
          <p className="text-gray-mid">
            Over a decade ago, during my UX program at General Assembly, my teacher{" "}
            <Link
              href="https://www.linkedin.com/in/wesyun/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:no-underline"
            >
              Wesley Yun
            </Link>{" "}
            said something that stayed with me:
          </p>

          <p className="font-medium text-foreground">
            There are different types of designers, and they often align with different stages of a company.
          </p>

          <p className="text-gray-mid">
            At the time, I did not fully understand what he meant. But as my career unfolded, I began to feel it.
          </p>

          <p className="text-gray-mid">
            I was consistently drawn to early-stage startups, especially pre-seed to seed companies where ambiguity was high and direction was still forming. I loved the energy, the speed, the possibility. I just never had the language to explain why.
          </p>

          <p className="text-gray-mid">
            Later, as I became a hiring manager, I noticed something else. I was always looking for a specific type of designer in those early environments. Not just strong designers, but designers whose instincts matched the stage of the company. I did not have a formal framework, but I could see the pattern.
          </p>

          <p className="text-gray-mid">
            As I mentored peers who were navigating career decisions between startups, scale-ups, and mature companies, I kept thinking back to what Wesley said years ago.
          </p>

          <p className="font-medium text-foreground">
            Different environments amplify different designers.
          </p>

          <p className="text-gray-mid">
            I was also inspired by a former manager,{" "}
            <Link
              href="https://www.linkedin.com/in/meaganr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:no-underline"
            >
              Meagan Ryan
            </Link>
            , who once created a design archetype Figma plugin to help designers reflect on their strengths. That idea of understanding your design instincts more structurally stayed with me.
          </p>

          <p className="text-gray-mid">
            The Design Spectrum is the evolution of those conversations.
          </p>

          <p className="text-gray-mid">
            It is a simple tool to help you:
          </p>

          <ul className="list-inside list-disc space-y-2 text-gray-mid">
            <li>Discover your design archetype</li>
            <li>Understand your strengths and blind spots</li>
            <li>Explore which company stages and project phases amplify your impact</li>
          </ul>

          <p className="text-gray-mid">
            My hope is that this helps you find where you belong, or intentionally choose where you want to stretch.
          </p>

          <p className="font-medium text-foreground">
            Misalignment is not failure.
            <br />
            It is often just a mismatch between designer and environment.
          </p>

          <p className="text-gray-mid">
            Take it for a spin. And if you enjoy it, share it and share your archetype. If you have feedback, I would love to hear from you.
          </p>

          <p className="text-gray-mid">
            <Link
              href="https://www.linkedin.com/in/jessicaphan/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-foreground bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
            >
              Connect with me on LinkedIn
            </Link>
          </p>

          <p className="pt-8 text-gray-mid">
            Jessica Phan
            <br />
            Built in collaboration with Cursor and ChatGPT
          </p>
        </div>
      </main>
    </div>
  );
}
