import { type Project, type ApiCategory, type ApiStart } from "./types";

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

export const HOME_APIS: ApiStart[] = [
  {
    id: "t1",
    title: "Fixer",
    category: "Finance",
    description: "Foreign exchange rates and currency conversion JSON API.",
    link: "https://fixer.io/?utm_source=APILayerHomepage&utm_medium=Referral",
    docLink: "https://fixer.io/documentation",
    image: "src/img/api_home/fixer.svg",
  },
  {
    id: "t2",
    title: "Mediastack",
    category: "Marketing",
    description: "Real-time, Intraday & Historical Market Data API.",
    link: "https://mediastack.com/",
    docLink: "https://mediastack.com/documentation",
    image: "src/img/api_home/mediastack.svg",
  },
  {
    id: "t3",
    title: "IPapi",
    category: "Geolocation",
    description:
      "Lookup IP address location and geolocation information accurately.",
    link: "https://ipapi.co/",
    docLink: "https://ipapi.co/documentation",
    image: "src/img/api_home/ipapi.svg",
  },
  {
    id: "t4",
    title: "Currencylayer",
    category: "Finance",
    description:
      "Reliable Exchange Rates & Currency Conversion for your Business.",
    link: "https://currencylayer.com/",
    docLink: "https://currencylayer.com/documentation",
    image: "src/img/api_home/currency_data.svg",
  },
  {
    id: "t5",
    title: "Positionstack",
    category: "Geolocation",
    description: "Forward and reverse batch geocoding for any global address.",
    link: "https://positionstack.com/",
    docLink: "https://positionstack.com/documentation",
    image: "src/img/api_home/positionstack.svg",
  },
  {
    id: "t6",
    title: "Numverify",
    category: "Marketing",
    description: "Global Phone Number Validation & Lookup JSON API.",
    link: "https://numverify.com/",
    docLink: "https://numverify.com/documentation",
    image: "src/img/api_home/numverify.svg",
  },
  {
    id: "t7",
    title: "Serpstack",
    category: "Dev Tools",
    description: "Real-time Search Engine Result Page (SERP) Scraper API.",
    link: "https://serpstack.com/",
    docLink: "https://serpstack.com/documentation",
    image: "src/img/api_home/serpstack.svg",
  },
  {
    id: "t8",
    title: "IPstack",
    category: "Geolocation",
    description: "Locate and Identify Website Visitors by IP Address.",
    link: "https://ipstack.com/",
    docLink: "https://ipstack.com/documentation",
    image: "src/img/api_home/ipstack.svg",
  },
  {
    id: "t9",
    title: "Userstack",
    category: "Marketing",
    description:
      "Analyze browser user-agent strings for device and OS detection.",
    link: "https://userstack.com/",
    docLink: "https://userstack.com/documentation",
    image: "src/img/api_home/userstack.svg",
  },
];

export const API_STARTS = [...HOME_APIS];

export const API_CATEGORIES: ApiCategory[] = [
  { id: "c1", title: "Dev Tools", count: 3 },
  { id: "c2", title: "Marketing", count: 2 },
  { id: "c3", title: "Finance", count: 3 },
  { id: "c4", title: "Geolocation", count: 2 },
  { id: "c5", title: "Scraping", count: 2 },
  { id: "c6", title: "Security", count: 2 },
  { id: "c7", title: "Business", count: 3 },
  { id: "c8", title: "Communication", count: 3 },
  { id: "c9", title: "AI/ML", count: 3 },
];
