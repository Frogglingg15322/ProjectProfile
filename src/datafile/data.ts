import {
  Globe,
  Share2,
  Coins,
  Box,
  MapPin,
  Activity,
  Search,
  Cpu,
} from "lucide-react";
import { type Project, type Tool, type ApiCategory } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "PTMovies",
    description:
      "A movie recommendation web application built with React, JavaScript, and Tailwind CSS. It fetches data from the TMDB API to provide users with movie details, recommendations, and a seamless browsing experience.",
    link: "https://ptmovies.vercel.app/",
    github: "https://github.com/Coder-Hunter-z/Movies",
    image: "src/assets/ptmovies.png",
  },
];

export const HOME_APIS: Tool[] = [
  {
    id: "t1",
    title: "Fixer",
    category: "Finance",
    description: "Foreign exchange rates and currency conversion JSON API.",
    link: "https://fixer.io/?utm_source=APILayerHomepage&utm_medium=Referral",
    docLink: "https://fixer.io/documentation",
    icon: Coins,
  },
  {
    id: "t2",
    title: "Mediastack",
    category: "Marketing",
    description: "Real-time, Intraday & Historical Market Data API.",
    link: "https://mediastack.com/",
    docLink: "https://mediastack.com/documentation",
    icon: Share2,
  },
  {
    id: "t3",
    title: "IPapi",
    category: "Geolocation",
    description:
      "Lookup IP address location and geolocation information accurately.",
    link: "https://ipapi.co/",
    docLink: "https://ipapi.co/documentation",
    icon: Globe,
  },
  {
    id: "t4",
    title: "Currencylayer",
    category: "Finance",
    description:
      "Reliable Exchange Rates & Currency Conversion for your Business.",
    link: "https://currencylayer.com/",
    docLink: "https://currencylayer.com/documentation",
    icon: Box,
  },
  {
    id: "t5",
    title: "Positionstack",
    category: "Geolocation",
    description: "Forward and reverse batch geocoding for any global address.",
    link: "https://positionstack.com/",
    docLink: "https://positionstack.com/documentation",
    icon: MapPin,
  },
  {
    id: "t6",
    title: "Numverify",
    category: "Marketing",
    description: "Global Phone Number Validation & Lookup JSON API.",
    link: "https://numverify.com/",
    docLink: "https://numverify.com/documentation",
    icon: Activity,
  },
  {
    id: "t7",
    title: "Serpstack",
    category: "Dev Tools",
    description: "Real-time Search Engine Result Page (SERP) Scraper API.",
    link: "https://serpstack.com/",
    docLink: "https://serpstack.com/documentation",
    icon: Search,
  },
  {
    id: "t8",
    title: "IPstack",
    category: "Geolocation",
    description: "Locate and Identify Website Visitors by IP Address.",
    link: "https://ipstack.com/",
    docLink: "https://ipstack.com/documentation",
    icon: MapPin,
  },
  {
    id: "t9",
    title: "Userstack",
    category: "Marketing",
    description:
      "Analyze browser user-agent strings for device and OS detection.",
    link: "https://userstack.com/",
    docLink: "https://userstack.com/documentation",
    icon: Cpu,
  },
];

export const TOOLS = [...HOME_APIS];

export const API_CATEGORIES: ApiCategory[] = [
  { id: "c1", title: "Dev Tools", count: 10 },
  { id: "c2", title: "Marketing", count: 13 },
  { id: "c3", title: "Finance", count: 10 },
  { id: "c4", title: "Geolocation", count: 10 },
  { id: "c5", title: "Scraping", count: 11 },
  { id: "c6", title: "Security", count: 10 },
  { id: "c7", title: "Business", count: 8 },
  { id: "c8", title: "Communication", count: 7 },
  { id: "c9", title: "AI/ML", count: 4 },
];
