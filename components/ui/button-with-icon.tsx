import { ArrowUpRight } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonWithIconProps = {
  children: React.ReactNode;
  iconClassName?: string;
} & ButtonProps

export function ButtonWithIcon ({ children, className, iconClassName, ...props }: ButtonWithIconProps) {
  return (
    <Button className={className} {...props}>
      {children} <ArrowUpRight className={cn('ml-2 h-4 w-4 mb-0.5', iconClassName)} />
    </Button>
  );
}
