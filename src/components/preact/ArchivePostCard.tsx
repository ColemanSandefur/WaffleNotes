import { PlusIcon, TagsIcon } from "lucide-preact";
import type { OptimizedImage } from "./ArchiveSearch";
import Tag from "./Tag";
import { cn } from "@/lib/utils";

export interface ArchivePostCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: OptimizedImage;
  pubDate: number | string | Date;
  tags?: string[];
  className?: string;
}

export default function ArchivePostCard({
  id,
  title,
  description,
  coverImage,
  pubDate,
  tags = [],
  className,
}: ArchivePostCardProps) {
  const dateObj = new Date(pubDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Define how many tags to display before hiding the rest
  const MAX_VISIBLE_TAGS = 1;
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <a
      href={`/posts/${id}`}
      className={cn("border border-border p-4 flex flex-col sm:flex-row gap-4 rounded-sm hover:bg-border/30 transition duration-200 ease-in-out hover:shadow-md bg-background", className)}
    >
      <div className="flex sm:h-26 aspect-video overflow-hidden rounded-md">
        <img
          src={coverImage.src}
          srcSet={coverImage.srcSet}
          alt={title}
          width={coverImage.width}
          height={coverImage.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 grow flex-1">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <p className="text-xs font-mono text-primary font-light uppercase">
            {formattedDate}
          </p>
          <span className="flex flex-row items-center gap-2">
            {/* Render visible tags */}
            {visibleTags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}

            {/* Conditionally render the +X badge only if there are hidden tags */}
            {hiddenCount > 0 && (
              <Tag>
                <span className="flex flex-row items-center gap-1">
                  <PlusIcon class="size-3" />
                  {hiddenCount}
                </span>
              </Tag>
            )}
          </span>
        </div>
        <p className="font-serif text-lg text-primary">{title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
}
