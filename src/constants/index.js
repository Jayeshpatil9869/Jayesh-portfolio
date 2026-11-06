// index.js
export const RESUME_URL = "https://wrcoiavqijnltexejxob.supabase.co/storage/v1/object/public/resume/Jayesh%20Patil.pdf";

// export const servicesData = [
//   {
//     title: "FullStack Development",
//     description:
//       "Your business deserves a fast, secure, and future-proof digital foundation. I develop custom web apps with clean architecture, optimized databases, and seamless integrations—ensuring reliability at every layer.",
//     items: [
//       {
//         title: "Backend Engineering",
//         description: "(REST/GraphQL APIs, Microservices, Auth Systems)",
//       },
//       {
//         title: "Frontend Excellence",
//         description: "(React, Vue, TypeScript, Interactive UI/UX)",
//       },
//       {
//         title: "Database Design",
//         description: "(SQL/NoSQL Optimization, Scalable Structures)",
//       },
//     ],
//   },
//   {
//     title: "DevOps & Cloud Solutions",
//     description:
//       "Deploying software shouldn't be a gamble. I automate infrastructure, enforce security, and leverage cloud platforms (AWS/Azure) to keep your app running smoothly—24/7, at any scale.",
//     items: [
//       {
//         title: "CI/CD Pipelines",
//         description: "(GitHub Actions, Docker, Kubernetes)",
//       },
//       {
//         title: "Server Management ",
//         description: "(Linux, Nginx, Load Balancing)",
//       },
//       {
//         title: "Performance Tuning",
//         description: "(Caching, Compression, Lighthouse 90+ Scores)",
//       },
//     ],
//   },
//   {
//     title: "Security & Optimization",
//     description:
//       "Slow or hacked apps destroy trust. I harden security (XSS/SQLI protection, OAuth) and optimize bottlenecks so your app stays fast, safe, and scalable as you grow.",
//     items: [
//       {
//         title: "Code Audits",
//         description: "(Refactoring, Tech Debt Cleanup)",
//       },
//       {
//         title: "Pen Testing",
//         description: "(Vulnerability Assessments)",
//       },
//       {
//         title: "SEO Tech Stack",
//         description: "(SSR, Metadata, Structured Data)",
//       },
//     ],
//   },
//   {
//     title: "Web & Mobile Apps",
//     description:
//       "A clunky interface can sink even the best ideas. I craft responsive, pixel perfect web and mobile apps (React Native/Flutter) that users love—bridging design and functionality seamlessly.",
//     items: [
//       {
//         title: "Cross-Platform Apps",
//         description: "(Single codebase for iOS/Android/Web)",
//       },
//       {
//         title: "PWAs",
//         description: "(Offline mode, Push Notifications)",
//       },
//       {
//         title: "E-Commerce",
//         description: "(Checkout flows, Payment Gateways, Inventory APIs)",
//       },
//     ],
//   },
// ];

