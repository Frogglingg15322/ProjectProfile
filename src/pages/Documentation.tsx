import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  ArrowRight,
  Grid,
  List as ListIcon,
} from "lucide-react";
import { FaRedhat } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DOCS_APIS } from "../data";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

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
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Search Header */}
      <div className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-shrink-0 lg:w-40">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-500 hover:text-accent transition-colors font-bold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </div>

          <div className="flex flex-1 w-full max-w-3xl flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                <Search className="w-3.5 h-3.5" />
                Find
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600 lg:shrink-0">
              <span>View by</span>
              <div className="flex bg-slate-100 rounded p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white shadow text-accent" : "text-slate-400"}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded ${viewMode === "list" ? "bg-white shadow text-accent" : "text-slate-400"}`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-600 lg:w-40 lg:justify-end">
            <div className="hidden lg:flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <FaRedhat />
              </div>
              <span>
                API<span className="text-slate-500">.all</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="mb-0">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
              Filter by Categories
            </h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center group cursor-pointer"
                  onClick={() => toggleCategory(cat.name)}
                >
                  <div
                    className={`w-4 h-4 border rounded mr-3 flex items-center justify-center transition-colors ${selectedCategories.includes(cat.name) ? "bg-accent border-accent" : "border-slate-300 bg-white group-hover:border-accent"}`}
                  >
                    {selectedCategories.includes(cat.name) && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span
                    className={`text-sm flex-1 ${selectedCategories.includes(cat.name) ? "text-accent font-medium" : "text-slate-600"}`}
                  >
                    {cat.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#003B95]">
              All APIs ({filteredTools.length})
            </h1>
          </div>

          <div
            className={
              viewMode === "list"
                ? "space-y-px border-t border-slate-100"
                : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            }
          >
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              if (viewMode === "list") {
                return (
                  <div
                    key={tool.id}
                    className="group flex flex-col md:flex-row items-start md:items-center gap-6 py-8 border-b border-slate-100 hover:bg-[#F3F6FA] transition-colors px-4 -mx-4 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-white text-accent rounded-lg flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-1">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide truncate w-64">
                          {tool.title} API
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <a
                        href={tool.docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#3BB2F3] hover:bg-[#2da1e2] text-white px-6 py-2 rounded font-bold text-sm transition-all"
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
                    className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-accent hover:shadow-xl transition-all group overflow-hidden"
                  >
                    <div className="w-10 h-10 bg-slate-50 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all">
                      <div className="w-12 h-12 bg-white text-accent rounded-lg flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1 uppercase tracking-wide group-hover:text-accent transition-colors">
                      {tool.title} API
                    </h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">
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
                <Search className="w-12 h-12 text-slate-200 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-slate-900">
                  No matching APIs found
                </h3>
                <p className="text-slate-500 mt-2">
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
