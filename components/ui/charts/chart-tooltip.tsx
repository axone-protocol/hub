'use client';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useCurrencyStore } from '@/hooks/use-currencies';
import { formatNumberToLocale } from '@/lib/utils';
import Row from '../row';

type TooltipProps = {
  active?: boolean;
  payload?: Payload<ValueType, NameType>[] | undefined ;
  label?: string;
  formattedDate?: string;
  type?: 'overview' | 'supply';
}

/**
 * ChartTooltip component
 * Represents the tooltip in the chart
 */
const ChartTooltip = ({ active, payload, formattedDate, type = 'overview' }: TooltipProps) => {
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);
  const currencySign = useCurrencyStore((state) => state.currencySign);
  const value = payload?.[0]?.value || 0;
  const supplyValue = formatNumberToLocale(Number(payload?.[0]?.payload.change || 0)/1000000);

  if (active && payload && payload.length && type === 'overview') {
    return (
      <div className='bg-axone-dark-blue rounded-md p-1 custom-tooltip'>
        <p className='rounded-t-md p-2 bg-axone-bg-dark mb-2'>{formattedDate}</p>
        <Row className='px-4'>
          <div className='w-5 h-5 bg-axone-orange rounded-full' />
          <p className='text-axone-white ml-2'><span className='text-axone-khaki'>Price:</span> {currencySign}{(Number(value) * exchangeRate).toFixed(2)}</p>
        </Row>
        <Row className='px-4 mb-4'>
          <div className='w-5 h-5 bg-axone-dark-blue rounded-full' />
          <p className='text-axone-white ml-2'><span className='text-axone-khaki'>Supplier:</span> AXONE</p>
        </Row>
      </div>
    );
  }
  if (active && payload && payload.length && type === 'supply') {
    return (
      <div className='bg-axone-dark-blue rounded-md p-1 custom-tooltip'>
        <p className='rounded-t-md p-2 bg-axone-bg-dark mb-2'>{formattedDate}</p>
        <Row className='px-4'>
          <div className='w-5 h-5 bg-axone-orange rounded-full' />
          <p className='text-axone-white ml-2'>{supplyValue} <span className='text-axone-khaki uppercase'>Axone</span></p>
        </Row>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;