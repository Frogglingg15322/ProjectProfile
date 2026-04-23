import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  ArrowRight,
  Grid,
  List as ListIcon,
  Moon,
  Sun,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaRedhat } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DOCS_APIS } from "../datafile/apidocs";
import type { ThemeMode } from "../datafile/types";

export default function Documentation({
  theme,
  onThemeToggle,
}: {
  theme: ThemeMode;
  onThemeToggle: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const isDark = theme === "dark";

  const categories = useMemo(() => {
    const cats = Array.from(new Set(DOCS_APIS.map((t) => t.category)));
    return cats
      .map((cat) => ({
        name: cat,
        count: DOCS_APIS.filter((t) => t.category === cat).length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredTools = useMemo(() => {
    return DOCS_APIS.filter((tool) => {
      const matchesSearch = tool.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(tool.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div
      className={`min-h-screen font-sans ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* Search Header */}
      <div
        className={`border-b sticky top-0 z-50 ${
          isDark ? "border-slate-800 bg-slate-950" : "border-slate-100 bg-white"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <Link
              to="/"
              className={`inline-flex items-center gap-2 hover:text-accent transition-colors font-bold text-sm ${
                isDark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>

            <div
              className={`flex items-center gap-2 font-bold text-lg tracking-tight ${
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
                API
                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  .all
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={onThemeToggle}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className={`inline-flex items-center justify-center rounded-full border p-2 font-semibold transition-colors shrink-0 ${
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
            </button>
          </div>

          <div className="hidden lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto_auto] lg:items-center lg:gap-6">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className={`inline-flex items-center gap-2 hover:text-accent transition-colors font-bold text-sm ${
                  isDark ? "text-slate-300" : "text-slate-500"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 min-w-0">
              <div className="relative w-xl max-w-4xl">
                <Search
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search APIs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 border rounded-2xl outline-none text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
                    isDark
                      ? "bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                />
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <span>View by</span>
              <div
                className={`flex rounded p-1 ${
                  isDark ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${
                    viewMode === "grid"
                      ? isDark
                        ? "bg-slate-800 shadow text-accent"
                        : "bg-white shadow text-accent"
                      : "text-slate-400"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${
                    viewMode === "list"
                      ? isDark
                        ? "bg-slate-800 shadow text-accent"
                        : "bg-white shadow text-accent"
                      : "text-slate-400"
                  }`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm justify-end">
              <button
                type="button"
                onClick={onThemeToggle}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 font-semibold transition-colors shrink-0 ${
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
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
              <div
                className={`flex items-center gap-2 font-bold text-xl tracking-tight ${
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
                  API
                  <span
                    className={isDark ? "text-slate-400" : "text-slate-500"}
                  >
                    .all
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 lg:hidden">
            <div className="relative w-full">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 sm:pr-32 py-3.5 border rounded-2xl outline-none text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-white placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              />
            </div>

            <div
              className={`flex items-center justify-between rounded-2xl px-3 py-2 text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <span className="p-2">View by</span>
              <div
                className={`flex rounded p-1 ${
                  isDark ? "bg-slate-900" : "bg-slate-100"
                }`}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${
                    viewMode === "grid"
                      ? isDark
                        ? "bg-slate-800 shadow text-accent"
                        : "bg-white shadow text-accent"
                      : "text-slate-400"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${
                    viewMode === "list"
                      ? isDark
                        ? "bg-slate-800 shadow text-accent"
                        : "bg-white shadow text-accent"
                      : "text-slate-400"
                  }`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="mb-0">
            <button
              type="button"
              onClick={() => setIsExploreOpen((current) => !current)}
              className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-lg font-bold transition-colors lg:hidden ${
                isDark
                  ? "border-slate-800 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <span>Categories</span>
              {isExploreOpen ? (
                <ChevronUp
                  className={
                    isDark ? "h-5 w-5 text-slate-400" : "h-5 w-5 text-slate-500"
                  }
                />
              ) : (
                <ChevronDown
                  className={
                    isDark ? "h-5 w-5 text-slate-400" : "h-5 w-5 text-slate-500"
                  }
                />
              )}
            </button>

            <div className="hidden lg:block">
              <h2
                className={`text-lg font-bold mb-6 flex items-center justify-between ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                Filter by Categories
              </h2>
            </div>

            <div
              className={`mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 ${
                isExploreOpen ? "grid" : "hidden"
              } lg:grid`}
            >
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className={`flex items-center group cursor-pointer rounded-xl border px-3 py-3 transition-colors ${
                    isDark
                      ? "border-slate-800 bg-slate-900/60"
                      : "border-slate-200 bg-slate-50/70"
                  }`}
                  onClick={() => toggleCategory(cat.name)}
                >
                  <div
                    className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${
                      selectedCategories.includes(cat.name)
                        ? "bg-accent border-accent"
                        : isDark
                          ? "border-slate-700 bg-slate-900 group-hover:border-accent"
                          : "border-slate-300 bg-white group-hover:border-accent"
                    }`}
                  >
                    {selectedCategories.includes(cat.name) && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span
                    className={`text-sm flex-1 ${
                      selectedCategories.includes(cat.name)
                        ? "text-accent font-medium"
                        : isDark
                          ? "text-slate-300"
                          : "text-slate-600"
                    }`}
                  >
                    {cat.name}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-accent">
              All APIs ({filteredTools.length})
            </h1>
          </div>

          <div
            className={
              viewMode === "list"
                ? isDark
                  ? "space-y-px border-t border-slate-800"
                  : "space-y-px border-t border-slate-100"
                : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            }
          >
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              if (viewMode === "list") {
                return (
                  <div
                    key={tool.id}
                    className={`group flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 py-6 sm:py-8 border-b transition-colors px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-lg ${
                      isDark
                        ? "border-slate-800 hover:bg-slate-900"
                        : "border-slate-100 hover:bg-[#F3F6FA]"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 text-accent rounded-lg flex items-center justify-center shadow-sm border flex-shrink-0 ${
                        isDark
                          ? "bg-slate-900 border-slate-800"
                          : "bg-white border-slate-100"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-1">
                        <h3
                          className={`text-sm font-bold uppercase tracking-wide w-full sm:w-64 ${
                            isDark ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {tool.title} API
                        </h3>
                      </div>
                      <p
                        className={`text-sm leading-relaxed max-w-2xl ${
                          isDark ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto">
                      <a
                        href={tool.docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full md:w-auto justify-center bg-[#3BB2F3] hover:bg-[#2da1e2] text-white px-6 py-2 rounded font-bold text-sm transition-all"
                      >
                        View API
                      </a>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={tool.id}
                    className={`p-6 rounded-2xl border hover:border-accent hover:shadow-xl transition-all group overflow-hidden ${
                      isDark
                        ? "bg-slate-900 border-slate-800"
                        : "bg-white border-slate-100"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all ${
                        isDark
                          ? "bg-slate-800 text-accent"
                          : "bg-slate-50 text-accent"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 text-accent rounded-lg flex items-center justify-center shadow-sm border flex-shrink-0 ${
                          isDark
                            ? "bg-slate-900 border-slate-800"
                            : "bg-white border-slate-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3
                      className={`text-base font-bold mb-1 uppercase tracking-wide group-hover:text-accent transition-colors ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {tool.title} API
                    </h3>
                    <p
                      className={`text-sm mb-6 leading-relaxed line-clamp-2 ${
                        isDark ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {tool.description}
                    </p>
                    <a
                      href={tool.docLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent font-bold group-hover:underline flex items-center gap-1"
                    >
                      View API <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                );
              }
            })}

            {filteredTools.length === 0 && (
              <div className="py-20 text-center">
                <Search
                  className={`w-12 h-12 mx-auto mb-6 ${
                    isDark ? "text-slate-700" : "text-slate-200"
                  }`}
                />
                <h3
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  No matching APIs found
                </h3>
                <p
                  className={`mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
