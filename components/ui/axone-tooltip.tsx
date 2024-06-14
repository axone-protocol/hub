import { Info } from 'lucide-react';
import { FC } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type AxoneTooltipProps = {
  content: string;
  iconColor?: string;
};
 
const AxoneTooltip: FC<AxoneTooltipProps> = ({ content, iconColor = 'text-axone-orange' }) => {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className={cn('cursor-pointer flex-none', iconColor)} size={18} />
        </TooltipTrigger>
        <TooltipContent className='bg-axone-dark-blue text-axone-grey border-axone-box-border'>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { AxoneTooltip };