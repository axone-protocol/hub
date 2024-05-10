import { Info } from 'lucide-react';
import { FC } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type AxoneTooltipProps = {
  content: string;
  iconColor?: string;
};

const AxoneTooltip: FC<AxoneTooltipProps> = ({ content, iconColor = 'text-axone-orange' }) => {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className={`cursor-pointer ${iconColor}`} size={18} />
        </TooltipTrigger>
        <TooltipContent className='bg-axone-dark-blue text-axone-grey border-axone-box-border'>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { AxoneTooltip };