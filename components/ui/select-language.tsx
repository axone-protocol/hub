'use client';
import { ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const LanguageSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Select onOpenChange={() => setOpen(prev => !prev)}>
      <SelectTrigger className={cn('mr-16', { 'bg-axone-bg-dark': open })}>
        <Languages className='w-5 h-5 text-axone-khaki' /> <SelectValue placeholder='EN' />
        <SelectIcon asChild>
          {!open ? <ChevronDown className='h-4 w-4 text-axone-khaki' /> : <ChevronUp className='h-4 w-4 text-axone-khaki' />}
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value='EN'>EN</SelectItem>
          <SelectItem value='FR'>FR</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;