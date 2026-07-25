import type { InferEntrySchema } from "astro:content";
import { ArrowRightIcon, BookOpenTextIcon } from "lucide-preact";
import type { HTMLAttributes } from "preact";
import { ItemCard, ItemCardActions, ItemCardContent, ItemCardDescription, ItemCardMedia, ItemCardTitle } from "./ItemCard";


interface SeriesReferenceProps extends HTMLAttributes<HTMLElement> {
  seriesId: string;
  series: InferEntrySchema<"series">;
}

function SeriesReference({ seriesId, series }: SeriesReferenceProps) {
  return (
    <ItemCard>
      <ItemCardMedia variant="icon">
        <BookOpenTextIcon />
      </ItemCardMedia>

      <ItemCardContent>
        <ItemCardTitle>This lesson is part of a series</ItemCardTitle>
        <ItemCardDescription>{series.title}</ItemCardDescription>
      </ItemCardContent>

      <ItemCardActions>
        <a href={`/series/${seriesId}`} class="bg-primary text-primary-foreground text-sm rounded-md grow sm:grow-0 py-2 px-3 flex flex-row items-center justify-center sm:justify-start">
          View Series
          <ArrowRightIcon class="size-4 ml-2" />
        </a>
      </ItemCardActions>
    </ItemCard>
  );
}

export {
  SeriesReference
};
