'use client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box } from '@/components/ui/boxes';
import { BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { useValidatorDelegations, ValidatorDelegation } from '@/hooks/use-validator-delegations';
import { cn, formatNumberToLocale } from '@/lib/utils';

const ValidatorDelegationsBlock = () => {
  const t = useTranslations('Staking');
  const { address } = useParams();
  const { data, isLoading } = useValidatorDelegations(address);

  const shortenedAddress = (address = ''): string => `${address?.slice(0, 8)}...${address?.slice(-4)}`;

  return (
    <Box className='m-0'>
      <Title className='mb-6'>{t('ValidatorDelegations')}</Title>

      <div className='w-full overflow-auto'>
        <Row className='px-6 justify-between mb-3 w-[600px] lg:w-full overflow-auto'>
          <Text className='w-1/3 text-white mb-0 text-left'>{t('Delegator')}</Text>
          <div className='flex w-1/3 ml-4 gap-2 items-center justify-start'>
            <Text className=' text-white mb-0'>{t('DelegatedAmount')}</Text>
            <AxoneTooltip iconColor='text-axone-khaki' content={t('DelegatedAmount')} />
          </div>
          <Text className='w-1/3 text-white mb-0 text-right'>{t('Commission')}</Text>
        </Row>
        <BoxInner className={cn('hidden flex-col w-[600px] lg:w-full h-[140px] justify-center items-center', { 'flex' : isLoading })}>
          <Spinner />
        </BoxInner>
        <BoxInner className={cn('flex flex-col w-[600px] lg:w-full h-[140px] overflow-y-auto scrollbar scrollbar-thin', { 'hidden' : isLoading })}>
          {
            data?.validatorDelegations.map((delegation: ValidatorDelegation, index: number) => (
              <Row key={delegation.delegator + index} className='p-6 justify-between even:bg-axone-dark-blue-3'>
                <Text className='w-1/3 text-axone-khaki mb-0 text-left'>{shortenedAddress(delegation.delegator)}</Text>
                <Text className='w-1/3 ml-4 text-axone-khaki mb-0 text-left'>{formatNumberToLocale(Number(delegation.delegatedAmount)/1000000)} AXONE</Text>
                <Text className='w-1/3 text-axone-khaki mb-0 text-right'>{Number(delegation.commission).toFixed(2) || 0.00}%</Text>
              </Row>
            ))
          }
        </BoxInner>
      </div>

      <Button variant='rounded' className='px-8 mt-8'>{t('ShowMore')}</Button>
    </Box>
  );
};

export { ValidatorDelegationsBlock };