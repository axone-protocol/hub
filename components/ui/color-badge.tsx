import { FC } from 'react';
import { cn } from '@/lib/utils';

type ColorBadgeProps = {
  backgroundColor: string;
  textColor: string;
  text: string;
  className?: string;
}

const ColorBadge: FC<ColorBadgeProps> = ({ backgroundColor, textColor, text, className }) => {
  return (
    <div
      className={cn(
        'flex uppercase max-w-20 justify-center items-center rounded-md pt-1 text-xs',
        className
      )}
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      {text}
    </div>
  );
};

export { ColorBadge };