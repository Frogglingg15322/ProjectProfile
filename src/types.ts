import React from "react";

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
  icon: React.ElementType;
}

export interface ApiCategory {
  id: string;
  title: string;
  count: number;
}
