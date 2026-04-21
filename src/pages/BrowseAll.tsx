import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";
import { FaRedhat } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { PROJECTS } from "../data";
import type { Project } from "../types";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.47.11-3.07 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.6.23 2.78.11 3.07.73.8 1.18 1.82 1.18 3.08 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.04.78 2.1v3.12c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function isLivePreviewableUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function getLivePreviewSrc(project: Project) {
  if (!isLivePreviewableUrl(project.link)) {
    return project.image;
  }

  return `https://image.thum.io/get/width/900/crop/675/noanimate/${encodeURIComponent(project.link)}`;
}

function ProjectPreviewImage({ project }: { project: Project }) {
  const [src, setSrc] = useState(project.image);
  const [shouldLoadPreview, setShouldLoadPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSrc(project.image);
    setShouldLoadPreview(false);
  }, [project.id, project.image]);

  useEffect(() => {
    if (!isLivePreviewableUrl(project.link)) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadPreview(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [project.id, project.link]);

  useEffect(() => {
    if (!shouldLoadPreview) {
      return;
    }

    const livePreviewSrc = getLivePreviewSrc(project);
    if (livePreviewSrc === project.image) {
      return;
    }

    let isCancelled = false;
    const liveImage = new Image();
    liveImage.referrerPolicy = "no-referrer";
    liveImage.src = livePreviewSrc;
    liveImage.onload = () => {
      if (!isCancelled) {
        setSrc(livePreviewSrc);
      }
    };
    liveImage.onerror = () => {
      if (!isCancelled) {
        setSrc(project.image);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [project.id, project.image, project.link, shouldLoadPreview]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <img
        src={src}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (src !== project.image) {
            setSrc(project.image);
          }
        }}
      />
    </div>
  );
}

export default function BrowseAll() {
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="border-b border-slate-200 py-2 px-10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>

          <div className="flex items-center justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <FaRedhat />
              </div>
              <span>
                Browse<span className="text-slate-500">.all</span>
              </span>
            </div>
          </div>

          <div className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 py-2 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
            />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-10 py-20">
        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="bg-white p-2 rounded-3xl border border-slate-200 overflow-hidden group shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-6 relative">
                  <ProjectPreviewImage project={project} />
                </div>
                <div className="px-4 pb-6">
                  <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-accent transition-colors"
                    >
                      View Project <ExternalLink className="w-4 h-4" />
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <GitHubIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <Search className="w-12 h-12 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No results for "{searchQuery}"
              </h3>
              <p className="text-slate-500">
                Try a different keyword or a shorter search term.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
