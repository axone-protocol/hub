'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Text, Title } from '@/components/typography';
import Box from '@/components/ui/box';
import BoxInner from '@/components/ui/box-inner';
import { Button } from '@/components/ui/button';
import AxoneAreaChart from '@/components/ui/charts/axone-area-chart';
import Column from '@/components/ui/column';
import { RewardsCalculatorModal } from '@/components/ui/modals';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import { ChartData } from '../mock-chart-data';


export default function Dashboard () {
  const t  = useTranslations('Dashboard');
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch(
      '/api/historical-price?symbol=eth&range=43800'
    ).then(res => {
      return res.json();
    })
      .then(data => {
        setChartData(data);
      })
      .catch(e => {
        console.log('Error ' + e);
      });
  }, []);

  return (
    <PageContainer>
      <Row className=''>
        <Box className='w-1/2 mr-0 flex flex-row justify-between'>
          <Column className='w-2/3'>
            <Title className='mb-5'>{t('StakingRewards')}</Title>
            <Text className='mb-5'>{t('StakingRewardsDesc')}</Text>
            <Row>
              <Button variant={'rounded'} className='mt-5 mr-2 text-base font-bold'>{t('DelegateNow')}</Button>
              <RewardsCalculatorModal />
            </Row>
          </Column>
          <div className='relative flex items-center justify-center'>
            <Image src={'/images/staking.svg'} alt='Staking Rewards' width={166} height={166} />
            <div className='absolute flex flex-col justify-center items-center'>
              <Text className='text-xl mb-0 text-axone-grey'>APS</Text>
              <Text className='text-xl mb-0 text-white font-bold'>15.68%</Text>
            </div>
          </div>
        </Box>

        <Box className='w-1/2 flex flex-row justify-between'>
          <Column className='w-2/3'>
            <Title className='mb-5'>{t('Governance')}</Title>
            <Text className='mb-5'>{t('GovernanceDesc')}</Text>
            <Button variant={'rounded'} className='mt-5 mr-2 text-base font-bold w-64'>{t('OpenGovernance')}</Button>
          </Column>
          <Image src={'/images/governance.svg'} alt='Governance' width={200} height={200} />
        </Box>
      </Row>

      <Row className='p-6 pt-0'>
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

          <Row className='mt-10'>
            <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>$44.05</Title>
              <Text className='uppercase text-axone-red'>
              -2.34%
              </Text>
              <Text className='uppercase text-axone-khaki'>
                {t('Price')}
              </Text>
            </BoxInner>
            <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>$3.894.05M</Title>
              <Text className='uppercase text-axone-red'>
              -2.34%
              </Text>
              <Text className='uppercase text-axone-khaki text-center'>
                {t('MarketCap')}
              </Text>
            </BoxInner>
            <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>$531.4M</Title>
              <Row className='justify-center items-center'>
                <Text className='uppercase text-axone-khaki mr-3'>
                  {t('Volume')}
                </Text>
                <Text className='bg-axone-dark-blue px-[2px] text-axone-khaki'>24H</Text>
              </Row>
            </BoxInner>
            <BoxInner className='pt-5 pb-3 w-1/4 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>15.71%</Title>
              <Text className='uppercase text-axone-khaki'>
                { t('APR')}
              </Text>
            </BoxInner>
          </Row>
        </Box>

        <Column className='w-1/3'>
          {/* Temporary block with navigation to UI-Kit - content will be replaced later*/}
          <Box className='h-1/2 m-0 flex flex-col justify-between mb-6'>
            <Text className='mb-10 uppercase'>{t('SupplyChange')}</Text>
            <Row className='justify-between'>
              <p className='text-4xl tracking-tighter text-axone-orange mb-0'>-2,847,432.80</p>
              <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
            </Row>
            <Row className='justify-between mt-10'>
              <Column className='justify-end'>
                <Text className='text-axone-grey tracking-tight uppercase mb-0'>Updated 34 seconds ago</Text>
              </Column>
              <Column>
                <Row className='justify-between items-center mb-3'>
                  <Image src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
                  <Text className='text-axone-grey mb-0'>19.547.04</Text>
                  <Text className='text-axone-khaki mb-0'>AXONE</Text>
                  <Text className='text-axone-grey mb-0'>Burned</Text>
                </Row>
                <Row className='justify-between items-center'>
                  <Image src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
                  <Text className='text-axone-grey mb-0'>19.547.04</Text>
                  <Text className='text-axone-khaki mb-0'>AXONE</Text>
                  <Text className='text-axone-grey mb-0'>Burned</Text>
                </Row>
              </Column>
            </Row>
          </Box>
          {/* Temporary empty block - content will be replaced later */}
          <Box className='h-1/2 m-0 flex flex-col justify-between'>
            <Text className='mb-10 uppercase m-0'>{t('CurrentSupply')}</Text>
            <Row className='justify-between'>
              <p className='text-4xl tracking-tighter text-axone-white mb-0'>2,847,432.80</p>
              <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
            </Row>
            <Column className='justify-end'>
              <Text className='text-axone-grey tracking-tight uppercase mb-0'>Updated 34 seconds ago</Text>
            </Column>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  );
}
