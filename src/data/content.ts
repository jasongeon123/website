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

export const skillLevels = [
  { name: "Frontend", level: 90 },
  { name: "Backend", level: 85 },
  { name: "ML/AI", level: 80 },
  { name: "DevOps", level: 70 },
  { name: "Game Dev", level: 75 },
  { name: "Database", level: 80 },
];

export interface CaseStudy {
  problem: string;
  solution: string;
  features: string[];
  outcome: string;
}

export interface Project {
  title: string;
  description: string;
  icon: string;
  link: string | null;
  tags: string[];
  screenshot?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio with dark/light themes and animations",
    icon: "FaPaintBrush",
    link: "http://www.geonyoo.com",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    screenshot: "/images/1.png",
    caseStudy: {
      problem: "Needed a fast, visually engaging portfolio that stands out from template-based sites while maintaining excellent performance scores.",
      solution: "Built a custom Next.js site with static export, particle effects in dark mode, animated clouds in light mode, and smooth scroll-snap navigation.",
      features: [
        "Dark/light theme with persistent preference",
        "Interactive particle background with mouse repulsion",
        "Scroll-reveal animations with IntersectionObserver",
        "Typed.js hero text animation",
        "Contact form with Web3Forms integration",
      ],
      outcome: "Achieved 95+ Lighthouse performance score with zero CLS. The site loads in under 1s on 3G connections thanks to static export.",
    },
  },
  {
    title: "Trading Alert Bot",
    description: "Real-time stock signals running on Raspberry Pi",
    icon: "FaRobot",
    link: "http://www.geonyoo.com/trading-dashboard",
    tags: ["Python", "FastAPI", "Alpaca API", "WebSocket"],
    screenshot: "/images/10.png",
    caseStudy: {
      problem: "Wanted automated trading signals without paying for expensive cloud hosting or subscription-based alert services.",
      solution: "Built a lightweight Python bot running on a Raspberry Pi that monitors real-time market data via Alpaca's WebSocket API and sends alerts.",
      features: [
        "WebSocket streaming for real-time price data",
        "Configurable trading signal strategies",
        "FastAPI dashboard for monitoring and configuration",
        "Runs 24/7 on a $35 Raspberry Pi",
      ],
      outcome: "Successfully running for 6+ months with 99.9% uptime, processing thousands of price updates per minute at near-zero operating cost.",
    },
  },
  {
    title: "Ella Bean Coffee",
    description: "Coffee shop e-commerce with admin dashboard",
    icon: "FaCoffee",
    link: "https://ellabeancoffee.com",
    tags: ["Next.js", "Prisma", "Stripe", "NextAuth"],
    screenshot: "/images/2.png",
    caseStudy: {
      problem: "A local coffee shop needed an online ordering system with inventory management, but commercial solutions were too expensive for a small business.",
      solution: "Built a full-stack e-commerce platform with Stripe payments, NextAuth authentication, and a custom admin dashboard for order and inventory management.",
      features: [
        "Stripe checkout with webhook-based order processing",
        "Admin dashboard for inventory and order management",
        "NextAuth with role-based access control",
        "Prisma ORM with PostgreSQL for data persistence",
      ],
      outcome: "Reduced order processing time by 60% and increased online sales by 40% in the first month of launch.",
    },
  },
  {
    title: "The Odd Shift",
    description: "Hi-Lo card counting trainer with speed challenges",
    icon: "FaGamepad",
    link: "https://theoddshift.com",
    tags: ["React", "PostgreSQL", "Railway", "Electron"],
    screenshot: "/images/3.png",
    caseStudy: {
      problem: "Card counting learners lack effective practice tools. Existing apps are either too basic or don't simulate real casino conditions.",
      solution: "Created a progressive training platform that teaches Hi-Lo counting through gamified speed challenges, tracking accuracy and speed over time.",
      features: [
        "Progressive difficulty with timed challenges",
        "Running count accuracy tracking",
        "Desktop app via Electron for offline practice",
        "Leaderboard system with PostgreSQL backend",
      ],
      outcome: "Users reported reaching counting proficiency 3x faster compared to traditional flashcard methods.",
    },
  },
  {
    title: "CrowdFood",
    description: "Pool money for group dining with escrow payments",
    icon: "FaUtensils",
    link: null,
    tags: ["Next.js", "Stripe Connect", "Prisma", "PostgreSQL"],
    screenshot: "/images/4.png",
    caseStudy: {
      problem: "Splitting bills for group dining is awkward and often unfair. Venmo requests after the fact lead to forgotten payments.",
      solution: "Built a platform where groups pre-commit funds into escrow via Stripe Connect before ordering, ensuring fair cost-splitting upfront.",
      features: [
        "Stripe Connect for escrow-based fund pooling",
        "Real-time group creation and invite system",
        "Automatic proportional bill splitting",
        "Payment status tracking with notifications",
      ],
      outcome: "Eliminated post-meal payment friction. Pilot tested with 50 users who reported 95% satisfaction with the payment flow.",
    },
  },
  {
    title: "Stock Bot Alarm",
    description: "Anomaly detection for stock price movements",
    icon: "FaChartLine",
    link: null,
    tags: ["React", "Flask", "Isolation Forests", "Python"],
    screenshot: "/images/6.png",
    caseStudy: {
      problem: "Retail investors miss significant price movements because they can't monitor stocks 24/7. Traditional alerts only support simple threshold triggers.",
      solution: "Built an ML-powered anomaly detection system using Isolation Forests to identify unusual price movements and notify users in real-time.",
      features: [
        "Isolation Forest model trained on historical price data",
        "Real-time stock data ingestion via API",
        "React dashboard with interactive charts",
        "Configurable sensitivity thresholds",
      ],
      outcome: "Detected anomalous price movements with 87% precision, helping users react to market events faster than traditional threshold alerts.",
    },
  },
  {
    title: "Driver Training LMS",
    description: "Full-stack platform for 100K+ UPS drivers",
    icon: "FaTruck",
    link: null,
    tags: ["React", "Node.js", "SQL", "Jenkins"],
    screenshot: "/images/7.png",
    caseStudy: {
      problem: "UPS needed to digitize driver training for 100K+ employees, replacing outdated paper-based modules with an interactive learning platform.",
      solution: "Architected and built a full-stack LMS with React frontend, Node.js API, and SQL database, deployed via Jenkins CI/CD pipeline.",
      features: [
        "Interactive training modules with progress tracking",
        "Role-based access for managers and drivers",
        "Automated reporting and compliance dashboards",
        "CI/CD pipeline with Jenkins for zero-downtime deploys",
      ],
      outcome: "Successfully rolled out to 100K+ drivers nationwide, reducing training completion time by 35% and improving knowledge retention scores.",
    },
  },
  {
    title: "AR Training App",
    description: "Augmented reality for driver training",
    icon: "FaVrCardboard",
    link: null,
    tags: ["Unity", "C#", "ARCore", "Vuforia"],
    screenshot: "/images/8.png",
    caseStudy: {
      problem: "Traditional classroom training for package car operations was time-consuming and couldn't simulate real-world scenarios effectively.",
      solution: "Developed an AR application using Unity and ARCore/Vuforia that overlays training instructions onto real vehicles, enabling hands-on learning.",
      features: [
        "Marker-based AR with Vuforia for vehicle components",
        "Step-by-step interactive training overlays",
        "Progress tracking synced with the LMS platform",
        "Offline mode for facilities without reliable WiFi",
      ],
      outcome: "Reduced hands-on training time by 25% while improving first-attempt pass rates on vehicle operation assessments by 20%.",
    },
  },
  {
    title: "Neural Network Logistics",
    description: "Observational learning for supply chain optimization",
    icon: "FaBrain",
    link: null,
    tags: ["Python", "TensorFlow", "PyTorch", "ML"],
    screenshot: "/images/9.png",
    caseStudy: {
      problem: "UPS supply chain routing relied on rule-based heuristics that couldn't adapt to changing conditions or learn from historical patterns.",
      solution: "Implemented observational learning neural networks that analyze historical routing data to suggest optimized delivery sequences.",
      features: [
        "TensorFlow and PyTorch model ensemble",
        "Historical route data preprocessing pipeline",
        "A/B testing framework for model evaluation",
        "Integration with existing logistics systems",
      ],
      outcome: "Models demonstrated 12% improvement in route efficiency during pilot testing, with potential for significant fuel cost savings at scale.",
    },
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
