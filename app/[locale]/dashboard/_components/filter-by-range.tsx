'use client';
import { useTranslations } from 'next-intl';
import { FC, useCallback } from 'react';
import { Text } from '@/components/typography';
import Row from '@/components/ui/row';
import { TimeFrameEnum } from '@/hooks/timeframe/use-timeframe-store';
import { cn } from '@/lib/utils';

type FilterByRangeProps = {
  range: TimeFrameEnum;
  selectRange: (range: TimeFrameEnum) => void;
};

const FilterByRange: FC<FilterByRangeProps> = ({ range, selectRange }) => {
  const t  = useTranslations('Dashboard');

  const handleRangeChange = useCallback((range: TimeFrameEnum) => () => {
    selectRange(range);
  }, [selectRange]);

  return (
    <Row className='gap-6 w-[500px] lg:w-full overflow-x-auto justify-left mt-4  md:mt-0 md:w-2/4 md:justify-between'>
      <Text
        onClick={handleRangeChange(TimeFrameEnum.ALL)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange': range === TimeFrameEnum.ALL })}
      >
        {t('Chart.Filter.All')}
      </Text>
      <Text
        onClick={handleRangeChange(TimeFrameEnum.DAY)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange': range === TimeFrameEnum.DAY })}
      >
        {t('Chart.Filter.Day')}
      </Text>
      <Text
        onClick={handleRangeChange(TimeFrameEnum.WEEK)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange': range === TimeFrameEnum.WEEK })}
      >
        {t('Chart.Filter.Week')}
      </Text>
      <Text
        onClick={handleRangeChange(TimeFrameEnum.MONTH)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange': range === TimeFrameEnum.MONTH })}
      >
        {t('Chart.Filter.Month')}
      </Text>
      <Text
        onClick={handleRangeChange(TimeFrameEnum.YEAR)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange': range === TimeFrameEnum.YEAR })}
      >
        {t('Chart.Filter.Year')}
      </Text>
    </Row>
  );
};

export { FilterByRange };