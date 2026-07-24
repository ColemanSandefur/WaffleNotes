import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentChildren } from "preact";

const tagVariants = cva(
  "font-mono text-xs py-1 px-3 uppercase rounded-sm flex flex-row items-center gap-2",
  {
    variants: {
      variant: {
        default: "text-foreground border-border border",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        tertiary: "bg-tertiary text-tertiary-foreground",
      },
      size: {
        xs: "text-xs py-0 px-2",
        sm: "text-xs py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface TagProps extends VariantProps<typeof tagVariants> {
  className?: string;
  children?: ComponentChildren;
}

export default function Tag({ variant, size, children, className }: TagProps) {
  const style = tagVariants({ variant, size });
  return <p className={cn(style, className)}>{children}</p>;
}
