import { HTMLAttributes, memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TitleProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h1 className={cn('text-lg leading-7 font-semibold subpixel-antialiased', className)} {...props}>
      {children}
    </h1>
  );
};

export default memo<typeof Title>(Title);
