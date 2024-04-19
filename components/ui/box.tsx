import React, { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BoxProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Box = ({ children, className, ...props }: BoxProps) => (
  <div className={cn('bg-axone-dark-blue border rounded-lg border-axone-box-border p-10 desktop:p-8 m-6 text-white', className)} {...props}>
    {children}
  </div>
);

export default Box;