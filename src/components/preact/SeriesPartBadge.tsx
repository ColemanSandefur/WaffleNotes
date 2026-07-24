import { BookOpenTextIcon } from "lucide-preact";
import Tag from "./Tag";

export interface SeriesPartBadgeProps {
  numPosts: number;
  size: "sm";
}

export default function SeriesPartBadge({ numPosts }: SeriesPartBadgeProps) {
  return numPosts > 0 ? (
    <Tag variant="primary" size="sm">
      <BookOpenTextIcon className="size-3" />
      {numPosts} Part{numPosts !== 1 && "s"}
    </Tag>
  ) : (
    <Tag variant="default" size="sm">
      Empty
    </Tag>
  );
}
