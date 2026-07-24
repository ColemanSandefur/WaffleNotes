import type { ImageMetadata } from "astro";
import type { OptimizedImage } from "./ArchiveSearch";

export interface ArchivePostCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: OptimizedImage;
  pubDate: number | string | Date;
}

export default function ArchivePostCard({
  id,
  title,
  description,
  coverImage,
  pubDate,
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
        <p className="text-xs font-mono text-primary font-light uppercase">
          {formattedDate}
        </p>
        <p className="font-serif text-lg text-primary">{title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
}
