import { HTMLAttributes, memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <span className={cn('text-sm text-axone-grey leading-5 font-[400] mb-2.5', className)} {...props}>
      {children}
    </span>
  );
};

export default memo<typeof Text>(Text);
