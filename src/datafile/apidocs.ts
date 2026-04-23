import {
  TMDBIcon,
  SpotifyIcon,
  YouTubeIcon,
  StripeIcon,
  PlaidIcon,
  CoinGeckoIcon,
  GitHubIcon,
  DiscordIcon,
  CloudinaryIcon,
  GoogleMapsIcon,
  OpenWeatherIcon,
  ScraperAPIIcon,
  BrowserlessIcon,
  Auth0Icon,
  HIBPIcon,
  AirtableIcon,
  NotionIcon,
  FacebookIcon,
  TwilioIcon,
  SendGridIcon,
  MailchimpIcon,
  OpenAIIcon,
  HuggingFaceIcon,
  GoogleVisionIcon,
  NewsAPIIcon,
  BitlyIcon,
} from "../components/icon";
import type { Tool } from "./types";

export const DOCS_APIS: Tool[] = [
  //Entertainment
  {
    id: "d1",
    title: "TMDB",
    category: "Entertainment",
    description:
      "The Movie Database (TMDB) API provides access to data about movies and TV shows.",
    link: "https://www.themoviedb.org/",
    docLink: "https://developers.themoviedb.org/3/getting-started/introduction",
    icon: TMDBIcon,
  },
  {
    id: "d2",
    title: "Spotify",
    category: "Entertainment",
    description:
      "Access Spotify's full music catalog, manage playlists, and get personalized recommendations.",
    link: "https://spotify.com/",
    docLink: "https://developer.spotify.com/documentation/web-api/",
    icon: SpotifyIcon,
  },
  {
    id: "d3",
    title: "YouTube Data",
    category: "Entertainment",
    description:
      "Embed YouTube functionality — search videos, manage channels, and retrieve statistics.",
    link: "https://developers.google.com/youtube",
    docLink: "https://developers.google.com/youtube/v3/docs",
    icon: YouTubeIcon,
  },

  //Finance
  {
    id: "d4",
    title: "Stripe",
    category: "Finance",
    description:
      "Integrate Stripe into your application to handle payments, subscriptions, and invoicing.",
    link: "https://stripe.com/",
    docLink: "https://docs.stripe.com/api",
    icon: StripeIcon,
  },
  {
    id: "d5",
    title: "Plaid",
    category: "Finance",
    description:
      "Open-banking platform that connects your app to thousands of banks for transactions.",
    link: "https://plaid.com/",
    docLink: "https://plaid.com/docs/",
    icon: PlaidIcon,
  },
  {
    id: "d6",
    title: "CoinGecko",
    category: "Finance",
    description:
      "Comprehensive cryptocurrency data API — prices, market caps, and historical data.",
    link: "https://www.coingecko.com/",
    docLink: "https://www.coingecko.com/api/documentation",
    icon: CoinGeckoIcon,
  },

  //Dev Tools
  {
    id: "d7",
    title: "GitHub",
    category: "Dev Tools",
    description:
      "Automate workflows, manage repositories, and interact with GitHub's ecosystem.",
    link: "https://github.com/",
    docLink: "https://docs.github.com/en/rest",
    icon: GitHubIcon,
  },
  {
    id: "d8",
    title: "Discord",
    category: "Dev Tools",
    description:
      "Build Discord bots and apps — send messages, manage servers, and handle events.",
    link: "https://discord.com/developers",
    docLink: "https://discord.com/developers/docs/intro",
    icon: DiscordIcon,
  },
  {
    id: "d9",
    title: "Cloudinary",
    category: "Dev Tools",
    description:
      "Upload, store, transform, and deliver images and videos via a powerful media API.",
    link: "https://cloudinary.com/",
    docLink: "https://cloudinary.com/documentation",
    icon: CloudinaryIcon,
  },

  // Geolocation
  {
    id: "d10",
    title: "Google Maps",
    category: "Geolocation",
    description:
      "Embed interactive maps, geocoding, routing, and places search into your application.",
    link: "https://maps.google.com/",
    docLink: "https://developers.google.com/maps",
    icon: GoogleMapsIcon,
  },
  {
    id: "d11",
    title: "OpenWeatherMap",
    category: "Geolocation",
    description:
      "Real-time weather conditions and 7-day forecasts for any location worldwide.",
    link: "https://openweathermap.org/",
    docLink: "https://openweathermap.org/api",
    icon: OpenWeatherIcon,
  },

  //Scraping
  {
    id: "d12",
    title: "ScraperAPI",
    category: "Scraping",
    description:
      "Handle proxies and CAPTCHAs automatically to scrape any web page easily.",
    link: "https://www.scraperapi.com/",
    docLink: "https://www.scraperapi.com/documentation/",
    icon: ScraperAPIIcon,
  },
  {
    id: "d13",
    title: "Browserless",
    category: "Scraping",
    description:
      "Run headless Chrome in the cloud for web scraping and automated testing.",
    link: "https://www.browserless.io/",
    docLink: "https://docs.browserless.io/",
    icon: BrowserlessIcon,
  },

  //Security
  {
    id: "d14",
    title: "Auth0",
    category: "Security",
    description:
      "Add authentication and authorization with social login, MFA, and SSO support.",
    link: "https://auth0.com/",
    docLink: "https://auth0.com/docs/api",
    icon: Auth0Icon,
  },
  {
    id: "d15",
    title: "HaveIBeenPwned",
    category: "Security",
    description:
      "Check whether email addresses or passwords have been exposed in data breaches.",
    link: "https://haveibeenpwned.com/",
    docLink: "https://haveibeenpwned.com/API/v3",
    icon: HIBPIcon,
  },

  //Business
  {
    id: "d16",
    title: "Airtable",
    category: "Business",
    description:
      "Read, create, and update records in Airtable bases for flexible workflows.",
    link: "https://airtable.com/",
    docLink: "https://airtable.com/developers/web/api/introduction",
    icon: AirtableIcon,
  },
  {
    id: "d17",
    title: "Notion",
    category: "Business",
    description:
      "Integrate with Notion workspaces to manage pages and databases programmatically.",
    link: "https://www.notion.so/",
    docLink: "https://developers.notion.com/",
    icon: NotionIcon,
  },
  {
    id: "d18",
    title: "Facebook Graph",
    category: "Business",
    description:
      "Access Facebook pages, user data, ads, and insights for social integrations.",
    link: "https://developers.facebook.com/",
    docLink: "https://developers.facebook.com/docs/graph-api",
    icon: FacebookIcon,
  },

  //Communication
  {
    id: "d19",
    title: "Twilio",
    category: "Communication",
    description:
      "Send and receive SMS, voice calls, and WhatsApp messages via cloud API.",
    link: "https://www.twilio.com/",
    docLink: "https://www.twilio.com/docs/usage/api",
    icon: TwilioIcon,
  },
  {
    id: "d20",
    title: "SendGrid",
    category: "Communication",
    description:
      "Deliver transactional and marketing emails at scale with real-time analytics.",
    link: "https://sendgrid.com/",
    docLink: "https://docs.sendgrid.com/api-reference",
    icon: SendGridIcon,
  },
  {
    id: "d21",
    title: "Mailchimp",
    category: "Communication",
    description:
      "Manage email campaigns, subscriber lists, and automations for marketing.",
    link: "https://mailchimp.com/",
    docLink: "https://mailchimp.com/developer/marketing/api/",
    icon: MailchimpIcon,
  },

  //AI/ML
  {
    id: "d22",
    title: "OpenAI",
    category: "AI/ML",
    description:
      "Access GPT-4, DALL·E, and Whisper for language and image generation.",
    link: "https://openai.com/",
    docLink: "https://platform.openai.com/docs/api-reference",
    icon: OpenAIIcon,
  },
  {
    id: "d23",
    title: "Hugging Face",
    category: "AI/ML",
    description:
      "Run thousands of open-source NLP, vision, and audio models via Inference API.",
    link: "https://huggingface.co/",
    docLink: "https://huggingface.co/docs/api-inference",
    icon: HuggingFaceIcon,
  },
  {
    id: "d24",
    title: "Google Vision",
    category: "AI/ML",
    description:
      "Detect faces, labels, and text in images using Google's pre-trained ML models.",
    link: "https://cloud.google.com/vision",
    docLink: "https://cloud.google.com/vision/docs/reference/rest",
    icon: GoogleVisionIcon,
  },

  //Marketing
  {
    id: "d25",
    title: "NewsAPI",
    category: "Marketing",
    description:
      "Aggregate live headlines and articles from over 80,000 news sources.",
    link: "https://newsapi.org/",
    docLink: "https://newsapi.org/docs",
    icon: NewsAPIIcon,
  },
  {
    id: "d26",
    title: "Bit.ly",
    category: "Marketing",
    description:
      "Shorten URLs, create branded links, and retrieve campaign analytics.",
    link: "https://bitly.com/",
    docLink: "https://dev.bitly.com/",
    icon: BitlyIcon,
  },
];
