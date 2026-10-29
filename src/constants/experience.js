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
    period: "Jul 2026 – Present",
    type: "Pune, Maharashtra | On-site",
    description:
      "Building and maintaining wealth management dashboards, REST APIs, and data pipelines used by business teams for AUM, brokerage, and client analytics.",
    responsibilities: [
      "Build and maintain internal wealth management dashboards for AUM, brokerage, and client-level reporting",
      "Implement Excel/XLS/XLSX ingestion with validation and structured database processing",
      "Develop REST APIs with Node.js and Fastify, including JWT auth and user-level data scoping",
      "Apply role-based access control across employee, manager, and administrator permission levels",
      "Work in a shared TypeScript monorepo using Turborepo and pnpm across frontend and backend packages",
    ],
  },
  {
    id: "onecapital-intern",
    title: "Full Stack Developer Intern",
    company: "OneCapital Investment Private Limited",
    employmentType: "Internship",
    period: "Feb 2026 – Jun 2026",
    type: "Pune, Maharashtra | On-site",
    description:
      "Contributed to financial dashboard features and the migration of Excel-heavy workflows into a centralized web application, then transitioned to the full-time role.",
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
    period: "Jun 2025 – Jan 2026",
    type: "Nashik, Maharashtra | Hybrid",
    note: "Overlapped with the Divines Code internship from Jun–Oct 2025. Concurrent months are not double-counted toward total career span.",
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
    id: "divines-intern",
    title: "Full Stack Developer Intern",
    company: "Divines Code",
    employmentType: "Internship",
    period: "Jun 2025 – Oct 2025",
    type: "Nashik, Maharashtra | Hybrid",
    note: "Ran concurrently with freelance client work at Divines Code for the same period.",
    description:
      "Full-stack application development with emphasis on responsive UI, API integration, and reliable delivery.",
    responsibilities: [
      "Developed full-stack features for client and agency projects",
      "Implemented responsive frontend interfaces",
      "Integrated and debugged REST APIs",
      "Supported database/backend work, testing, and deployment where needed",
    ],
  },
  {
    id: "digimirai-intern",
    title: "Full Stack Developer Intern (MERN Stack)",
    company: "Digi Mirai",
    employmentType: "Internship",
    period: "Jan 2025 – May 2025",
    type: "Malegaon, Maharashtra | On-site",
    description:
      "Worked across frontend and backend on MERN-stack projects for commercial clients.",
    responsibilities: [
      "Shipped MERN-stack client work from MongoDB schema design through React frontends",
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
  },
  {
    id: "bca",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Savitribai Phule Pune University",
    period: "May 2021 – April 2024",
    status: "Completed",
  },
];

export const experienceIntro = `Fintech dashboards, full-stack client delivery,
and production web apps — from internship through
full-time product work.`;
