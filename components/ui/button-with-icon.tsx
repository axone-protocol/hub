import { ArrowUpRight } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

type ButtonWithIconProps = {
  children: React.ReactNode;
  iconSize?: number;
} & ButtonProps

export function ButtonWithIcon ({ children, iconSize=16, ...props }: ButtonWithIconProps) {
  return (
    <Button {...props}>
      {children} <ArrowUpRight className={`ml-2 h-[${iconSize}px] w-[${iconSize}px] mb-0.5`} />
    </Button>
  );
}
