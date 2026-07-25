import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { cloneElement, type ComponentChildren, type HTMLAttributes } from "preact";

export interface ItemCardProps extends HTMLAttributes<HTMLElement> {
  href?: string;
}

export function ItemCard({ children, className = "", href, ...props }: ItemCardProps) {
  const baseStyles = cn(
    "border border-border p-2 rounded-sm transition duration-200 ease-in-out",
    "grid grid-cols-[auto_1fr] gap-x-2 gap-y-3 items-center",
    "sm:has-[>_[data-slot='item-card-actions']]:grid-cols-[auto_1fr_auto]",
    className
  );

  if (href) {
    return (
      <a href={href} className={cn(baseStyles, "hover:bg-border/30 hover:shadow-md")} {...props as HTMLAttributes<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }

  return (
    <div className={baseStyles} {...props as HTMLAttributes<HTMLDivElement>}>
      {children}
    </div>
  );
}

const itemCardMediaVariants = cva(
  "flex shrink-0 items-center justify-center col-start-1 row-start-1",
  {
    variants: {
      variant: {
        default: "",
        icon: "size-10 bg-primary text-primary-foreground rounded-md ",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  });

export interface ItemCardMediaProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof itemCardMediaVariants> {
  asChild?: boolean;
  children: ComponentChildren;
}

export function ItemCardMedia({ children, className = "", asChild, variant, ...props }: ItemCardMediaProps) {
  const defaultStyles = cn(
    itemCardMediaVariants({ variant }),
    className
  );

  if (asChild) {
    const child = children as preact.VNode;

    return cloneElement(child, {
      "data-slot": "item-card-media",
      ...props,
      className: cn(defaultStyles, (child.props as HTMLAttributes<HTMLElement>).className),
    });
  }

  return (
    <div data-slot="item-card-media" className={defaultStyles} {...props as HTMLAttributes<HTMLDivElement>}>
      {children}
    </div>
  );
}

export function ItemCardContent({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-card-content"
      className={cn("flex flex-col col-start-2 row-start-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function ItemCardTitle({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-mono text-xs text-muted-foreground", className)} {...props}>{children}</div>;
}

export function ItemCardDescription({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("font-serif text-base text-primary", className)} {...props}>{children}</div>;
}

export function ItemCardActions({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="item-card-actions"
      className={cn("col-span-full sm:col-span-1 flex flex-row items-center gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}