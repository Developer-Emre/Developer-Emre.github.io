// ─── Kişisel bilgiler ─────────────────────────────────────────────────────────
export const PERSONAL = {
  name:       'Emre Sarigul',
  role:       'Full-Stack Developer',
  location:   'İstanbul, Bakirkoy',
  email:      'emre-sarigul@outlook.com',
  github:     'https://github.com/developer-emre',
  linkedin:   'https://linkedin.com/in/emresarigul',
  siteUrl:    'https://developer-emre.github.io',
} as const;

// ─── About ───────────────────────────────────────────────────────────────────
export const ABOUT_DESCRIPTION =
  'Full-stack architect building production-ready real-time systems. Currently shipping BoltChats, a Discord-like messaging platform achieving P99 latency < 180ms with 5,000+ msg/sec throughput.' + 
  ' 4 years architecting microservices: designed 3-service FastAPI architecture (REST API, WebSocket, async workers), optimized MongoDB with cursor-based pagination, built observability stack (Prometheus/Grafana/Loki), deployed on Kubernetes with auto-scaling infrastructure. I think in distributed systems, write-behind patterns, message persistence, infrastructure reliability.' + 
  ' Building platforms that users experience instantly and systems that admins scale effortlessly.'

export const RESUME_URL = 'https://drive.google.com/uc?export=download&id=1r1TcWz-qtfed3lD9nAlZwsiKab4IV84g';

export const ABOUT_PHOTO = '/image/emre-sarigul.webp';

