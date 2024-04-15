'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Text, Title } from '@/components/typography';
import AxoneAreaChart from '@/components/ui/axone-area-chart';
import Box from '@/components/ui/box';
import BoxInner from '@/components/ui/box-inner';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import Column from '@/components/ui/column';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import { mockChartData } from './mock-chart-data';


export default function Dashboard () {
  return (
    <PageContainer>
      <Row className=''>
        <Box className='w-1/2 mr-0 flex flex-row justify-between'>
          <Column className='w-2/3'>
            <Title className='mb-5'>Staking Rewards</Title>
            <Text className='mb-5'>By staking your AXONE, you earn rewards and help keep the Axone network secure.</Text>
            <Row>
              <Button variant={'rounded'} className='mt-5 mr-2 text-base font-bold'>Delegate Now</Button>
              <ButtonWithIcon variant={'link'} className='mt-5 text-axone-orange text-base font-bold'>Calculate Rewards</ButtonWithIcon>
            </Row>
          </Column>
          <div className='relative flex items-center justify-center'>
            <Image src={'/staking.svg'} alt='Staking Rewards' width={166} height={166} />
            <div className='absolute flex flex-col justify-center items-center'>
              <Text className='text-xl mb-0 text-axone-grey'>APS</Text>
              <Text className='text-xl mb-0 text-white font-bold'>15.68%</Text>
            </div>
          </div>
        </Box>

        <Box className='w-1/2 flex flex-row justify-between'>
          <Column className='w-2/3'>
            <Title className='mb-5'>Governance</Title>
            <Text className='mb-5'>Discover and participate in the governance of our AXONE protocol.</Text>
            <Button variant={'rounded'} className='mt-5 mr-2 text-base font-bold w-64'>Open Governance</Button>
          </Column>
          <Image src={'/governance.svg'} alt='Governance' width={200} height={200} />
        </Box>
      </Row>

      <Row className='p-6 pt-0'>
        <Box className='w-2/3 m-0 mr-6 h-[50%]'>
          <Row className='mb-10 items-center'>
            <Title className='mr-40'>Overview</Title>
            <Row className='w-2/4 justify-around '>
              <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>All</Text>
              <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>Day</Text>
              <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>Week</Text>
              <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-orange font-bold'>Month</Text>
              <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>3 Month</Text>
              <Text className='cursor-pointer  hover:text-white mb-0 mx-2 text-axone-khaki'>Year</Text>
            </Row>
          </Row>

          <BoxInner className='h-[384px] py-5'>
            <AxoneAreaChart data={mockChartData} />
          </BoxInner>

          <Row className='mt-10'>
            <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>$44.05</Title>
              <Text className='uppercase text-axone-red'>
              -2.34%
              </Text>
              <Text className='uppercase text-axone-khaki'>
              Price
              </Text>
            </BoxInner>
            <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>$3.894.05M</Title>
              <Text className='uppercase text-axone-red'>
              -2.34%
              </Text>
              <Text className='uppercase text-axone-khaki'>
              Market Cap
              </Text>
            </BoxInner>
            <BoxInner className='pt-5 pb-3 w-1/4 mr-10 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>$531.4M</Title>
              <Row className='justify-center items-center'>
                <Text className='uppercase text-axone-khaki mr-3'>
              Volume
                </Text>
                <Text className='bg-axone-dark-blue px-[2px] text-axone-khaki'>24H</Text>
              </Row>
            </BoxInner>
            <BoxInner className='pt-5 pb-3 w-1/4 h-36 flex-col justify-between items-center'>
              <Title className='mt-2 mb-0'>15.71%</Title>
              <Text className='uppercase text-axone-khaki'>
              APR
              </Text>
            </BoxInner>
          </Row>
        </Box>
        <Column className='w-1/3'>
          {/* Temporary block with navigation to UI-Kit - content will be replaced later*/}
          <Box className='h-1/2 m-0 mb-6'>
            <Text className='mb-10 uppercase'>UI-KIT</Text>
            <Text className='mb-6'>Here you can navigate to UI-kit</Text>
            <Link href='/ui-kit'>
              <Button variant={'rounded'} className='w-full mb-4'>Show</Button>
            </Link>
          </Box>
          {/* Temporary empty block - content will be replaced later */}
          <Box className='h-1/2 m-0'>
            <Text className='mb-10 uppercase'>EMPTY BLOCK</Text>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  );
}
