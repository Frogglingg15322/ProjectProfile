export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  github?: string;
  image: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  link: string;
  docLink: string;
  category: string;
  image: string;
}

export interface ApiCategory {
  id: string;
  title: string;
  count: number;
}

export interface ApiStart {
  id: string;
  title: string;
  description: string;
  link: string;
  docLink: string;
  category: string;
  image: string;
}

