import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = {
  isRequired?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isRequired=false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md bg-axone-bg-dark px-3 py-2 text-axone-grey text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-axone-grey focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
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
Textarea.displayName = 'Textarea';

export { Textarea };
