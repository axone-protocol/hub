import React, { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BoxInnerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const BoxInner = ({ children, className, ...props }: BoxInnerProps) => (
  <div className={cn('flex bg-axone-bg-dark rounded-innerBox text-white', className)} {...props}>
    {children}
  </div>
);

export default BoxInner;