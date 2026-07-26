import { cn } from "@/lib/utils";
import type { ComponentChildren, HTMLAttributes } from "preact";




export interface ItemList extends HTMLAttributes<HTMLDivElement> {
  separatorTop?: ComponentChildren;
  separatorBottom?: ComponentChildren;
}

export function ItemList({ children, className, separatorTop, separatorBottom, ...props }: ItemList) {
  return (
    <>
      {separatorTop}
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
      {separatorBottom}
    </>
  );
}