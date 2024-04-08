import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = {
  isRequired?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isRequired=false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md bg-axone-bg-dark px-3 py-2 text-axone-grey text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-axone-grey focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-b-2 border-axone-orange': isRequired
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
