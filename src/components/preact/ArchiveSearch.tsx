import { useState, useMemo } from "preact/hooks";
import Fuse from "fuse.js";
import ArchivePostCard from "./ArchivePostCard";
import ArchiveSeriesCard from "./ArchiveSeriesCard";

export interface OptimizedImage {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

export interface SeriesSearchItem {
  id: string;
  title: string;
  description: string;
  date?: number;
  coverImage: OptimizedImage;
  numPosts: number;
}

export type PostSearchItem = {
  id: string;
  title: string;
  description: string;
  date: number;
  coverImage: OptimizedImage;
};

export type ArchiveSearchProps =
  | {
      type: "post";
      items: PostSearchItem[];
      itemsPerPage?: number;
    }
  | {
      type: "series";
      items: SeriesSearchItem[];
      itemsPerPage?: number;
    };

type SearchItemUnion = PostSearchItem | SeriesSearchItem;

export default function ArchiveSearch({
  items,
  itemsPerPage = 10,
  type = "post",
}: ArchiveSearchProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize Fuse.js once per mount with unified type
  const fuse = useMemo(
    () =>
      new Fuse<SearchItemUnion>(items as SearchItemUnion[], {
        keys: ["title", "description"],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [items],
  );

  // Filter and sort items based on current search & sort state
  const filteredItems = useMemo(() => {
    let result: SearchItemUnion[] = items as SearchItemUnion[];

    if (query.trim().length > 0) {
      const searchResults = fuse.search(query.trim());
      result = searchResults.map((r) => r.item);
    }

    return [...result].sort((a, b) => {
      const dateA = a.date ?? 0;
      const dateB = b.date ?? 0;
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [query, sortBy, items, fuse]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, safePage, itemsPerPage]);

  const handlePageChange = (newPage: number, dir: "next" | "prev") => {
    if (newPage < 1 || newPage > totalPages || isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  return (
    <div>
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mt-12">
        <span className="flex flex-col grow gap-2">
          <label htmlFor="search" className="font-mono text-sm text-primary">
            Search {type === "post" ? "posts" : "series"}
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onInput={(e) => {
              setQuery((e.target as HTMLInputElement).value);
              setCurrentPage(1);
            }}
            placeholder="Search by title or keyword..."
            className="px-4 h-10 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          />
        </span>
        <span className="flex flex-col gap-2">
          <label htmlFor="sort" className="font-mono text-sm text-primary">
            Sort by
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => {
              setSortBy(
                (e.target as HTMLSelectElement).value as "newest" | "oldest",
              );
              setCurrentPage(1);
            }}
            className="px-4 h-10 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </span>
      </div>

      <div className="flex flex-row flex-wrap mt-4">
        <p className="text-xs font-mono bg-primary text-primary-foreground py-1 px-4 rounded-full">
          All {type === "post" ? "Posts" : "Series"}
        </p>
      </div>

      {/* Animated Items Container */}
      <div
        className={`flex flex-col gap-4 mt-12 transition-all duration-200 ease-out ${
          isAnimating
            ? direction === "next"
              ? "-translate-x-8 opacity-0"
              : "translate-x-8 opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        {paginatedItems.map((item) => (
          <div
            key={item.id}
            data-id={item.id}
            className="transition-all duration-200"
          >
            {type === "post" ? (
              <ArchivePostCard
                id={item.id}
                title={item.title}
                description={item.description}
                coverImage={item.coverImage}
                pubDate={(item as PostSearchItem).date}
              />
            ) : (
              <ArchiveSeriesCard
                id={item.id}
                title={item.title}
                description={item.description}
                coverImage={item.coverImage}
                latestPostDate={item.date}
                numPosts={(item as SeriesSearchItem).numPosts}
              />
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-muted-foreground font-mono text-center py-12">
          No matching {type === "post" ? "posts" : "series"} found.
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <>
          <nav className="sm:hidden flex justify-between flex-col items-center mt-8 font-mono text-sm">
            <span className="text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <span className="flex flex-row justify-between w-full">
              <button
                onClick={() => handlePageChange(safePage - 1, "prev")}
                disabled={safePage === 1}
                className="px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
              >
                ← Previous
              </button>
              <button
                onClick={() => handlePageChange(safePage + 1, "next")}
                disabled={safePage === totalPages}
                className="px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
              >
                Next →
              </button>
            </span>
          </nav>
          <nav className="hidden sm:flex justify-between items-center mt-8 font-mono text-sm">
            <button
              onClick={() => handlePageChange(safePage - 1, "prev")}
              disabled={safePage === 1}
              className="px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            >
              ← Previous
            </button>
            <span className="text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(safePage + 1, "next")}
              disabled={safePage === totalPages}
              className="px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            >
              Next →
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
