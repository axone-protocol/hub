'use client';
import { useTranslations } from 'next-intl';
import { FC, useCallback } from 'react';
import { Text } from '@/components/typography';
import Row from '@/components/ui/row';
import { OverviewChartFilterRangeEnum } from '@/hooks/use-overview-chart';
import { cn } from '@/lib/utils';

type FilterByRangeProps = {
  range: OverviewChartFilterRangeEnum;
  selectRange: (range: OverviewChartFilterRangeEnum) => void;
};

const FilterByRange: FC<FilterByRangeProps> = ({ range, selectRange }) => {
  const t  = useTranslations('Dashboard');

  const handleRangeChange = useCallback((range: OverviewChartFilterRangeEnum) => () => {
    selectRange(range);
  }, [selectRange]);

  return (
    <Row className='gap-6 w-[500px] lg:w-full overflow-x-auto justify-left mt-4  md:mt-0 md:w-2/4 md:justify-between'>
      <Text
        onClick={handleRangeChange(OverviewChartFilterRangeEnum.ALL)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange font-bold': range === OverviewChartFilterRangeEnum.ALL })}
      >
        {t('Chart.Filter.All')}
      </Text>
      <Text
        onClick={handleRangeChange(OverviewChartFilterRangeEnum.DAY)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange font-bold': range === OverviewChartFilterRangeEnum.DAY })}
      >
        {t('Chart.Filter.Day')}
      </Text>
      <Text
        onClick={handleRangeChange(OverviewChartFilterRangeEnum.WEEK)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange font-bold': range === OverviewChartFilterRangeEnum.WEEK })}
      >
        {t('Chart.Filter.Week')}
      </Text>
      <Text
        onClick={handleRangeChange(OverviewChartFilterRangeEnum.MONTH)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange font-bold': range === OverviewChartFilterRangeEnum.MONTH })}
      >
        {t('Chart.Filter.Month')}
      </Text>
      <Text
        onClick={handleRangeChange(OverviewChartFilterRangeEnum.THREE_MONTH)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange font-bold': range === OverviewChartFilterRangeEnum.THREE_MONTH })}
      >
        3 {t('Chart.Filter.Month')}
      </Text>
      <Text
        onClick={handleRangeChange(OverviewChartFilterRangeEnum.YEAR)}
        className={
          cn('cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki',
            { 'text-axone-orange font-bold': range === OverviewChartFilterRangeEnum.YEAR })}
      >
        {t('Chart.Filter.Year')}
      </Text>
    </Row>
  );
};

export { FilterByRange };