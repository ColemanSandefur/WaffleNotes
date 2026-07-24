import { BookOpenTextIcon } from "lucide-preact";

export interface SeriesPartBadgeProps {
  numPosts: number;
  size: "sm";
}

export default function SeriesPartBadge({ numPosts }: SeriesPartBadgeProps) {
  return numPosts > 0 ? (
    <p class="bg-primary text-primary-foreground font-mono text-xs py-1 px-3 uppercase rounded-sm flex flex-row items-center gap-2">
      <BookOpenTextIcon class="size-3" />
      {numPosts} Part{numPosts !== 1 && "s"}
    </p>
  ) : (
    <p class="border border-border font-mono text-xs py-1 px-3 uppercase rounded-sm ml-auto">
      Empty
    </p>
  );
}
