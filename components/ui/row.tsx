import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type RowProps = {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>; // Add your own props here if needed

const Row: React.FC<RowProps> = ({ children, className, ...props }) => {
  const _className = cn('flex md:flex-row md:w-full', className);
  return (
    <div className={_className} {...props}>{children}</div>
  );
};

export default Row;