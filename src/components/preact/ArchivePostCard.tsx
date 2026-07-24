import { TagsIcon } from "lucide-preact";
import type { OptimizedImage } from "./ArchiveSearch";
import Tag from "./Tag";

export interface ArchivePostCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: OptimizedImage;
  pubDate: number | string | Date;
  tags?: string[];
}

export default function ArchivePostCard({
  id,
  title,
  description,
  coverImage,
  pubDate,
  tags = [],
}: ArchivePostCardProps) {
  const dateObj = new Date(pubDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={`/posts/${id}`}
      className="border border-border p-4 flex flex-col sm:flex-row gap-4 rounded-sm hover:bg-border/30 transition duration-200 ease-in-out hover:shadow-md"
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
        <div className="flex flex-row justify-between items-center gap-2">
          <p className="text-xs font-mono text-primary font-light uppercase">
            {formattedDate}
          </p>
          <span className="flex flex-row gap-2">
            {tags.length > 0 && (
              <Tag>
                <TagsIcon class="size-3" />
                {tags.length}
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
