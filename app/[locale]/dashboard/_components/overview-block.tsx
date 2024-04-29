'use client';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import AxoneAreaChart from '@/components/ui/charts/axone-area-chart';
import Row from '@/components/ui/row';
import { useOverviewChart } from '@/hooks/use-overview-chart';

export default function OverviewBlock () {
  const t  = useTranslations('Dashboard');
  const { data: chartData } = useOverviewChart();

  return (
    <Box className='w-2/3 m-0 mr-6 h-[50%]'>
      <Row className='mb-10 items-center'>
        <Title className='mr-40'>{t('Chart.Overview')}</Title>
        <Row className='w-2/4 justify-around '>
          <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>{t('Chart.Filter.All')}</Text>
          <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>{t('Chart.Filter.Day')}</Text>
          <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>{t('Chart.Filter.Week')}</Text>
          <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-orange font-bold'>{t('Chart.Filter.Month')}</Text>
          <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>3 {t('Chart.Filter.Month')}</Text>
          <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>{t('Chart.Filter.Year')}</Text>
        </Row>
      </Row>

      <BoxInner className='h-[384px] py-5'>
        <AxoneAreaChart data={chartData} />
      </BoxInner>

      <Row className='mt-10 desktop:mt-8'>
        <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 desktop:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>$44.05</Title>
          <Text className='uppercase text-axone-red'>
              -2.34%
          </Text>
          <Text className='uppercase text-axone-khaki'>
            {t('Price')}
          </Text>
        </BoxInner>
        <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 desktop:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>$3.894.05M</Title>
          <Text className='uppercase text-axone-red'>
              -2.34%
          </Text>
          <Text className='uppercase text-axone-khaki text-center'>
            {t('MarketCap')}
          </Text>
        </BoxInner>
        <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 desktop:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>$531.4M</Title>
          <Row className='justify-center items-center'>
            <Text className='uppercase text-axone-khaki mr-3'>
              {t('Volume')}
            </Text>
            <Text className='bg-axone-dark-blue px-[2px] text-axone-khaki'>24H</Text>
          </Row>
        </BoxInner>
        <BoxInner className='pt-5 pb-3 w-1/4 h-36 desktop:h-32 flex-col justify-between items-center'>
          <Title className='mt-2 mb-0'>15.71%</Title>
          <Text className='uppercase text-axone-khaki'>
            { t('APR')}
          </Text>
        </BoxInner>
      </Row>
    </Box>
  );
}