import { ArrowUpRight } from 'lucide-react';
import { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ButtonWithIconProps = {
  children: React.ReactNode;
  iconClassName?: string;
} & ButtonProps

const ButtonWithIcon = forwardRef<HTMLButtonElement, ButtonWithIconProps>(({ children, className, iconClassName, ...props }, ref) => {
  return (
    <Button ref={ref} className={className} {...props}>
      {children} <ArrowUpRight className={cn('ml-2 h-4 w-4 mb-0.5', iconClassName)} />
    </Button>
  );
});

ButtonWithIcon.displayName = 'ButtonWithIcon';

export { ButtonWithIcon };