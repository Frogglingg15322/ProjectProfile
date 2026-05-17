import { useEffect, useState } from "react";
import { ExternalLink, Mail, Menu, X, Share2 } from "lucide-react";
import { FaRedhat } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Documentation from "./pages/Documentation";
import BrowseAll from "./pages/BrowseAll";
import type { Project, ApiCategory, ApiStart } from "./datafile/types";
import { PROJECTS, HOME_APIS, API_CATEGORIES } from "./datafile/data";
import { GitHubIcon, DiscordIcon } from "./components/icon";

function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 2000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden bg-white"
          >
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-8">
                <h2
                  className="text-3xl font-bold text-slate-900"
                >
                  Contact
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2 text-slate-900"
                  >
                    Message Sent!
                  </h3>
                  <p
                    className="text-lg text-slate-500"
                  >
                    I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-bold mb-2 text-slate-700"
                    >
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none bg-slate-50 border-slate-200"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold mb-2 text-slate-700"
                    >
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none bg-slate-50 border-slate-200"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-bold mb-2 text-slate-700"
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-5 py-4 border rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none bg-slate-50 border-slate-200"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <button
                    disabled={status === "sending"}
                    type="submit"
                    className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed  flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>Send Message</>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="text-red-500 text-sm font-medium text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Navbar({
  onContactClick,
}: {
  onContactClick: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-md border-b border-slate-200"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-10 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900"
        >
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
            <FaRedhat />
          </div>
          <span>
            Code<span className="text-accent">Hunter'z</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Home", "Projects", "APIs"].map((item, idx) => (
            <a
              key={item + idx}
              href={`#${item.toLowerCase()}`}
              className="transition-colors text-accent hover:text-black"
            >
              {item}
            </a>
          ))}

          <button
            onClick={onContactClick}
            className="transition-colors text-accent hover:text-black"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Toggle */}
          <button
            className="text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden shadow-xl bg-white border-t border-slate-200"
          >
            <div className="flex flex-col p-6 gap-4">
              {["Home", "Projects", "APIs"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium text-slate-500 hover:text-slate-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                className="text-left text-lg font-medium text-slate-500 hover:text-slate-900"
                onClick={() => {
                  onContactClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    // home
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      <div className="container mx-auto px-10 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1
              className="text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900"
            >
              Creative developer building <br />
              <span className="text-accent">digital solutions.</span>
            </h1>
            <p
              className="text-lg max-w-md leading-relaxed text-slate-500"
            >
              I specialize in building clean, high-performance web applications
              and robust API architectures for modern startups.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="https://github.com/Coder-Hunter-z"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub profile"
                className="inline-flex items-center justify-center rounded-full p-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <GitHubIcon className="w-10 h-10" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -12, 0],
              rotate: [0, 1.5, 0, -1.5, 0],
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: {
                duration: 4.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              rotate: {
                duration: 6.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
            className="flex justify-center relative scale-110"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <svg
              className="hidden md:block w-120 h-120 relative z-10 opacity-90 drop-shadow-2xl"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4F46E5"
                d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,87.6,-0.9C86,13.2,78.7,26.4,70.1,38.6C61.5,50.8,51.5,61.9,39.3,69.5C27.1,77.2,12.6,81.4,-1.8,84.5C-16.2,87.6,-32.4,89.6,-46.1,83.8C-59.8,78,-71.1,64.4,-78.3,49.6C-85.5,34.8,-88.7,18.8,-88.1,3.1C-87.5,-12.6,-83.1,-28,-74.3,-41.2C-65.5,-54.4,-52.3,-65.4,-38.3,-72.1C-24.3,-78.8,-9.5,-81.2,3.3,-86.9C16.1,-92.6,29.3,-92.7,44.7,-76.4Z"
                transform="translate(100 100)"
              />
              <foreignObject x="56" y="50" width="88" height="88">
                <div className="flex h-full w-full items-center justify-center">
                  <FaRedhat className="h-24 w-24 text-white drop-shadow-lg" />
                </div>
              </foreignObject>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  key?: React.Key;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow group overflow-hidden bg-white border-slate-200"
    >
      <div className="p-8">
        <h3 className="font-bold text-xl mb-3 text-slate-900">
          {project.title}
        </h3>
        <p className="text-sm mb-6 leading-relaxed text-slate-500">
          {project.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <a
            href={project.link}
            className="inline-flex items-center gap-1 text-sm font-bold hover:text-accent text-slate-900 decoration-slate-300 hover:decoration-accent"
          >
            View Project <ExternalLink className="w-4 h-4 ml-1" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-slate-900"
              title="View Source on GitHub"
            >
              <GitHubIcon className="w-7 h-7 " />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface ToolCardProps {
  apiStart: ApiStart;
  index: number;
  key?: string | number;
}

function ToolCard({ apiStart }: ToolCardProps) {
  return (
    <motion.a
      href={apiStart.link}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="px-5 py-4 rounded-xl flex items-center gap-4 border shadow-sm group hover:shadow-md bg-white border-slate-100"
    >
      <div className="p-2.5 filter brightness-100">
        <img src={apiStart.image} className="w-8 h-8 object-contain" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-base mb-0.5">{apiStart.title}</h4>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {apiStart.category}
        </p>
      </div>
    </motion.a>
  );
}

interface CategoryCardProps {
  category: ApiCategory;
  index: number;
  key?: React.Key;
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border shadow-sm hover:shadow-md group cursor-pointer bg-white border-slate-100"
    >
      <Link to="/docs" className="block">
        <h4
          className="text-base font-bold mb-1 group-hover:text-accent text-slate-700"
        >
          {category.title}
        </h4>
        <p className="text-sm font-bold text-accent ">{category.count} APIs</p>
      </Link>
    </motion.div>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      id="contact"
      className="px-10 py-10 text-sm bg-white text-slate-500"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-12 text-center md:text-left">
          {/* <div>
              <p className="text-white font-semibold mb-2">Contact</p>
              <p className="hover:text-white  cursor-pointer">
                hello@portfolio.io
              </p>
            </div> */}
          <div>
            <p className="font-semibold mb-2 text-slate-900">
              Location
            </p>
            <p>Philippines, Lanao Del Norte</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-6">
            <a
              href=""
              className="p-2 rounded-full hover:bg-slate-100 hover:text-slate-900"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-slate-100 hover:text-slate-900"
            >
              <DiscordIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full hover:bg-slate-100 hover:text-slate-900"
            >
              <Share2 className="w-5 h-5" />
            </a>
          </div>
          <div className="hidden md:block h-8 w-px bg-slate-200"></div>
          <p>© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <main className="space-y-12">
        <Hero />

        {/* Projects Section */}
        <section id="projects" className="px-10 min-h-screen flex  py-20">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                Selected Projects
              </h2>
              <Link
                to="/browse"
                className="text-sm text-accent font-bold cursor-pointer hover:text-indigo-900"
              >
                Browse All &rarr;
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.slice(0, 6).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* API Section */}
        <section
          id="apis"
          className="px-10 min-h-screen flex py-20 border-y bg-white border-slate-200"
        >
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-800">
                APIs
              </h2>
              <Link
                to="/docs"
                className="text-sm text-accent font-bold cursor-pointer hover:text-indigo-900 "
              >
                Browse APIs &rarr;
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* TO START */}
              <div
                className="rounded-3xl p-8 md:p-10 border bg-slate-100/50 border-slate-200/60"
              >
                <div className="mb-8">
                  <span
                    className="px-4 py-1.5 text-accent text-[12px] font-black uppercase tracking-widest rounded-md border shadow-sm bg-white border-slate-200/50"
                  >
                    Sort by Essentials
                  </span>
                  <p className="text-sm max-w-md p-4">
                    Get an API key and strengthen your business with essential
                    developer APIs. Explore our curated API marketplace
                    featuring top-rated tools for communication, data
                    management, and more. Find powerful solutions to simplify
                    operations, improve efficiency, and support business growth.
                  </p>
                </div>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 text-accent">
                  {HOME_APIS.map((apiStart, index) => (
                    <ToolCard
                      key={apiStart.id}
                      apiStart={apiStart}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* BY CATEGORY */}
              <div
                className="rounded-3xl p-8 md:p-10 border bg-slate-100/50 border-slate-200/60"
              >
                <div className="mb-8">
                  <span
                    className="px-4 py-1.5 text-accent text-[12px] font-black uppercase tracking-widest rounded-md border shadow-sm bg-white border-slate-200/50"
                  >
                    Sort by Speciality
                  </span>
                  <p className="text-sm max-w-md p-4">
                    Enhance your business operations with the right API. Browse
                    our organized collection of API solutions designed to
                    improve efficiency, productivity, and overall performance.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {API_CATEGORIES.map((cat, index) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section
          className="px-10 py-32 text-center relative overflow-hidden bg-slate-50"
        >
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-slate-900">
              Let's build something <br /> awesome together.
            </h2>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-accent text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-indigo-700  "
            >
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/browse" element={<BrowseAll />} />
      </Routes>
    </BrowserRouter>
  );
}
