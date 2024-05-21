'use client';
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Column from '@/components/ui/column';
import Spinner from '@/components/ui/spinner';
import { useCurrentSupply } from '@/hooks/use-current-supply';

export default function CurrentSupplyBlock () {
  const t  = useTranslations('Dashboard');
  const { data, isLoading } = useCurrentSupply();

  const formattedNum = useMemo(() => data?.supply.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), [data?.supply]);
  const updatedDate = useMemo(() => new Date(data?.time ? data?.time : Date.now()), [data?.time]);
  const timeAgo = useMemo(() => formatDistanceToNow(updatedDate), [updatedDate]);

  if (isLoading) {
    return (
      <Box className='m-0 flex flex-col justify-center items-center lg:w-1/2 xl:w-full xl:h-1/2'>
        <Spinner />
      </Box>
    );
  };

  return (
    <Box className='m-0 flex flex-col justify-between lg:w-1/2 xl:w-full xl:h-1/2'>
      <Text className='mb-5 uppercase m-0'>{t('CurrentSupply')}</Text>
      <div className='flex flex-col items-end lg:flex-col lg:justify-between py-8 lg:py-0'>
        <p className='text-3xl tracking-tighter text-axone-white mb-0'>{formattedNum}</p>
        <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
      </div>
      <Column className='justify-end'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0'>{`Updated ${timeAgo} ago`}</Text>
      </Column>
    </Box>
  );
}