export const projects = [
  {
    id: 107,
    name: "LinkNest",
    description:
      "Visual bookmark manager with URL capture, metadata extraction, visual bookmark cards, category filters, search, duplicate detection, custom cover images, and PWA support. Built with Next.js, React, TypeScript, Fastify, and Supabase/PostgreSQL.",
    href: "https://linknest.divinescode.com/",
    github: "https://github.com/Jayeshpatil9869/LinkNest",
    image: "/images/linknest.png",
    bgImage: "/images/linknest.png",
    caseStudy: {
      id: "linknest",
      summary: "Editorial visual URL library and personal knowledge archive.",
      problem:
        "Traditional bookmarking tools save raw URLs without visual context, making it hard to remember why a link was saved.",
      solution:
        "Built LinkNest with Next.js, React, TypeScript, Fastify, and Supabase/PostgreSQL — URL capture, metadata extraction, visual cards, category filters, search, duplicate detection, custom cover images, and PWA support.",
      impact:
        "Turned URL hoarding into a searchable personal archive with visual bookmarks and multi-attribute search.",
    },
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "React.js" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Fastify" },
      { id: 5, name: "Supabase" },
      { id: 6, name: "Tailwind CSS" },
    ],
  },
  {
    id: 106,
    name: "VELORAA ROUGEE",
    description:
      "Problem: Luxury cosmetics brands face inventory race conditions during flash drops and friction-heavy checkouts. Solution: Full-stack storefront and admin workflows with React, TypeScript, Fastify, PostgreSQL/Supabase, PayU payments, and an editorial UI with Lenis and GSAP. Impact: Safer inventory reservation and a smoother checkout path for the brand.",
    href: "https://veloraarougee.com/",
    image: "/images/veloraa-rougee.png",
    bgImage: "/images/veloraa-rougee.png",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Fastify" },
      { id: 4, name: "PostgreSQL" },
      { id: 5, name: "Tailwind CSS" },
      { id: 6, name: "GSAP" },
    ],
  },
  {
    id: 105,
    name: "OneCapital — Wealth Management Dashboard",
    description:
      "Internal wealth management and financial analytics platform with dashboards, Excel/CSV ingestion and validation, AUM/brokerage/SIP/client analytics, backend APIs, role-based access, and PostgreSQL/Supabase data operations. Project details are listed separately from employment dates.",
    href: "#onecapital",
    internal: true,
    caseStudy: {
      id: "onecapital",
      summary:
        "Internal wealth-management dashboard,\nbuilt to replace Excel-heavy reporting.\nEmployment dates live in Experience — not here.",
      problem:
        "Business teams relied on fragmented spreadsheets and manual merges for wealth and client reporting.",
      solution:
        "Collaborative full-stack delivery of dashboards and analytics with Excel/CSV ingestion and validation, backend APIs, role-based access, and PostgreSQL/Supabase data operations for AUM, brokerage, SIP, and client metrics.",
      impact:
        "Centralized financial reporting workflows into one internal web application for business teams.",
    },
    image: "/images/One-Capital-Dashboard-1.png",
    bgImage: "/images/One-Capital-Dashboard-1.png",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Fastify" },
      { id: 4, name: "Turborepo" },
      { id: 5, name: "PostgreSQL" },
      { id: 6, name: "Supabase" },
    ],
  },
  {
    id: 104,
    name: "Gravitate Masala",
    description:
      "Spice e-commerce storefront with product catalogue, product variants, dynamic pricing, cart, structured WhatsApp checkout, and product/inventory administration. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.",
    href: "https://gravitatee.com/",
    image: "/images/Gravitate_Masala.png",
    bgImage: "/images/Gravitate_Masala.png",
    caseStudy: {
      id: "gravitate",
      summary: "D2C spice storefront with catalogue, cart, and WhatsApp checkout.",
      problem:
        "A traditional spice brand needed a digital-first path to take orders without a heavy checkout funnel.",
      solution:
        "Shipped a Next.js storefront with TypeScript, Tailwind CSS, and Supabase — product catalogue and variants, dynamic pricing, cart, structured WhatsApp checkout, and product/inventory administration.",
      impact:
        "Lowered purchase friction with a WhatsApp-first checkout path for D2C orders.",
    },
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Tailwind CSS" },
      { id: 4, name: "Supabase" },
    ],
  },
  {
    id: 102,
    name: "Divines Code",
    description:
      "Agency marketing site for Divines Code — React/Vite SPA with edge delivery on Cloudflare Workers, focused on performance and clear service storytelling.",
    href: "https://divinescode.com/",
    image: "/images/divines-code.png",
    bgImage: "/images/divines-code.png",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Vite" },
      { id: 3, name: "Cloudflare Workers" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 101,
    name: "Riyansh Amrit — Ayurvedic E-Commerce",
    description:
      "Premium Ayurvedic e-commerce storefront with product catalog, cart, wishlist, and consultation-oriented navigation. Built with React.js and Tailwind CSS.",
    href: "https://riyanshamrit.com/",
    image: "/images/Riyansh-Ayurvedic-E-Commerce.jpg",
    bgImage: "/images/Riyansh-Ayurvedic-E-Commerce.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Tailwind CSS" },
    ],
  },
  {
    id: 103,
    name: "Tellstar.in",
    description:
      "A professionally designed web application built with React and Tailwind CSS, providing an intuitive dashboard experience. The platform focuses on clean UI, responsive design, and structured content delivery.",
    href: "https://tellstar.in/",
    image: "/images/tellstar.jpg",
    bgImage: "/images/tellstar.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Tailwind CSS" },
    ],
  },
  // ---------------- Internship / Private Projects ----------------
  {
    id: 1,
    name: "Yaseen Foundation",
    hidden: true,
    description:
      "Non-profit organization site (currently withheld from the public Works list while the live domain is unavailable).",
    href: "https://www.yaseenglobalfoundation.in/",
    image: "/images/Yaseen-Foundation.jpg",
    bgImage: "/images/Yaseen-Foundation.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "Gaushala Management Dashboard",
    description:
      "Problem: Cow shelters struggled with offline tracking of donations and staff. Solution: Developed a management platform with React, role-based auth, and dynamic tables. Impact: Digitized daily operations, significantly reducing administrative overhead.",
    href: "https://gaushala-management-system.jayeshbpatil.com/",
    image: "/images/Gaushala.jpg",
    bgImage: "/images/Gaushala.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Supabase" },
    ],
  },
  {
    id: 7,
    name: "Enhancify – AI Image Enhancer",
    practice: true,
    description:
      "Drag-and-drop React image enhancer with lazy loading and an AI processing API — a practice project focused on UI flow and performance habits.",
    href: "https://github.com/Jayeshpatil9869/image-enhancer",
    image: "/images/image-enhancer.jpg",
    bgImage: "/images/image-enhancer.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "Lazy Loading" },
      { id: 4, name: "Performance Optimization" },
    ],
  },
  {
    id: 8,
    name: "Movie Search App",
    practice: true,
    description:
      "A real-time movie search web app featuring modular components, client-side routing, and OMDB API integration—optimized with debounce and caching for improved performance.",
    href: "https://github.com/Jayeshpatil9869/MovieSearch-React-Application",
    image: "/images/movieDekho.jpg",
    bgImage: "/images/movieDekho.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Vite" },
      { id: 3, name: "OMDB API" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },
  {
    id: 9,
    name: "Rejouice Clone",
    practice: true,
    description:
      'A "Rejouice" website clone showcasing modern web development techniques with HTML, CSS, JavaScript, and GSAP animations—emphasizing responsive, interactive design.',
    href: "https://github.com/Jayeshpatil9869/Rejouice-Clone",
    image: "/images/rejouice.jpg",
    bgImage: "/images/rejouice.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "GSAP" },
    ],
  },
  {
    id: 10,
    name: "Lazarev Agency Clone",
    practice: true,
    description:
      "A clone of the Lazarev Agency website that demonstrates modern front-end skills—responsive layouts, visuals, and animations with HTML, CSS, and JavaScript.",
    href: "https://github.com/Jayeshpatil9869/Lazarev",
    image: "/images/Lazarev.jpg",
    bgImage: "/images/Lazarev.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
    ],
  },
  {
    id: 11,
    name: "Outpost Design Website Clone",
    practice: true,
    description:
      "A modern, responsive clone of the Outpost Design website, showcasing advanced front-end development skills including animations, responsiveness, and sleek UI design.",
    href: "https://github.com/Jayeshpatil9869/Outpost-Project",
    image: "/images/Outpost.jpg",
    bgImage: "/images/Outpost.jpg",
    frameworks: [
      { id: 1, name: "HTML5" },
      { id: 2, name: "CSS3 & SASS" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "GSAP" },
    ],
  },
  {
    id: 12,
    name: "Rethink Website Clone",
    practice: true,
    description:
      "A replica of the Rethink website using HTML, CSS, and JavaScript. Features smooth fade animations using the AOS (Animate On Scroll) library, interactive elements, and responsive layout.",
    href: "https://github.com/Jayeshpatil9869/Rethink",
    image: "/images/rethink.jpg",
    bgImage: "/images/rethink.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "AOS" },
    ],
  },
  {
    id: 13,
    name: "Sundown Studio",
    practice: true,
    description:
      "A visually immersive clone of the Sundown Studio website, featuring smooth scroll animations and high-quality design elements.",
    href: "https://github.com/Jayeshpatil9869/Sundown-Studio",
    image: "/images/sundown.jpg",
    bgImage: "/images/sundown.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
      { id: 4, name: "GSAP" },
    ],
  },
];

export const featuredProjects = projects.filter(
  (project) => !project.practice && !project.hidden
);
export const practiceProjects = projects.filter(
  (project) => project.practice && !project.hidden
);
export const caseStudyProjects = projects.filter(
  (project) => project.caseStudy && !project.hidden
);

/** Primary recruiter-facing links shown in Contact / nav. */
export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jayeshpatilfs/" },
  { name: "GitHub", href: "https://github.com/Jayeshpatil9869" },
  { name: "DEV Community", href: "https://dev.to/jayesh_patil" },
  { name: "CodePen", href: "https://codepen.io/jayeshbpatil" },
  { name: "WhatsApp", href: "https://wa.me/919209389015" },
];
