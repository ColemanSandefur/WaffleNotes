import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "preact";


export function DotsSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row justify-center items-center gap-8", className)} {...props}>
      <span className="select-none">•</span>
      <span className="select-none">•</span>
      <span className="select-none">•</span>
    </div>
  );
}

