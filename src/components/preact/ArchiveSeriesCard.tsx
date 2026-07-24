import type { ImageMetadata } from "astro";
import SeriesPartBadge from "./SeriesPartBadge";
import type { OptimizedImage } from "./ArchiveSearch";

export interface ArchiveSeriesCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: OptimizedImage;
  latestPostDate?: number | string | Date;
  numPosts: number;
}

export default function ArchiveSeriesCard({
  id,
  title,
  description,
  coverImage,
  latestPostDate,
  numPosts,
}: ArchiveSeriesCardProps) {
  const formattedDate = latestPostDate
    ? new Date(latestPostDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <a
      href={`/series/${id}`}
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
        <div className="flex flex-row items-center gap-2 justify-between">
          {formattedDate ? (
            <p className="text-xs font-mono text-primary font-light uppercase">
              {formattedDate}
            </p>
          ) : (
            <p className="text-xs font-mono text-muted-foreground font-light uppercase">
              Coming Soon...
            </p>
          )}
          <SeriesPartBadge size="sm" numPosts={numPosts} />
        </div>
        <p className="font-serif text-lg text-primary">{title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
}
