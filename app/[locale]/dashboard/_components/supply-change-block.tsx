'use client';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Column from '@/components/ui/column';
import Row from '@/components/ui/row';
import { TimeFrameSelect } from '@/components/ui/selects';
import Spinner from '@/components/ui/spinner';
import { useSupplyChange } from '@/hooks/use-supply-change';
import { formatNumberToLocale } from '@/lib/utils';

export default function SupplyChangeBlock () {
  const t  = useTranslations('Dashboard');
  const { query: { data, isLoading, isFetching, isRefetching } } = useSupplyChange();

  const formattedChange = formatNumberToLocale(Number(data?.change || 0)/1000000);
  const formattedBurnt = formatNumberToLocale(Number(data?.burnt || 0)/1000000);
  const formattedIssued = formatNumberToLocale(Number(data?.issuance || 0)/1000000);
  const updatedDate = useMemo(() => new Date(data?.time ? data?.time : Date.now()), [data?.time]);
  const timeAgo = useMemo(() => formatDistanceToNow(updatedDate), [updatedDate]);

  if (isLoading || isFetching || isRefetching) {
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
        <TimeFrameSelect />
      </Row>
      <div className='flex flex-col items-end lg:flex-col lg:justify-between'>
        <p className='text-3xl tracking-tighter text-axone-orange mb-0'>{formattedChange}</p>
        <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
      </div>
      <Row className='justify-between mt-4'>
        <div className='w-0 h-0' />
        <Column className='w-auto'>
          <Row className='justify-between items-start mb-3'>
            <Image className='mr-2' src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
            <div className='flex flex-col lg:flex-row'>
              <Text className='text-axone-grey mb-0'>
                {formattedBurnt}
              </Text>
              <Text className='text-axone-grey mb-0  lg:flex lg:justify-between'><Text className='text-axone-khaki mb-0 lg:px-1'>AXONE</Text> Burned</Text>
            </div>
          </Row>

          <Row className='justify-between items-start'>
            <Image className='mr-2' src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
            <div className='flex flex-col lg:flex-row'>
              <Text className='text-axone-grey mb-0'>
                {formattedIssued}
              </Text>
              <Text className='text-axone-grey mb-0 lg:flex lg:justify-between'><Text className='text-axone-khaki mb-0 lg:px-1'>AXONE</Text> Issued</Text>
            </div>
          </Row>
        </Column>

      </Row>
      <Column className='justify-end w-auto'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0'>{`Updated ${timeAgo} ago`}</Text>
      </Column>
    </Box>
  );
}