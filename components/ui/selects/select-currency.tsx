'use client';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCurrency, useCurrencyStore } from '@/hooks/use-currencies';
import { cn } from '@/lib/utils';

const CurrencySelect = () => {
  useCurrency();
  const currencySelected = useCurrencyStore((state) => state.currencySelected);
  const setCurrencySelected = useCurrencyStore((state) => state.setCurrencySelected);
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = useCallback(() => setOpen(prev => !prev), []);
  return (
    <Select onOpenChange={onOpenChange} value={currencySelected} onValueChange={setCurrencySelected}>
      <SelectTrigger className={cn({ 'bg-axone-bg-dark': open })}>
        <Wallet className='w-5 h-4 mb-0.5 text-axone-khaki' /> <SelectValue placeholder={currencySelected} />
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

export { CurrencySelect };