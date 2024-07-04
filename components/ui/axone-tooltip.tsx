import { Info } from 'lucide-react';
import { FC, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type AxoneTooltipProps = {
  content: string;
  iconColor?: string;
};
 
const AxoneTooltip: FC<AxoneTooltipProps> = ({ content, iconColor = 'text-axone-orange' }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Info onClick={() => setOpen(true)} className={cn('cursor-pointer flex-none', iconColor)} size={18} />
        </TooltipTrigger>
        <TooltipContent className='bg-axone-dark-blue text-axone-grey border-axone-box-border max-w-sm break-words'>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { AxoneTooltip };