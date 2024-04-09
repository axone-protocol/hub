import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
  {
    variants: {
      variant: {
        default: 'bg-axone-dark-blue border border-axone-orange text-[700] text-axone-orange hover:bg-axone-orange hover:text-axone-dark-blue',
        rounded: 'rounded-lg bg-axone-dark-blue border border-axone-orange text-bold text-axone-orange hover:bg-axone-orange hover:text-axone-dark-blue',
        noBorder: 'bg-axone-dark-blue text-[700] text-axone-orange hover:bg-axone-orange hover:text-axone-dark-blue',
        link: ' hover:text-underlined hover:underline',
      },
      size: {
        default: 'h-10 px-4 pb-2 pt-2.5',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = {
  asChild?: boolean,
  withIcon?: boolean,
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };