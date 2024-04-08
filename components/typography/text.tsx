import { HTMLAttributes, memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <p className={cn('text-sm text-axone-grey leading-5 font-[400] mb-2.5', className)} {...props}>
      {children}
    </p>
  );
};

export default memo<typeof Text>(Text);
