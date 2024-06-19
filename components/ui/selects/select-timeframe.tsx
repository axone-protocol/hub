'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const TimeframeSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Select onOpenChange={() => setOpen(prev => !prev)}>
      <SelectTrigger className={cn('w-50 relative -top-[7px]', { 'bg-axone-bg-dark': open })}>
        <SelectValue className='mb-2' placeholder='5 Min' />
        <SelectIcon asChild>
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value='5min'>5 Min</SelectItem>
          <SelectItem value='hour'>1 Hour</SelectItem>
          <SelectItem value='week'>1 Week</SelectItem>
          <SelectItem value='month'>1 Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

export { TimeframeSelect };