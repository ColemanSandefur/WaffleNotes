import { BookOpenTextIcon } from "lucide-preact";
import Tag from "./Tag";

export interface SeriesPartBadgeProps {
  numPosts: number;
  size: "sm" | "md";
  className?: string;
}

export default function SeriesPartBadge({ numPosts, size, className }: SeriesPartBadgeProps) {
  return numPosts > 0 ? (
    <Tag variant="primary" size={size} className={className}>
      <BookOpenTextIcon className="size-3" />
      {numPosts} Part{numPosts !== 1 && "s"}
    </Tag>
  ) : (
    <Tag variant="default" size={size} className={className}>
      Empty
    </Tag>
  );
}
