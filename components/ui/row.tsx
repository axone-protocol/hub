import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type RowProps = {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>; // Add your own props here if needed

const Row: React.FC<RowProps> = ({ children, className, ...props }) => (
  <div className={cn('flex lg:flex-row lg:w-full', className)} {...props}>{children}</div>
);

export default Row;