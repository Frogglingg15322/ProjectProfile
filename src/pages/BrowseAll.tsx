import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
} from "lucide-react";
import { FaRedhat } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PROJECTS } from "../datafile/data";
import { GitHubIcon } from "../components/icon";

const ITEMS_PER_PAGE = 9;

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages] as const;
}

export default function BrowseAll() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredProjects]);
  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      <nav
        className="border-b py-3 px-4 sm:px-6 lg:px-10 backdrop-blur-md sticky top-0 z-50 border-slate-200 bg-white/80"
      >
        <div className="container mx-auto relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-sm lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>

          <div className="flex items-center justify-between gap-3 sm:justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <div
              className="flex items-center gap-2 font-bold text-lg sm:text-xl tracking-tight text-slate-900"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white bg-slate-900"
              >
                <FaRedhat />
              </div>
              <span>
                Browse
                <span className="text-slate-500">.all</span>
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-md mx-auto lg:mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-2xl focus:ring-2 focus:ring-accent outline-none bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20">
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full mx-auto">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="rounded-3xl border overflow-hidden group shadow-sm hover:shadow-xl bg-white border-slate-200"
              >
                <div className="p-6">
                  <h3
                    className="font-bold text-xl mb-2 group-hover:text-accent text-slate-900"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6 line-clamp-4 text-slate-500"
                  >
                    {project.description}
                  </p>
                  <div
                    className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-100"
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold hover:text-accent transition-colors text-slate-900"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition-colors text-slate-400 hover:text-slate-900"
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
              <Search className="w-12 h-12 mx-auto mb-6 text-slate-200" />
              <h3
                className="text-2xl font-bold mb-2 text-slate-900"
              >
                No results for "{searchQuery}"
              </h3>
              <p className="text-slate-500">
                Try a different keyword or a shorter search term.
              </p>
            </div>
          )}
        </div>

        {filteredProjects.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div
              className="inline-flex flex-wrap items-center justify-center gap-2 rounded-[1.75rem] px-3 py-2 border-slate-200"
            >
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-50 border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {visiblePages.map((page, index) =>
                page === "ellipsis" ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 text-sm font-semibold tracking-[0.2em] text-slate-400"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-bold transition-all ${
                      page === currentPage
                        ? "border-accent bg-accent text-white shadow-lg shadow-accent/20"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-50 border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