/** Fotoğraf yüklenemediğinde kullanılan fallback avatar URL'i üretici. */
export const avatarFallbackUrl = (size: number): string =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(PERSONAL.name)}&size=${size}&background=6366f1&color=fff`;

// ─── Yetenekler ───────────────────────────────────────────────────────────────
export interface Skill {
  name:  string;
  icon:  string;
  color: string;
}

// ─── Skills (kategorili) — TEK KAYNAK ─────────────────────────────────────────
export const SKILLS_INTRO = {
  sectionTitle:   'Skills',
  sectionHeading: 'My Technical Stack',
  sectionSubtext: 'Technologies and tools I use to craft reliable, scalable, and maintainable software.',
} as const;

export interface SkillCategory {
  id:      string;
  label:   string;
  iconKey: string;
  skills:  Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id:      'frontend',
    label:   'Frontend Development',
    iconKey: 'FaCode',
    skills: [
      { name: 'HTML',         icon: 'SiHtml5',       color: '#E34F26' },
      { name: 'CSS',          icon: 'SiCss',          color: '#1572B6' },
      { name: 'SCSS',         icon: 'SiSass',         color: '#CC6699' },
      { name: 'JavaScript',   icon: 'SiJavascript',   color: '#F7DF1E' },
      { name: 'TypeScript',   icon: 'SiTypescript',   color: '#3178C6' },
      { name: 'React.js',     icon: 'SiReact',        color: '#61DAFB' },
      { name: 'Next.js',      icon: 'SiNextdotjs',    color: '#71717A' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss',  color: '#06B6D4' },
      { name: 'Bootstrap',    icon: 'SiBootstrap',    color: '#7952B3' },
      { name: 'Material UI',  icon: 'SiMui',          color: '#007FFF' },
      { name: 'Shadcn UI',    icon: 'SiShadcnui',     color: '#71717A' },
    ],
  },
  {
    id:      'design',
    label:   'Design Tools',
    iconKey: 'FaPalette',
    skills: [
      { name: 'Figma',             icon: 'SiFigma',            color: '#F24E1E' },
      { name: 'Adobe Photoshop',   icon: 'FaImage',            color: '#31A8FF' },
      { name: 'Adobe Illustrator',  icon: 'FaDraftingCompass',  color: '#FF9A00' },
      { name: 'Canva',             icon: 'SiCanva',            color: '#00C4CC' },
    ],
  },
  {
    id:      'backend',
    label:   'Backend Development',
    iconKey: 'FaServer',
    skills: [
      { name: 'Python',         icon: 'SiPython',      color: '#3776AB' },
      { name: 'Django',         icon: 'SiDjango',      color: '#44B78B' },
      { name: 'FastAPI',        icon: 'SiFastapi',     color: '#009688' },
      { name: 'Node.js',        icon: 'SiNodedotjs',   color: '#339933' },
      { name: 'Socket.io',      icon: 'SiSocketdotio', color: '#71717A' },
      { name: 'Swagger/OpenAPI',icon: 'SiSwagger',     color: '#85EA2D' },
    ],
  },
  {
    id:      'devops',
    label:   'DevOps & Deployment',
    iconKey: 'FaTools',
    skills: [
      { name: 'AWS',          icon: 'FaAws',          color: '#FF9900' },
      { name: 'Docker',       icon: 'SiDocker',       color: '#2496ED' },
      { name: 'Grafana',      icon: 'SiGrafana',      color: '#F46800' },
      { name: 'Prometheus',   icon: 'SiPrometheus',   color: '#E6522C' },
      { name: 'Git',          icon: 'SiGit',          color: '#F05032' },
      { name: 'GitHub',       icon: 'SiGithub',       color: '#71717A' },
      { name: 'DigitalOcean', icon: 'SiDigitalocean', color: '#0080FF' },
      { name: 'Heroku',       icon: 'SiHeroku',       color: '#430098' },
      { name: 'Railway',      icon: 'SiRailway',      color: '#71717A' },
    ],
  },
  {
    id:      'database',
    label:   'Database',
    iconKey: 'FaDatabase',
    skills: [
      { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#4169E1' },
      { name: 'MongoDB',    icon: 'SiMongodb',    color: '#47A248' },
      { name: 'MySQL',      icon: 'SiMysql',      color: '#4479A1' },
      { name: 'SQLite',     icon: 'SiSqlite',     color: '#44A8D9' },
      { name: 'Firebase',   icon: 'SiFirebase',   color: '#FFCA28' },
      { name: 'Redis',      icon: 'SiRedis',      color: '#DC382D' },
    ],
  },
  {
    id:      'tools',
    label:   'Development Tools',
    iconKey: 'FaWrench',
    skills: [
      { name: 'Jira',      icon: 'SiJira',            color: '#0052CC' },
      { name: 'Bitbucket', icon: 'SiBitbucket',        color: '#0052CC' },
      { name: 'Postman',   icon: 'SiPostman',          color: '#FF6C37' },
      { name: 'Excel',     icon: 'FaFileExcel',       color: '#217346' },
      { name: 'Word',      icon: 'FaFileWord',         color: '#2B579A' },
    ],
  },
];

/** About bölümündeki skill badge listesi — Skills section'dan bağımsız. */
export const ABOUT_SKILLS: Skill[] = [
  { name: 'TypeScript',   icon: 'SiTypescript',  color: '#3178C6' },
  { name: 'React',        icon: 'SiReact',        color: '#61DAFB' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss',  color: '#06B6D4' },
  { name: 'Python',       icon: 'SiPython',       color: '#3776AB' },
  { name: 'Node.js',      icon: 'SiNodedotjs',    color: '#339933' },
  { name: 'FastAPI',      icon: 'SiFastapi',      color: '#009688' },
  { name: 'PostgreSQL',   icon: 'SiPostgresql',   color: '#4169E1' },
  { name: 'Docker',       icon: 'SiDocker',       color: '#2496ED' },
  { name: 'Git',          icon: 'SiGit',          color: '#F05032' },
];

// ─── Projeler ─────────────────────────────────────────────────────────────────
export const PROJECTS_INTRO = {
  sectionTitle:   'Projects',
  sectionHeading: 'Things I\u2019ve Built',
  sectionSubtext:  'A selection of projects that showcase my approach to clean architecture, performance, and user experience.',
} as const;

export type ProjectStatus = 'production' | 'development';

export interface Project {
  id:          number;
  title:       string;
  description: string;
  tags:        string[];
  status:      ProjectStatus;
  image?:      string;
  github?:     string;
  live?:       string;
}

export const PROJECTS: Project[] = [
  {
    id:          1,
    title:       'Joinwanna',
    description: 'Super Simple Shopping Assistant. Seamlessly manage wishlists and track all your favorite items from one place! Create Webcarts & Add Items with One Click!',
    tags:        ['React', 'TypeScript', 'Python', 'Next.js', 'PostgreSQL', 'Docker', 'Redis'],
    status:      'production',
    image:       '/image/wanna-shop.webp',
    github:      'https://github.com/Orbistanbul',
    live:        'https://app.joinwanna.com',
  },
  {
    id:          2,
    title:       'FlowTask',
    description: 'Create dedicated projects to organize your work. Manage multiple initiatives simultaneously, assign team members, set priorities, and monitor deadlines. Perfect for campaigns, product launches, or any collaborative effort.',
    tags:        ['Next.js', 'Node.js', 'PostgreSQL'],
    status:      'production',
    image:       '/image/flowtask.webp',
    github:      'https://github.com/Developer-Emre/taskflow',
    live:'https://taskflow-lilac-six.vercel.app/'
  },
  {
    id:          3,
    title:       'Weather App',
    description: 'Real-time weather forecasts for any city worldwide. 7-day outlook, wind, humidity, and more — built with Next.js 16 and TypeScript.',
    tags:        ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    status:      'production',
    image:       '/image/weather-app.webp',
    github:      'https://github.com/Developer-Emre/Weather_App',
    live:        'https://weather-app-theta-ten-38.vercel.app/',
  },
  {
    id:          4,
    title:       'Boltchats',
    description: 'Real-time chat platform built with a modern microservices architecture. Powered by FastAPI, Redis, and WebSockets for seamless communication. Features include user authentication, private messaging, and group chats. Deployed on AWS with Docker for scalability and reliability.',
    tags:        ['Next.js', 'TypeScript', 'FastAPI', 'WebSockets', 'Redis', 'AWS', 'Docker', 'Kubernetes','Prometheus', 'Grafana', 'CI/CD', 'Microservices'],
    status:      'development',
    github:      'https://github.com/Developer-Emre/boltchats',
  },
];

// ─── Navbar linkleri ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',      href: '#about',      icon: 'FaUser'      },
  { label: 'Experience', href: '#experience', icon: 'FaBriefcase' },
  { label: 'Projects',   href: '#projects',   icon: 'FaCode'      },
  { label: 'Skills',     href: '#skills',     icon: 'FaTools'     },
  { label: 'Contact',    href: '#contact',    icon: 'FaEnvelope'  },
] as const;

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE_INTRO = {
  sectionTitle:   'Experience',
  sectionHeading: 'Work History & Career',
  sectionSubtext: 'A timeline of my professional journey, the companies I have worked with, and the impact I have made along the way.',
  label:       'BACKGROUND',
  heading:     'Architecting real-time platforms \nwith enterprise-grade infrastructure.',
  description:
    'Started in operations at BtcTurk, scaling operations for 10,000+ users. ' +
    'Transitioned to building systems — now designing production microservices on Kubernetes with full observability stacks. ' +
    'Focus: real-time architectures, message persistence patterns, infrastructure reliability, and zero-downtime deployments. '
  } as const;

export const EXPERIENCE_HIGHLIGHTS = [
  '3-service microservices architecture (REST API, WebSocket, async storage worker)',
  'Redis Pub/Sub + Queue dual-pattern for real-time broadcasting and message persistence',
  'Performance: 5,000+ msg/sec throughput with P99 latency < 180ms',
  'Kubernetes deployment (EKS) with auto-scaling 3-10 pod replicas under load',
  'Full observability stack: Prometheus, Grafana, Loki, Tempo with distributed tracing',
  'Infrastructure as Code: Terraform (VPC, EKS, RDS Redis), Kustomize overlays (dev/staging/prod)',
  'CI/CD automation: GitHub Actions, Docker, ECR, automatic deployments'
] as const;

export interface Experience {
  id:      number;
  period:  string;
  role:    string;
  company: string;
  description: string;
  tech:    string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id:      1,
    period:  '2025 — 2026',
    role:    'Full Stack Developer',
    company: 'Clinichub',
    description:
      'Architected healthcare platform with Next.js landing page. Optimized CDN infrastructure and implemented caching strategies, improving Lighthouse performance. ' +
      'Integrated Strapi headless CMS. Optimized production infrastructure with Nginx reverse proxy, SSL/TLS security, automated CI/CD pipelines achieving 99.8% uptime.',
    tech: ['TypeScript', 'Next.js', 'Node.js', 'MySQL', 'Docker'],
  },
  {
    id:      2,
    period:  '2024 — 2025',
    role:    'Full Stack Developer',
    company: 'Wanna Inc.',
    description:
      'Architected distributed system with 15+ production REST APIs and microservices infrastructure. Built FastAPI web scraper microservice handling complex DOM parsing, integrated seamlessly with Django backend. ' +
      'Developed React browser extensions and Next.js applications translating. ' +
      'Figma designs into responsive UI. Designed observability layer with Redis-backed logging pipeline aggregating real-time user activity, persisted to AWS S3 via scheduled jobs. Implemented Prometheus/Grafana monitoring infrastructure for API performance tracking and system reliability.',
    tech: ['React', 'Next.js', 'Python', 'Django', 'FastAPI', 'Redis', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id:      3,
    period:  '2023 — 2023',
    role:    'Full Stack Developer',
    company: 'Neos Yazılım',
    description:
      'Designed full-stack training curriculum (25+ students). ' +
      'Built production- ready applications demonstrating architecture patterns, microservices design, and deployment best practices. ',
    tech: ['JavaScript', 'React', 'CSS', 'Python', 'Django', 'PostgreSQL'],
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────────// EmailJS kurulumu: https://www.emailjs.com
//   1. Hesap aç → Email Services → Gmail bağla → Service ID'yi kopyala
//   2. Email Templates → yeni template oluştur → Template ID'yi kopyala
//   3. Account → Public Key'i kopyala
export const EMAILJS_CONFIG = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
} as const;export const CONTACT_INTRO = {
  sectionTitle:   'Contact',
  sectionHeading: 'Get In Touch',
  sectionSubtext: "Have a project in mind or just want to say hi? My inbox is always open.",
} as const;


