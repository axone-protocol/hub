'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTimeFrameStore } from '@/hooks/timeframe/use-timeframe-store';
import { cn } from '@/lib/utils';

const TimeFrameSelect = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { timeFrame, setTimeFrame } = useTimeFrameStore();
  const t = useTranslations('Dashboard');

  const onOpenChange = () => setOpen(prev => !prev);
  return (
    <Select onOpenChange={onOpenChange} value={timeFrame} onValueChange={setTimeFrame}>
      <SelectTrigger className={cn('w-50 relative -top-[7px]', { 'bg-axone-bg-dark': open })}>
        <SelectValue className='mb-2' placeholder='5 Min' />
        <SelectIcon asChild>
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value='all'>{t('Chart.Filter.All')}</SelectItem>
          <SelectItem value='day'>{t('Chart.Filter.Day')}</SelectItem>
          <SelectItem value='week'>{t('Chart.Filter.Week')}</SelectItem>
          <SelectItem value='month'>{t('Chart.Filter.Month')}</SelectItem>
          <SelectItem value='year'>{t('Chart.Filter.Year')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

export { TimeFrameSelect };