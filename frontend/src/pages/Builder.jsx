import {
  Code2,
  Database,
  Server,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";

import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import GlassCard from "../components/ui/GlassCard";

const techStack = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  "Node.js",
  "Express.js",
  "REST APIs",
  "MongoDB",
  "MySQL",
  "Git",
  "GitHub",
  "VS Code",
  "Postman",
  "npm",
];

const learning = [
  "System Design",
  "Data Structures & Algorithms",
  "AI / ML",
  "Cloud Fundamentals",
];

const journey = [
  {
    number: "01",
    title: "The Idea",
    text: "Started with a simple idea: build something that encourages awareness around smoking habits.",
  },
  {
    number: "02",
    title: "The Product",
    text: "Turned that idea into AshTray, a personal habit-tracking experience focused on awareness, patterns, and healthier choices.",
  },
  {
    number: "03",
    title: "The Engineering",
    text: "Built the application across the frontend, backend, APIs, authentication, and database using the MERN stack.",
  },
  {
    number: "04",
    title: "The Experience",
    text: "Designed the interface around simplicity and clarity, making personal activity and progress easy to understand.",
  },
  {
    number: "05",
    title: "The Features",
    text: "Added analytics, challenges, craving support, achievements, authentication, personal tracking, and activity insights.",
  },
  {
    number: "06",
    title: "The Learning",
    text: "Used the project to strengthen practical skills in full-stack development, API design, databases, authentication, debugging, and product thinking.",
  },
];

const Builder = () => {
  return (
    <AppLayout>

      <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">

        <Header />

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section className="mt-10">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
            Behind the Build
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight text-[#33251F] md:text-6xl">
            The Builder.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#7A685D]">
            The person behind AshTray, the ideas behind the product,
            and the engineering behind the experience.
          </p>

        </section>

        {/* ================================================= */}
        {/* BUILDER INTRO */}
        {/* ================================================= */}

        <GlassCard className="mt-10">

          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">

            <div>

              {/* NAME */}

              <p className="text-2xl font-black text-[#C65D2E] md:text-3xl">
                Vamshi B Rao
              </p>

              {/* UNIVERSITY */}

              <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-[#33251F] md:text-3xl">
                Software Product Engineering (AI & ML) Student @ RV University
              </h2>

              {/* ROLE */}

              <p className="mt-4 text-lg font-semibold text-[#6F5C50]">
                Full-Stack Developer
              </p>

              <p className="mt-5 max-w-3xl leading-7 text-[#7A685D]">
                I'm passionate about building scalable, user-centric
                software and turning ideas into production-ready
                applications.
              </p>

              <p className="mt-4 max-w-3xl leading-7 text-[#7A685D]">
                I enjoy working across the entire development lifecycle,
                from designing databases and APIs to crafting intuitive
                user experiences.
              </p>

            </div>

            <div className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-[#C65D2E]/10 text-[#C65D2E]">

              <Code2
                size={48}
                strokeWidth={1.7}
              />

            </div>

          </div>

        </GlassCard>

        {/* ================================================= */}
        {/* WHAT I BUILD */}
        {/* ================================================= */}

        <section className="mt-10">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
            What I Build
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#33251F]">
            From idea to application.
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-6">

              <Server
                size={27}
                className="text-[#C65D2E]"
              />

              <h3 className="mt-5 text-xl font-black text-[#33251F]">
                Full-Stack
              </h3>

              <p className="mt-2 leading-6 text-[#7A685D]">
                Building complete applications across frontend,
                backend, APIs, authentication, and databases.
              </p>

            </div>

            <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-6">

              <Database
                size={27}
                className="text-[#C65D2E]"
              />

              <h3 className="mt-5 text-xl font-black text-[#33251F]">
                Product Engineering
              </h3>

              <p className="mt-2 leading-6 text-[#7A685D]">
                Thinking beyond code to create useful, maintainable,
                and user-focused products.
              </p>

            </div>

            <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-6">

              <BrainCircuit
                size={27}
                className="text-[#C65D2E]"
              />

              <h3 className="mt-5 text-xl font-black text-[#33251F]">
                AI & ML
              </h3>

              <p className="mt-2 leading-6 text-[#7A685D]">
                Exploring artificial intelligence and machine learning
                alongside modern software engineering.
              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* TOOLS */}
        {/* ================================================= */}

        <section className="mt-10">

          <GlassCard>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
              The Tools
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Built with.
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">

              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    rounded-full
                    border
                    border-[#C65D2E]/10
                    bg-[#F1DFD0]
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-[#6F5C50]
                    transition-all
                    duration-200
                    hover:border-[#C65D2E]/30
                    hover:bg-[#C65D2E]
                    hover:text-white
                    hover:-translate-y-0.5
                  "
                >
                  {tech}
                </span>
              ))}

            </div>

          </GlassCard>

        </section>

        {/* ================================================= */}
        {/* JOURNEY */}
        {/* ================================================= */}

        <section className="mt-10">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
            The Journey
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#33251F]">
            How AshTray came together.
          </h2>

          <div className="mt-6 space-y-4">

            {journey.map((step) => (
              <div
                key={step.number}
                className="
                  rounded-3xl
                  border
                  border-[#C65D2E]/10
                  bg-[#F1DFD0]
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#C65D2E]/20
                "
              >

                <div className="flex gap-5">

                  <span className="text-sm font-black text-[#C65D2E]">
                    {step.number}
                  </span>

                  <div>

                    <h3 className="text-xl font-black text-[#33251F]">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-3xl leading-7 text-[#7A685D]">
                      {step.text}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* ================================================= */}
        {/* LEARNING */}
        {/* ================================================= */}

        <section className="mt-10">

          <GlassCard>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
              Currently Learning
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Always building. Always learning.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {learning.map((item) => (
                <div
                  key={item}
                  className="
                    rounded-2xl
                    bg-[#F1DFD0]
                    px-5
                    py-4
                    font-semibold
                    text-[#6F5C50]
                  "
                >
                  {item}
                </div>
              ))}

            </div>

          </GlassCard>

        </section>

        {/* ================================================= */}
        {/* SOCIAL */}
        {/* ================================================= */}

        <section className="mt-10">

          <div className="rounded-[28px] bg-[#332923] p-7 md:p-9">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
              Find the Builder
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#FFF8F1]">
              Want to see more?
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-[#C9B8AC]">
              Explore the code behind AshTray or connect with me
              to see what I'm building next.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">

              <a
                href="https://github.com/vamshirao12"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  bg-[#C65D2E]
                  px-5
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-[#B95025]
                "
              >
                <Code2 size={19} />
                GitHub
                <ArrowUpRight size={17} />
              </a>

              <a
                href="https://www.linkedin.com/in/vamshi-b-rao"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#FFF8F1]/15
                  px-5
                  py-3
                  font-bold
                  text-[#FFF8F1]
                  transition
                  hover:bg-[#FFF8F1]/10
                "
              >
                <Code2 size={19} />
                LinkedIn
                <ArrowUpRight size={17} />
              </a>

            </div>

          </div>

        </section>

        <div className="h-12" />

      </div>

    </AppLayout>
  );
};

export default Builder;