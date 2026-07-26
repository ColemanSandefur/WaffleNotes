import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement } from "preact";
import type { ComponentChildren, HTMLAttributes, VNode } from "preact";

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
        md: "text-sm py-2 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface TagProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof tagVariants> {
  asChild?: boolean;
  className?: string;
  children?: ComponentChildren;
}

export default function Tag({
  variant,
  size,
  asChild = false,
  children,
  className,
  ...props
}: TagProps) {
  const style = tagVariants({ variant, size });
  const combinedClassName = cn(style, className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as VNode<any>, {
      ...props,
      className: cn(combinedClassName, (children.props as any)?.className),
    });
  }

  return (
    <p
      className={combinedClassName}
      {...(props as HTMLAttributes<HTMLParagraphElement>)}
    >
      {children}
    </p>
  );
}
