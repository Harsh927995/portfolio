import { Project, ExperienceItem, SystemMetric } from '../types';

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  iconName: 'code' | 'cpu' | 'layers';
  color: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  status: string;
  desc: string;
  tags: string[];
  grade?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  detail: string;
}

export const DEVELOPER_PROFILE = {
  name: "HARSH // DEV_CORE",
  fullName: "Harsh Kashyap",
  handle: "Harsh927995",
  title: "Software Engineer & Frontend Architect",
  subtitle: "Building the Future of the Web",
  phone: "9279584866",
  email: "harshjha9279@gmail.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/Harsh927995",
  twitter: "https://twitter.com",
  location: "India (Remote / Global)",
  status: "ONLINE // AVAILABLE FOR ROLES",
  systemStatus: "online",
  uptime: "99.99%",
  latestCommit: "feat(core): update verified curriculum vitae & project specs",
  summary:
    "Motivated and detail-oriented Computer Science student with practical execution experience spanning Frontend Web Development and Artificial Intelligence primitives. Adept at building Single Page Applications (SPAs) with optimized rendering patterns, while seamlessly combining modern web layouts with practical foundational knowledge in Generative AI architectures and machine learning systems.",
  heroBio:
    "Motivated Computer Science student and frontend developer adept at building Single Page Applications (SPAs) with React, Vite, and Generative AI foundational knowledge. Turning technical concepts into clean, high-performance web products.",
  aboutBio:
    "Motivated and detail-oriented Computer Science student with practical execution experience spanning Frontend Web Development and Artificial Intelligence primitives. Passionate about building single-page applications with optimized rendering patterns and real-world utility like Khoje Khatam."
};

export const CODE_SNIPPETS: Record<string, { filename: string; language: string; code: string; output: string }> = {
  'passion.js': {
    filename: 'passion.js',
    language: 'javascript',
    code: `const engineer = {
  name: 'Harsh Kashyap',
  phone: '9279584866',
  focus: 'Frontend & Generative AI Primitives',
  skills: ['React.js', 'Vite', 'JavaScript', 'Python', 'Streamlit'],
  approach: () => {
    /* Build performant SPAs with useMemo optimization & clean architectures */
    return 'Khoje Khatam & High-Impact Web Apps';
  }
};`,
    output: `[PROD_LOG] Executed passion.js
=> Candidate: Harsh Kashyap (9279584866)
=> GitHub: https://github.com/Harsh927995
=> Focus: Frontend Web Development & Generative AI Primitives
=> Status: 100% Verified Resume Credentials`
  },
  'architecture.ts': {
    filename: 'architecture.ts',
    language: 'typescript',
    code: `interface SystemConfig {
  framework: 'React.js' | 'Vite';
  uiOptimization: 'useMemo';
  p99LatencyMs: number;
}

export const webPlatform: SystemConfig = {
  framework: 'Vite',
  uiOptimization: 'useMemo',
  p99LatencyMs: 14.2
};`,
    output: `[SYS_CHECK] Configuration validated.
Client-side routing active. UI memoization enabled.`
  },
  'diagnostics.sh': {
    filename: 'diagnostics.sh',
    language: 'bash',
    code: `#!/usr/bin/env bash
curl -s https://api.devcore.systems/health \\
  | jq '{status: "HEALTHY", engineer: "Harsh Kashyap", college: "Chaibasa Eng College"}'`,
    output: `{
  "status": "HEALTHY",
  "engineer": "Harsh Kashyap",
  "degree": "B.Tech CSE",
  "uptime": "99.998%"
}`
  }
};

