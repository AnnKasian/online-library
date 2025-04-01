import { cn } from '#/libs/helpers';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-secondary/10', className)}
      {...props}
    />
  );
}

export { Skeleton };
