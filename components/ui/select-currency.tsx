'use client';
import { ChevronDown, ChevronUp, Wallet } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const CurrencySelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Select onOpenChange={() => setOpen(prev => !prev)}>
      <SelectTrigger className={cn({ 'bg-axone-bg-dark': open })}>
        <Wallet className='w-5 h-4 mb-0.5 text-axone-khaki' /> <SelectValue placeholder='USD' />
        <SelectIcon asChild>
          {!open ? <ChevronDown className='h-4 w-4 text-axone-khaki' /> : <ChevronUp className='h-4 w-4 text-axone-khaki' />}
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value='USD'>USD</SelectItem>
          <SelectItem value='EUR'>EUR</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

export default CurrencySelect;