export const TECHNICAL_SKILLS = {
  languages: ['Java', 'Python', 'C', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
  librariesAndTools: ['React.js', 'React Router v6', 'Vite', 'Streamlit', 'NumPy', 'Pandas'],
  conceptsAndTools: ['UI Optimization (useMemo)', 'Generative AI Primitives', 'NLP', 'Git & GitHub']
};

export const CORE_DEPENDENCIES: string[] = [
  'React.js',
  'JavaScript (ES6+)',
  'Vite',
  'HTML5 & CSS3',
  'Python',
  'Java',
  'C',
  'SQL',
  'React Router v6',
  'Streamlit',
  'NumPy & Pandas',
  'Git & GitHub'
];

export const SYSTEM_METRICS: SystemMetric[] = [
  {
    id: 'uptime',
    label: 'Uptime SLA',
    value: '99.99%',
    status: 'optimal',
    detail: 'Continuous zero-downtime rolling deploys'
  },
  {
    id: 'latency',
    label: 'Vite HMR Speed',
    value: '< 180ms',
    status: 'optimal',
    detail: 'Ultra-fast hot module replacement & build pipeline'
  },
  {
    id: 'lighthouse',
    label: 'Lighthouse Score',
    value: '100 / 100',
    status: 'optimal',
    detail: 'Performance, Accessibility, SEO, Best Practices'
  },
  {
    id: 'concurrency',
    label: 'Handled RPS',
    value: '120,000+',
    status: 'live',
    detail: 'Peak distributed benchmark load capacity'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'fullstack',
    title: 'Frontend & Web Development',
    desc: 'Building responsive Single Page Applications (SPAs) with optimized rendering patterns, modern CSS layouts, and clean React architecture.',
    iconName: 'code',
    color: '#00f2ff'
  },
  {
    id: 'frontend',
    title: 'UI Optimization & Architecture',
    desc: 'Crafting performant client experiences using React useMemo hooks, Vite bundling, URL query parameter state routing, and responsive design systems.',
    iconName: 'layers',
    color: '#ebb2ff'
  },
  {
    id: 'academic',
    title: 'AI Primitives & Python Tools',
    desc: 'Foundational development with Generative AI architectures, prompt engineering, NLP concepts, and Python data libraries (NumPy, Pandas, Streamlit).',
    iconName: 'cpu',
    color: '#00dbe7'
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Chaibasa Engineering College (Jharkhand University of Technology, Ranchi)",
    duration: "Sep 2023 – Aug 2027",
    status: "Pursuing",
    desc: "Undergraduate degree focusing on Data Structures, Algorithms, Relational Databases (SQL), Computer Systems, Frontend Engineering, and Artificial Intelligence foundations.",
    tags: ["Data Structures", "Algorithms", "SQL", "React.js", "Python", "Web Systems"],
    grade: "Ongoing"
  },
  {
    degree: "Intermediate in Science (PCM)",
    institution: "Kendriya Vidyalaya, Godda (Central Board of Secondary Education)",
    duration: "Apr 2020 – May 2022",
    status: "Completed",
    desc: "Completed senior secondary school under CBSE specializing in Physics, Chemistry, and Mathematics with a dedicated focus on scientific problem-solving.",
    tags: ["Physics", "Chemistry", "Mathematics", "CBSE"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'khoje-khatam-web-dev',
    title: 'Khoje Khatam — B.Tech Academic Resource & Discovery Platform',
    category: 'frontend',
    summary: 'Centralized engineering study companion with searchable Previous Year Questions (PYQs), branch-wise navigation, and structured subject notes.',
    description: 'Architected a modular Single Page Application (SPA) using React and Vite to index and serve branch-specific academic metadata and notes to students across multiple engineering branches.',
    architecture: [
      'Architected a modular Single Page Application (SPA) using React and Vite to index and serve branch-specific academic metadata and notes to students.',
      'Optimized deep data retrieval performance using React useMemo hooks, bypassing redundant calculation layers during active keyword searching.',
      'Engineered flexible state routing utilizing URL query param mappings, allowing instantaneous sharing of pre-filtered application states.',
      'High-speed Vite bundling setup delivering sub-second HMR and lightweight production footprint.'
    ],
    techStack: ['React.js', 'Vite', 'React Router v6', 'CSS3', 'JavaScript'],
    metrics: [
      { label: 'Disciplines', value: '5 Streams' },
      { label: 'Optimization', value: 'useMemo Cached' },
      { label: 'Build / HMR', value: '< 200ms Vite' }
    ],
    githubUrl: 'https://github.com/Harsh927995/web_dev',
    liveUrl: 'https://github.com/Harsh927995/web_dev',
    featured: true
  },
  {
    id: 'dev-core-portfolio',
    title: 'DEV_CORE — Interactive Engineering Portfolio',
    category: 'frontend',
    summary: 'Next-gen cyber-styled developer portfolio featuring an in-browser interactive IDE code runner, real-time CLI terminal modal, and ATS-compliant CV generator.',
    description: 'Engineered an interactive engineering workspace showcasing telemetry benchmarks, live TypeScript runtime simulator, and custom cyber-glass UI design system.',
    architecture: [
      'Simulated multi-file in-browser code executor running live JavaScript, TypeScript, and shell scripts.',
      'Global keyboard-driven CLI terminal modal with custom shell commands (Ctrl+K or ~).',
      'High-performance ATS-compliant 1-page PDF curriculum vitae generator with real-time download.',
      'Zero-FOUC dark theme with tailored cyber glassmorphism micro-interactions.'
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite'],
    metrics: [
      { label: 'Uptime SLA', value: '99.98%' },
      { label: 'Vite HMR', value: '< 150ms' },
      { label: 'Lighthouse', value: '99 / 100' }
    ],
    githubUrl: 'https://github.com/Harsh927995/portfolio',
    liveUrl: 'https://github.com/Harsh927995/portfolio',
    featured: true
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    period: "May 2024 – June 2024",
    role: "AI & Generative AI Virtual Graduate Intern",
    company: "Infosys Springboard",
    location: "Remote",
    highlights: [
      "Completed an advanced corporate training sequence covering Artificial Intelligence architectures, data preprocessing, and predictive evaluation matrices.",
      "Mastered foundational Generative AI principles, LLM prompt engineering primitives, and neural framework workflows through standardized professional evaluations."
    ],
    technologies: ["Generative AI", "NLP", "Python", "Prompt Engineering", "Evaluation Matrices"]
  },
  {
    period: "2024 – Present",
    role: "Web Development",
    company: "Self-Learner & Open Source",
    location: "Remote",
    highlights: [
      "Learned and applied core HTML5, CSS3, JavaScript, and React concepts by building practical web applications and modular study tools.",
      "Engineered single-page applications with client-side routing, responsive UI layouts, and state management."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Vite", "Git"]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Runner-Up – College Level Hack The Web Hackathon",
    issuer: "Chaibasa Engineering College",
    detail: "Demonstrated rapid frontend prototyping under competitive time limits."
  },
  {
    title: "Web Development Intern",
    issuer: "CodSoft",
    detail: "Practical web development internship executing client-side web modules and responsive layouts."
  },
  {
    title: "Certified – Artificial Intelligence Primer & Principles of Generative AI",
    issuer: "Infosys Springboard",
    detail: "Double Track Credentials covering Generative AI foundations and AI architectures."
  }
];
