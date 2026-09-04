export interface Project {
  id: string;
  title: string;
  category: 'cloud' | 'fullstack' | 'frontend' | 'microservices';
  summary: string;
  description: string;
  architecture: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface SystemMetric {
  id: string;
  label: string;
  value: string;
  status: 'optimal' | 'live' | 'stable';
  detail: string;
}

export interface TerminalOutputLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}
