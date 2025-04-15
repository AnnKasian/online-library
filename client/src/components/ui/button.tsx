import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '#/libs/helpers';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium text-foreground disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-accent shadow hover:bg-accent-hover',
        outline: 'border border-input bg-secondary shadow-sm hover:bg-accent ',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = {
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
