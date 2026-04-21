import {
  Coins,
  Share2,
  Globe,
  Box,
  MapPin,
  Activity,
  Search,
  Cpu,
  Tv,
} from "lucide-react";
import { LiaStripe } from "react-icons/lia";
import { type Project, type Tool, type ApiCategory } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "PTMovies",
    description:
      "React movie app using TMDB API for seamless browsing experience.",
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
    link: "#",
    docLink: "#",
    icon: Coins,
  },
  {
    id: "t2",
    title: "Mediastack",
    category: "Marketing",
    description: "Real-time, Intraday & Historical Market Data API.",
    link: "#",
    docLink: "#",
    icon: Share2,
  },
  {
    id: "t3",
    title: "IPapi",
    category: "Geolocation",
    description:
      "Lookup IP address location and geolocation information accurately.",
    link: "#",
    docLink: "#",
    icon: Globe,
  },
  {
    id: "t4",
    title: "Currencylayer",
    category: "Finance",
    description:
      "Reliable Exchange Rates & Currency Conversion for your Business.",
    link: "#",
    docLink: "#",
    icon: Box,
  },
  {
    id: "t5",
    title: "Positionstack",
    category: "Geolocation",
    description: "Forward and reverse batch geocoding for any global address.",
    link: "#",
    docLink: "#",
    icon: MapPin,
  },
  {
    id: "t6",
    title: "Numverify",
    category: "Marketing",
    description: "Global Phone Number Validation & Lookup JSON API.",
    link: "#",
    docLink: "#",
    icon: Activity,
  },
  {
    id: "t7",
    title: "Serpstack",
    category: "Dev Tools",
    description: "Real-time Search Engine Result Page (SERP) Scraper API.",
    link: "#",
    docLink: "#",
    icon: Search,
  },
  {
    id: "t8",
    title: "IPstack",
    category: "Geolocation",
    description: "Locate and Identify Website Visitors by IP Address.",
    link: "#",
    docLink: "#",
    icon: MapPin,
  },
  {
    id: "t9",
    title: "Userstack",
    category: "Marketing",
    description:
      "Analyze browser user-agent strings for device and OS detection.",
    link: "#",
    docLink: "#",
    icon: Cpu,
  },
];

export const DOCS_APIS: Tool[] = [
  {
    id: "d1",
    title: "TMDB",
    category: "Entertainment",
    description:
      "The Movie Database (TMDB) API provides access to data about movies and TV shows.",
    link: "#",
    docLink: "#",
    icon: Tv,
  },
  {
    id: "d2",
    title: "Stripe",
    category: "Finance",
    description:
      "Integrate Stripe into your application to handle payments and subscriptions.",
    link: "#",
    docLink: "#",
    icon: LiaStripe,
  },
];

// Add this for backward compatibility or if needed by other components
export const TOOLS = [...HOME_APIS, ...DOCS_APIS];

export const API_CATEGORIES: ApiCategory[] = [
  { id: "c1", title: "Dev Tools", count: 58 },
  { id: "c2", title: "Marketing", count: 27 },
  { id: "c3", title: "Finance", count: 14 },
  { id: "c4", title: "Geolocation", count: 14 },
  { id: "c5", title: "Scraping", count: 11 },
  { id: "c6", title: "Security", count: 10 },
  { id: "c7", title: "Business", count: 8 },
  { id: "c8", title: "Communication", count: 7 },
  { id: "c9", title: "AI/ML", count: 4 },
];
