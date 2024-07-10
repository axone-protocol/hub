'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { TokenInfoDTO } from '@/hooks/dto/token-info.dto';
import { useCurrencyStore } from '@/hooks/use-currencies';
import { cn, formatNumber } from '@/lib/utils';


const OverviewMetrics = ({ tokenInfo }: { tokenInfo: TokenInfoDTO}) => {
  const t  = useTranslations('Dashboard');
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);
  const currencySign = useCurrencyStore((state) => state.currencySign);

  const tokenPrice = tokenInfo?.price ? tokenInfo?.price?.value : 0;
  const tokenChange = tokenInfo?.price ? tokenInfo?.price?.change : 0;
  const marketCap = tokenInfo?.marketCap ? tokenInfo?.marketCap?.value : 0;
  const marketCapChange = tokenInfo?.marketCap ? tokenInfo?.marketCap?.change : 0;
  const volume = tokenInfo?.volume || 0;
  return (
    <>
      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
        <Title className='mt-2 mb-0'>
          {currencySign}{(tokenPrice * exchangeRate).toFixed(2)}
        </Title>
        <Text className={cn('uppercase', { 'text-axone-red': tokenChange < 0, 'text-axone-green': tokenChange > 0 })}>
          {tokenChange.toFixed(2) || 0}%
        </Text>
        <Text className='uppercase text-axone-khaki'>
          {t('Price')}
        </Text>
      </BoxInner>

      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
        <Title className='mt-2 mb-0'>
          {currencySign}{formatNumber(marketCap * exchangeRate)}
        </Title>
        <Text className={cn('uppercase', { 'text-axone-red': marketCapChange < 0, 'text-axone-green': marketCapChange > 0 })}>
          {marketCapChange.toFixed(3) ||  0}%
        </Text>
        <Text className='uppercase text-axone-khaki text-center'>
          {t('MarketCap')}
        </Text>
      </BoxInner>

      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
        <Title className='mt-2 mb-0'>
          {currencySign}{formatNumber(volume * exchangeRate)}
        </Title>
        <Row className='justify-center items-center'>
          <Text className='uppercase text-axone-khaki mr-3'>
            {t('Volume')}
          </Text>
          <Text className='bg-axone-dark-blue px-[2px] text-axone-khaki'>24H</Text>
        </Row>
      </BoxInner>

      <BoxInner className='pt-5 pb-3 w-full mb-4 h-32 lg:h-32 flex-col justify-between items-center'>
        <Title className='mt-2 mb-0'>
          {Number(tokenInfo?.apr || 0).toFixed(2)}%
        </Title>
        <Text className='uppercase text-axone-khaki'>
          { t('APR')}
        </Text>
      </BoxInner>
    </>
  );
};

export { OverviewMetrics };

