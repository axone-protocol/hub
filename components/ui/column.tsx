import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ColumnProps = {
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>; // Add your own props here if needed

const Column: React.FC<ColumnProps> = ({ children, className, ...props }) => {
  const _className = cn('flex flex-col w-full', className);
  return (
    <div className={_className} {...props}>{children}</div>
  );
};

export default Column;