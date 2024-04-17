'use client';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
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
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
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