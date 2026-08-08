import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import GlassCard from "../components/ui/GlassCard";

import {
  HeartPulse,
  Cigarette,
  BarChart3,
  Target,
  ShieldCheck,
  Sparkles,
  Github,
  Linkedin,
  Code2,
  Database,
  Server,
  BrainCircuit,
  ExternalLink,
} from "lucide-react";

const features = [
  {
    icon: Cigarette,
    title: "Track Your Activity",
    text: "Log your smoking activity and keep a clear record of your daily habits.",
  },
  {
    icon: BarChart3,
    title: "Understand Your Patterns",
    text: "Use activity, spending, and trigger data to understand when and why you tend to smoke.",
  },
  {
    icon: Target,
    title: "Set Personal Goals",
    text: "Create a daily limit that gives you a simple and realistic target to work toward.",
  },
  {
    icon: HeartPulse,
    title: "Handle Cravings",
    text: "Find small, practical actions that can help you pause when a craving appears.",
  },
];

const techStack = [
  {
    icon: Code2,
    title: "Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "HTML5",
      "CSS3",
    ],
  },
  {
    icon: Code2,
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
    ],
  },
  {
    icon: Database,
    title: "Database",
    items: [
      "MongoDB",
      "MySQL",
    ],
  },
  {
    icon: Code2,
    title: "Tools & Technologies",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "npm",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Currently Learning",
    items: [
      "System Design",
      "Data Structures & Algorithms",
      "AI/ML",
      "Cloud Fundamentals",
    ],
  },
];

