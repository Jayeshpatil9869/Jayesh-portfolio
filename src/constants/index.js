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
    id: 105,
    name: "OneCapital Fintech Dashboard",
    description:
      "Problem: Wealth managers wasted 15+ hours/week manually merging financial data across disparate platforms. Solution: Architected a highly scalable Next.js/Fastify monorepo that automates massive Excel data ingestion and provides role-based KPIs. Impact: Eliminated manual reporting, supercharged RM productivity, and earned an early full-time promotion.",
    href: "https://github.com/Mahendra111111/onecapital",
    image: "/images/One-Capital-Dashboard-1.png",
    bgImage: "/images/One-Capital-Dashboard-1.png",
    frameworks: [
      { id: 1, name: "Next.js 16" },
      { id: 2, name: "Fastify" },
      { id: 3, name: "Turborepo" },
      { id: 4, name: "Supabase" },
    ],
  },
  {
    id: 104,
    name: "Gravitate",
    description:
      "Problem: A traditional spice brand needed a digital-first approach to digitize sales. Solution: Built a high-performance Next.js platform with a bespoke WhatsApp-integrated ordering system. Impact: Created a low-friction checkout experience that directly increased conversions.",
    href: "http://gravitatee.com",
    image: "/images/Gravitate_Masala.png",
    bgImage: "/images/Gravitate_Masala.png",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "TypeScript" },
      { id: 4, name: "Supabase" },
    ],
  },
  {
    id: 101,
    name: "Riyansh Ayurvedic E-Commerce",
    description:
      "Problem: A wellness brand needed a robust online storefront. Solution: Developed a secure platform with product catalogs, bookings, and Cloudflare edge delivery. Impact: Achieved near-zero latency and seamless transactions.",
    href: "https://www.riyanshamrit.com/",
    image: "/images/Riyansh-Ayurvedic-E-Commerce.jpg",
    bgImage: "/images/Riyansh-Ayurvedic-E-Commerce.jpg",
    frameworks: [
      { id: 1, name: "React.js" },
      { id: 2, name: "Tailwind CSS" },
      { id: 3, name: "E-Commerce" },
    ],
  },
  {
    id: 102,
    name: "Divines Code",
    description:
      "Divines Code is a modern digital marketing and development agency website designed to help startups grow their online presence. The platform highlights services such as branding, digital marketing strategies.",
    href: "https://divinescode.com/",
    image: "/images/divines-code.jpg",
    bgImage: "/images/divines-code.jpg",
    frameworks: [
      { id: 1, name: "HTML" },
      { id: 2, name: "CSS" },
      { id: 3, name: "JavaScript" },
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
    description:
      "Yaseen Global Foundation is a community-driven non-profit organization dedicated to uplifting underprivileged communities through education, healthcare, food distribution, and social welfare programs.",
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
    description:
      "Problem: Users needed a fast, privacy-preserving tool to upscale images. Solution: Created a drag-and-drop React app featuring lazy loading and an AI processing API. Impact: Achieved a Lighthouse performance score of 95+ and delivered a smooth optimization experience.",
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

export const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jayesh-patil01/" },
  { name: "GitHub", href: "https://github.com/Jayeshpatil9869" },
  { name: "WhatsApp", href: "https://wa.me/919209389015" },
  { name: "Codepen", href: "https://codepen.io/jayeshpatil" },
  {
    name: "Instagram",
    href: "https://www.instagram.com/destination_diaries_15/",
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@Rjarts9869",
  },
  { name: "Twitter", href: "https://x.com/Jayeshpatil1553" },
  { name: "Dev.to", href: "https://dev.to/jayesh_patil" },
];
