export const personalInfo = {
  name: "Geon Yoo",
  email: "geonjason@gmail.com",
  github: "https://github.com/jasongeon123",
  linkedin: "https://www.linkedin.com/in/geon-yoo",
  portfolio: "http://www.geonyoo.com",
  available: true,
};

export const typingStrings = [
  "Software Engineer",
  "Full Stack Developer",
  "ML Engineer",
];

export const aboutText = {
  title: "Software Engineer at UPS",
  story: `UC San Diego graduate specializing in Machine Learning & Neural Computation. Passionate about building accessible technology for underserved communities.`,
};

export const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "100K+", label: "Users Impacted" },
  { number: "15+", label: "Projects Completed" },
  { number: "4", label: "Companies" },
];

export const education = [
  {
    school: "UC San Diego",
    degree: "B.S. Cognitive Science",
    specialization: "Machine Learning & Neural Computation",
    minor: "Computer Science",
    period: "2018 - 2022",
    logo: "/images/ucsd-logo.png",
  },
];

export const skills = [
  { name: "React / Next.js / TypeScript", category: "frontend" },
  { name: "Python / TensorFlow / PyTorch", category: "ml" },
  { name: "Unity / C# / AR Development", category: "game" },
  { name: "Node.js / SQL / MongoDB", category: "backend" },
  { name: "Java / C / C++", category: "backend" },
  { name: "Git / Jenkins / Linux", category: "devops" },
];

export const skillsDescription = `Full-stack developer with expertise in machine learning and game development. Currently building training solutions at UPS.`;

export const projects = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio with dark/light themes and animations",
    icon: "FaPaintBrush",
    link: "http://www.geonyoo.com",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    title: "Stock Bot Alarm",
    description: "Anomaly detection for stock price movements",
    icon: "FaChartLine",
    link: "https://stockalarmclock.herokuapp.com/",
    tags: ["React", "Flask", "Isolation Forests", "Python"],
  },
  {
    title: "Ella Bean Coffee",
    description: "Coffee shop e-commerce with admin dashboard",
    icon: "FaCoffee",
    link: "https://ellabeancoffee.com",
    tags: ["Next.js", "Prisma", "Stripe", "NextAuth"],
  },
  {
    title: "The Odd Shift",
    description: "Hi-Lo card counting trainer with speed challenges",
    icon: "FaGamepad",
    link: "https://theoddshift.com",
    tags: ["React", "PostgreSQL", "Railway", "Electron"],
  },
  {
    title: "Trading Alert Bot",
    description: "Real-time stock signals running on Raspberry Pi",
    icon: "FaRobot",
    link: null,
    tags: ["Python", "FastAPI", "Alpaca API", "WebSocket"],
  },
  {
    title: "CrowdFood",
    description: "Pool money for group dining with escrow payments",
    icon: "FaUtensils",
    link: null,
    tags: ["Next.js", "Stripe Connect", "Prisma", "PostgreSQL"],
  },
  {
    title: "Driver Training LMS",
    description: "Full-stack platform for 100K+ UPS drivers",
    icon: "FaTruck",
    link: null,
    tags: ["React", "Node.js", "SQL", "Jenkins"],
  },
  {
    title: "AR Training App",
    description: "Augmented reality for driver training",
    icon: "FaVrCardboard",
    link: null,
    tags: ["Unity", "C#", "ARCore", "Vuforia"],
  },
  {
    title: "Neural Network Logistics",
    description: "Observational learning for supply chain optimization",
    icon: "FaBrain",
    link: null,
    tags: ["Python", "TensorFlow", "PyTorch", "ML"],
  },
];

export const experiences = [
  {
    company: "UPS",
    title: "Software Engineer",
    team: "US Operations Training",
    location: "Remote",
    period: "2022 - Present",
    logo: "/images/ups-logo.svg",
    link: "https://www.ups.com",
    responsibilities: [
      "Built LMS platform for 100K+ drivers",
      "Developed AR training with Unity",
      "Created neural networks for logistics",
    ],
  },
  {
    company: "Kloak",
    title: "Software Engineer Intern",
    team: "Full Stack",
    location: "Valencia, CA",
    period: "2021 - 2022",
    logo: "/images/kloaklogo.png",
    link: "https://www.gokloak.com/",
    responsibilities: [
      "Built notification system",
      "Designed homepage UI/UX",
      "Implemented recommender system",
    ],
  },
  {
    company: "Avation Medical",
    title: "R&D Intern",
    team: "Product Development",
    location: "Valencia, CA",
    period: "2021",
    logo: "/images/avationlogo.png",
    link: "https://www.avation.com/",
    responsibilities: [
      "Led UI/UX design in Figma",
      "FDA compliance management",
      "App testing & QA",
    ],
  },
  {
    company: "Santa Clarita City",
    title: "Civil Engineer Intern",
    team: "Traffic & Signs",
    location: "Santa Clarita, CA",
    period: "2018",
    logo: "/images/s-l500.jpg",
    link: "https://www.santa-clarita.com/",
    responsibilities: [
      "Traffic data collection & analysis",
      "AutoCAD road modeling",
    ],
  },
];

export const testimonials = [
  {
    quote: "Geon is an exceptional engineer who consistently delivers high-quality work. His AR training solution transformed how we onboard new drivers.",
    name: "Training Manager",
    title: "UPS Operations",
  },
  {
    quote: "Great attention to detail and strong technical skills. Geon's contributions to our UI/UX significantly improved user engagement.",
    name: "Product Lead",
    title: "Kloak",
  },
];
