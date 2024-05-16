import React, { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type BoxInnerProps = HTMLAttributes<HTMLDivElement>;

export const BoxInner = ({ children, className, ...props }: PropsWithChildren<BoxInnerProps>) => (
  <div className={cn('flex bg-axone-bg-dark rounded-innerBox text-white', className)} {...props}>
    {children}
  </div>
);
