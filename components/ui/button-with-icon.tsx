import { ArrowUpRight } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonWithIconProps = {
  children: React.ReactNode;
} & ButtonProps

export function ButtonWithIcon ({ children, className, ...props }: ButtonWithIconProps) {
  return (
    <Button {...props}>
      {children} <ArrowUpRight className={cn('ml-2 h-4 w-4 mb-0.5', className)} />
    </Button>
  );
}
