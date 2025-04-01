import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '#/libs/helpers';

const cardVariants = cva('rounded-xl border bg-secondary shadow', {
  variants: {
    variant: {
      // default: 'max-w-60',
      // destructive:
      //   'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90', /*red or smth*/
      // outline:
      //   'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
      // form: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      // ghost: 'hover:bg-accent hover:text-accent-foreground',
      // link: 'underline-offset-4 hover:underline',
    },
    size: {
      default: 'min-w-50 max-w-60',
      form: 'min-w-72',
      // lg: 'h-10 rounded-md px-8',
      // icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    // variant: 'default',
    size: 'default',
  },
});

export type CardProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, size, className }), className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 ', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex justify-center font-bold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm text-muted', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
