import { useState, useMemo } from "preact/hooks";
import Fuse from "fuse.js";
import ArchivePostCard from "./ArchivePostCard";
import ArchiveSeriesCard from "./ArchiveSeriesCard";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  FileXCornerIcon,
} from "lucide-preact";
import Tag from "./Tag";
import { cn } from "@/lib/utils";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./Empty";

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
  tags?: string[];
}

export type PostSearchItem = {
  id: string;
  title: string;
  description: string;
  date: number;
  coverImage: OptimizedImage;
  tags?: string[];
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
  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  // Initialize Fuse.js once per mount with unified type
  const fuse = useMemo(
    () =>
      new Fuse<SearchItemUnion>(items as SearchItemUnion[], {
        keys: ["title", "description", "tags"],
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

    return [...result]
      .filter((item) =>
        selectedTag === undefined ? true : item.tags?.includes(selectedTag),
      )
      .sort((a, b) => {
        const dateA = a.date ?? 0;
        const dateB = b.date ?? 0;
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [query, sortBy, items, fuse, selectedTag]);

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

  const tags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags?.forEach((tag) => set.add(tag)));
    return set.keys().toArray();
  }, [items]);

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

      <div className="flex flex-row flex-wrap mt-4 gap-2">
        <Tag
          asChild
          className={cn("cursor-pointer transition duration-200 ease-in-out", {
            "hover:bg-border/30": !!selectedTag,
          })}
          variant={!selectedTag ? "primary" : "default"}
        >
          <button type="button" onClick={() => setSelectedTag(undefined)}>
            All {type === "post" ? "Posts" : "Series"}
          </button>
        </Tag>
        {tags.map((tag) => (
          <Tag
            key={tag}
            asChild
            className={cn(
              "cursor-pointer transition duration-200 ease-in-out",
              {
                "hover:bg-border/30": tag !== selectedTag,
              },
            )}
            variant={tag === selectedTag ? "primary" : "default"}
          >
            <button type="button" onClick={() => setSelectedTag(tag)}>
              {tag}
            </button>
          </Tag>
        ))}
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
                tags={(item as PostSearchItem).tags}
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

      {items.length === 0 && (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileTextIcon />
            </EmptyMedia>
            <EmptyTitle>
              No {type === "post" ? "posts" : "series"} are available
            </EmptyTitle>
            <EmptyDescription>
              Please check back later to see some reflections.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {items.length > 0 && filteredItems.length === 0 && (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileXCornerIcon />
            </EmptyMedia>
            <EmptyTitle>
              No matching {type === "post" ? "posts" : "series"} found.
            </EmptyTitle>
            <EmptyDescription>
              Consider changing your search filters to find what you're looking
              for.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <>
          <nav className="sm:hidden flex justify-between flex-col items-center mt-8 font-mono text-sm gap-4">
            <span className="text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <span className="flex flex-row justify-between w-full gap-4">
              <button
                onClick={() => handlePageChange(safePage - 1, "prev")}
                disabled={safePage === 1}
                className="flex flex-row items-center gap-2 px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
              >
                <ArrowLeftIcon className="size-4" />
                Previous
              </button>
              <button
                onClick={() => handlePageChange(safePage + 1, "next")}
                disabled={safePage === totalPages}
                className="flex flex-row items-center gap-2 px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
              >
                Next
                <ArrowRightIcon className="size-4" />
              </button>
            </span>
          </nav>
          <nav className="hidden sm:flex justify-between items-center mt-8 font-mono text-sm gap-4">
            <button
              onClick={() => handlePageChange(safePage - 1, "prev")}
              disabled={safePage === 1}
              className="flex flex-row items-center gap-2 px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            >
              <ArrowLeftIcon className="size-4" />
              Previous
            </button>
            <span className="text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(safePage + 1, "next")}
              disabled={safePage === totalPages}
              className="flex flex-row items-center gap-2 px-4 py-2 border border-border rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted"
            >
              Next
              <ArrowRightIcon className="size-4" />
            </button>
          </nav>
        </>
      )}
    </div>
  );
}
