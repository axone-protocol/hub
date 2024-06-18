'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Column from '@/components/ui/column';
import Row from '@/components/ui/row';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { ChangeSupplyRangeEnum, useSupplyChange } from '@/hooks/use-supply-change';
import { cn, formatNumberToLocale } from '@/lib/utils';

type TimeFrameSelectProps = {
  selectRange: (value: ChangeSupplyRangeEnum) => void;
  range: ChangeSupplyRangeEnum;
};

const TimeFrameSelect: FC<TimeFrameSelectProps> = ({ selectRange, range }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = (): void => {
    setOpen(prev => !prev);
  };

  const onValueChange = (value: ChangeSupplyRangeEnum): void => {
    selectRange(value);
  };

  return (
    <Select value={range} onOpenChange={onOpenChange} onValueChange={onValueChange}>
      <SelectTrigger className={cn('w-50 relative -top-[7px]', { 'bg-axone-bg-dark': open })}>
        <Text className='uppercase mb-0 mr-2'>Time Frame</Text> <SelectValue className='mb-2' placeholder='5 Min' />
        <SelectIcon asChild>
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value={ChangeSupplyRangeEnum.FIVE_MIN}>5 min</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.HOUR}>Hour</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.DAY}>Day</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.WEEK}>Week</SelectItem>
          <SelectItem value={ChangeSupplyRangeEnum.MONTH}>Month</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

export default function SupplyChangeBlock () {
  const t  = useTranslations('Dashboard');
  const { query: { data, isLoading }, range, selectRange } = useSupplyChange();

  const formattedNum = formatNumberToLocale(Number(data)/1000000);

  if (isLoading) {
    return (
      <Box className='m-0 flex flex-col justify-center items-center lg:w-1/2 xl:w-full xl:h-1/2'>
        <Spinner />
      </Box>
    );
  };

  return (
    <Box className='m-0 flex flex-col justify-between mb-6 lg:mb-0 lg:w-1/2 xl:w-full xl:h-1/2'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>{t('SupplyChange')}</Text>
        <TimeFrameSelect selectRange={selectRange} range={range} />
      </Row>
      <div className='flex flex-col items-end lg:flex-col lg:justify-between'>
        <p className='text-3xl tracking-tighter text-axone-orange mb-0'>{formattedNum}</p>
        <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
      </div>
      <Row className='justify-between mt-10'>
        <Column className='justify-end w-auto'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-0'>Updated 34 seconds ago</Text>
        </Column>

        <Column className='w-auto'>
          <Row className='justify-between items-start mb-3'>
            <Image className='mr-2' src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
            <div className='flex flex-col lg:flex-row'>
              <Text className='text-axone-grey mb-0'>19.547.04</Text>
              <Text className='text-axone-grey mb-0  lg:flex lg:justify-between'><Text className='text-axone-khaki mb-0 lg:px-1'>AXONE</Text> Burned</Text>
            </div>
          </Row>

          <Row className='justify-between items-start'>
            <Image className='mr-2' src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
            <div className='flex flex-col lg:flex-row'>
              <Text className='text-axone-grey mb-0'>19.547.04</Text>
              <Text className='text-axone-grey mb-0 lg:flex lg:justify-between'><Text className='text-axone-khaki mb-0 lg:px-1'>AXONE</Text> Issued</Text>
            </div>
          </Row>
        </Column>

      </Row>
    </Box>
  );
}