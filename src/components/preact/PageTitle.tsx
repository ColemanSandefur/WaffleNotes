import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "preact";

function PageHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-16 mb-8", className)} {...props} />;
}

function PageTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-4xl font-serif font-bold text-primary", className)}
      {...props}
    />
  );
}

function PageDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("pt-4 text-muted-foreground", className)} {...props} />
  );
}

export { PageHeader, PageTitle, PageDescription };