export default function About() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <Header />

        {/* ================================================== */}
        {/* ABOUT THE APP */}
        {/* ================================================== */}

        <GlassCard>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#C65D2E]/10">
              <HeartPulse
                size={32}
                className="text-[#C65D2E]"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C65D2E]">
                About the App
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight text-[#33251F] md:text-5xl">
                A little more awareness,
                <br />
                one day at a time.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#7A685D]">
                This app is designed to help users understand their
                smoking habits, recognize their patterns, and make
                more mindful decisions without making the process
                feel overwhelming.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* ================================================== */}
        {/* WHY THIS APP EXISTS */}
        {/* ================================================== */}

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
              The Idea
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Why this app exists
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A685D]">
              Changing a habit starts with understanding it.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#C65D2E]/10 bg-[#F1DFD0] p-6 md:p-8">
            <p className="text-base leading-8 text-[#5F4D42]">
              Instead of simply counting cigarettes, this app brings
              together activity tracking, spending, triggers, goals,
              analytics, craving support, and daily challenges in one
              place.
            </p>

            <p className="mt-5 text-base leading-8 text-[#5F4D42]">
              The goal is not perfection. Every entry provides another
              piece of information that can help users understand their
              habits and make more informed decisions over time.
            </p>
          </div>
        </section>

        {/* ================================================== */}
        {/* FEATURES */}
        {/* ================================================== */}

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
              What You Can Do
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Everything in one place
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
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
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
                    <Icon
                      size={24}
                      className="text-[#C65D2E]"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-[#33251F]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 leading-7 text-[#7A685D]">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================== */}
        {/* ABOUT ME */}
        {/* ================================================== */}

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
              About Me
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Built by Vamshi B Rao
            </h2>
          </div>

          <div
            className="
              overflow-hidden
              rounded-[30px]
              border
              border-[#C65D2E]/15
              bg-[#332923]
              p-7
              md:p-10
            "
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {/* PROFILE ICON */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-[#C65D2E]/10">
                <Code2
                  size={38}
                  className="text-[#C65D2E]"
                />
              </div>

              {/* BIO */}

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#C65D2E]">
                  Software Product Engineering (AI & ML) Student @ RV
                  University
                </p>

                <h3 className="mt-2 text-3xl font-black text-[#FFF8F1]">
                  Full-Stack Developer
                </h3>

                <p className="mt-5 max-w-3xl leading-8 text-[#C9B8AC]">
                  I'm a Software Product Engineering (AI & ML) student
                  at RV University with a passion for building scalable,
                  user-centric software. I specialize in full-stack web
                  development using the MERN stack while leveraging
                  Python and Java to build efficient backend systems and
                  solve complex problems.
                </p>

                <p className="mt-4 max-w-3xl leading-8 text-[#C9B8AC]">
                  I enjoy turning ideas into production-ready
                  applications by working across the entire development
                  lifecycle—from designing databases and APIs to
                  crafting intuitive user experiences.
                </p>

                <p className="mt-4 max-w-3xl leading-8 text-[#C9B8AC]">
                  Currently, I'm focused on strengthening my expertise
                  in software engineering, system design fundamentals,
                  and modern web technologies while building impactful
                  projects that solve real-world problems.
                </p>

                <p className="mt-4 max-w-3xl leading-8 text-[#C9B8AC]">
                  I'm actively seeking Software Engineering Internship
                  opportunities where I can contribute, learn from
                  experienced engineers, and grow as a developer.
                </p>

                {/* SOCIAL LINKS */}

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/vamshirao12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-[#C65D2E]/20
                      bg-[#2A2523]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#FFF8F1]
                      transition
                      hover:border-[#C65D2E]/50
                      hover:bg-[#C65D2E]/10
                    "
                  >
                    <Github size={18} />
                    GitHub
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/vamshi-b-rao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-[#C65D2E]/20
                      bg-[#2A2523]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#FFF8F1]
                      transition
                      hover:border-[#C65D2E]/50
                      hover:bg-[#C65D2E]/10
                    "
                  >
                    <Linkedin size={18} />
                    LinkedIn
                    <ExternalLink size={14} />
                  </a>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-[#C65D2E]/10
                      bg-[#2A2523]
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      text-[#BCA99D]
                    "
                  >
                    <Sparkles size={18} />
                    Portfolio — Coming Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================== */}
        {/* TECH STACK */}
        {/* ================================================== */}

        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
              Technology
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Tools I work with
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A685D]">
              A growing toolkit focused on modern web development,
              software engineering, and AI/ML.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {techStack.map((stack) => {
              const Icon = stack.icon;

              return (
                <div
                  key={stack.title}
                  className="
                    rounded-3xl
                    border
                    border-[#C65D2E]/10
                    bg-[#F1DFD0]
                    p-6
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
                      <Icon
                        size={21}
                        className="text-[#C65D2E]"
                      />
                    </div>

                    <h3 className="font-bold text-[#33251F]">
                      {stack.title}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="
                          rounded-xl
                          border
                          border-[#C65D2E]/10
                          bg-[#F6EBDD]
                          px-3
                          py-2
                          text-xs
                          font-semibold
                          text-[#6D584C]
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================== */}
        {/* DATA */}
        {/* ================================================== */}

        <GlassCard>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
              <ShieldCheck
                size={25}
                className="text-[#C65D2E]"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
                Your Data
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#33251F]">
                Your progress belongs to you.
              </h2>

              <p className="mt-2 max-w-2xl leading-7 text-[#7A685D]">
                Your entries, goals, spending information, and activity
                patterns are used to provide the features inside the app
                and help you understand your own progress.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* ================================================== */}
        {/* CLOSING */}
        {/* ================================================== */}

        <section
          className="
            overflow-hidden
            rounded-[30px]
            border
            border-[#C65D2E]/15
            bg-[#332923]
            p-8
            md:p-10
          "
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#C65D2E]">
                <Sparkles size={18} />

                <span className="text-xs font-bold uppercase tracking-[0.2em]">
                  Keep Building
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-black text-[#FFF8F1]">
                Small steps.
                <br />
                Better awareness.
                <br />
                Real progress.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#C9B8AC]">
              This project represents a hands-on approach to building
              practical software—from designing the backend and database
              to creating a polished, user-focused frontend.
            </p>
          </div>
        </section>

        <div className="h-8" />
      </div>
    </AppLayout>
  );
}