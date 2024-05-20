import { FC } from 'react';

type ColorBadgeProps = {
  backgroundColor: string;
  textColor: string;
  text: string;
  className?: string;
}
const ColorBadge: FC<ColorBadgeProps> = ({ backgroundColor, textColor, text, className }) => {
  return (
    <div
      className={`flex uppercase max-w-20 justify-center items-center rounded-md pt-1 text-xs bg-${backgroundColor} text-${textColor} ${className}`}
    >
      {text}
    </div>
  );
};

export { ColorBadge };