import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Moon, Search, Sun } from "lucide-react";
import { FaRedhat } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PROJECTS } from "../datafile/data";
import type { ThemeMode } from "../datafile/types";
import { GitHubIcon } from "../components/icon";

export default function BrowseAll({
  theme,
  onThemeToggle,
}: {
  theme: ThemeMode;
  onThemeToggle: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const isDark = theme === "dark";

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return PROJECTS;
    }

    return PROJECTS.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <div
      className={`min-h-screen font-sans ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <nav
        className={`border-b py-3 px-4 sm:px-6 lg:px-10 backdrop-blur-md sticky top-0 z-50 ${
          isDark
            ? "border-slate-800 bg-slate-950/80"
            : "border-slate-200 bg-white/80"
        }`}
      >
        <div className="container mx-auto relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 transition-colors font-bold text-sm lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 ${
              isDark
                ? "text-slate-300 hover:text-white"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>

          <div className="flex items-center justify-between gap-3 sm:justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <button
              type="button"
              onClick={onThemeToggle}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors shrink-0 ${
                isDark
                  ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {isDark ? "Light" : "Dark"}
              </span>
            </button>
            <div
              className={`flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${
                  isDark ? "bg-white/10" : "bg-slate-900"
                }`}
              >
                <FaRedhat />
              </div>
              <span>
                Browse
                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  .all
                </span>
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:mx-auto">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-accent outline-none ${
                isDark
                  ? "bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                  : "bg-slate-50 border-slate-200"
              }`}
            />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20">
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`rounded-3xl border overflow-hidden group shadow-sm hover:shadow-xl transition-all ${
                  isDark
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="p-6">
                  <h3
                    className={`font-bold text-xl mb-2 group-hover:text-accent transition-colors ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 line-clamp-4 ${
                      isDark ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div
                    className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t ${
                      isDark ? "border-slate-800" : "border-slate-100"
                    }`}
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-colors ${
                          isDark
                            ? "text-slate-400 hover:text-white"
                            : "text-slate-400 hover:text-slate-900"
                        }`}
                      >
                        <GitHubIcon className="w-7 h-7 " />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <Search
                className={`w-12 h-12 mx-auto mb-6 ${
                  isDark ? "text-slate-700" : "text-slate-200"
                }`}
              />
              <h3
                className={`text-2xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                No results for "{searchQuery}"
              </h3>
              <p className={isDark ? "text-slate-400" : "text-slate-500"}>
                Try a different keyword or a shorter search term.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
