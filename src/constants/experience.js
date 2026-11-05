/**
 * Controlled professional timeline (month–year precision).
 * Keep employment dates independent of project start dates.
 * Update LinkedIn + resume PDF when this file changes.
 */

export const experienceData = [
  {
    id: "onecapital-ft",
    title: "Software Developer (Full Stack)",
    company: "OneCapital Investment Private Limited",
    employmentType: "Full-time",
    period: "March 2026 – Present",
    type: "Pune, Maharashtra | On-site",
    note: "Progression from Full Stack Developer Intern (September 2025 – February 2026).",
    description:
      "Building and maintaining wealth management dashboards, REST APIs, and data pipelines used by business teams for AUM, brokerage, and client analytics.",
    responsibilities: [
      "Build and maintain internal wealth management dashboards for AUM, brokerage, and client-level reporting",
      "Implement Excel/XLS/XLSX ingestion with validation and structured database processing",
      "Develop REST APIs with Node.js and Fastify for authenticated internal workflows",
      "Support permission-aware access across internal team roles",
      "Work in a shared TypeScript monorepo using Turborepo and pnpm across frontend and backend packages",
    ],
  },
  {
    id: "onecapital-intern",
    title: "Full Stack Developer Intern",
    company: "OneCapital Investment Private Limited",
    employmentType: "Internship",
    period: "September 2025 – February 2026",
    type: "Pune, Maharashtra | On-site",
    description:
      "Contributed to financial dashboard features and the migration of Excel-heavy workflows into a centralized web application, then transitioned to the full-time Software Developer role.",
    responsibilities: [
      "Shipped dashboard reporting features and multi-level data filtering for internal financial systems",
      "Helped migrate manual Excel-based operations into a unified web application",
      "Built React/Next.js interfaces and PostgreSQL/Supabase schemas for dashboard workflows",
      "Contributed to REST API work, testing, debugging, and production releases",
    ],
  },
  {
    id: "divines-freelance",
    title: "Full Stack Developer (Freelance)",
    company: "Divines Code",
    employmentType: "Freelance",
    period: "August 2025 – Present",
    type: "Nashik, Maharashtra | Hybrid",
    description:
      "Delivered full-stack client websites and applications spanning e-commerce, booking systems, dashboards, and business sites.",
    responsibilities: [
      "Shipped production web applications for business clients end to end",
      "Built responsive frontends with React, Next.js, and Tailwind CSS",
      "Integrated APIs with Node.js and Express, including auth where required",
      "Handled testing, debugging, and deployment for client deliveries",
    ],
  },
  {
    id: "digimirai-intern",
    title: "Full Stack Developer Intern",
    company: "Digi Mirai",
    employmentType: "Internship",
    period: "February 2025 – June 2025",
    type: "Malegaon, Maharashtra | On-site",
    description:
      "Worked across frontend and backend on production web apps for commercial clients, using React on the client and Node.js/Express with MongoDB on the server.",
    responsibilities: [
      "Shipped client projects from MongoDB schema design through React frontends",
      "Built reusable React components and modular Node.js/Express APIs",
      "Participated in testing, debugging, Git workflows, and staged rollouts",
    ],
  },
];

export const educationData = [
  {
    id: "mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Savitribai Phule Pune University",
    period: "May 2025 – Present",
    status: "In progress",
    expected: "Expected graduation 2027",
    kind: "Degree",
  },
  {
    id: "nareshit",
    degree: ".NET Full Stack Developer Training",
    institution: "NareshIT",
    period: "June 2024 – February 2025",
    status: "Completed",
    kind: "Training",
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Savitribai Phule Pune University",
    period: "May 2021 – April 2024",
    status: "Completed",
    kind: "Degree",
  },
];

export const experienceIntro = `Fintech dashboards, freelance client delivery,
and production web apps — from internship through
full-time product work at OneCapital.`;

/** Skills for recruiter scan — evidenced stack only, no proficiency claims. */
export const skillsData = [
  {
    id: "languages",
    label: "Languages",
    items: ["JavaScript", "TypeScript"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "GSAP"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    items: ["Node.js", "Express.js", "Fastify", "REST APIs"],
  },
  {
    id: "data",
    label: "Data",
    items: ["PostgreSQL", "Supabase", "MongoDB"],
  },
  {
    id: "tooling",
    label: "Tooling",
    items: ["Git", "pnpm", "Turborepo", "Docker", "Vercel", "Cloudflare"],
  },
];
