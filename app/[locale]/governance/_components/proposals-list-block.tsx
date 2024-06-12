'use client';
import { ArrowUpRight, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useCallback } from 'react';
import { Text,Title } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import { ColorBadge } from '@/components/ui/color-badge';
import { Input } from '@/components/ui/input';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';
import { GaugeChart } from './gauge-chart';
import { ProposalsTableSortingHeader } from './proposals-table-sorting-header';

const ProposalsListBlock = () => {
  const router = useRouter();
  const locale = useLocale();

  const goToDetails = useCallback(() => {
    router.push(`/${locale}/governance/proposal/123`);
  }, [locale, router]);
  return (
    <>
      <div className='flex flex-col items-center lg:flex-row gap-6'>
        <div className='flex flex-col w-full lg:w-[540px] lg:flex-row relative mt-0 lg:mt-0'>
          <SearchIcon size={20} className='absolute top-2 left-2 text-axone-khaki' />
          <Input type='search' id='proposals' className='pl-10' placeholder='Search Proposal' />
        </div>
        <div className='flex flex-row justify-start lg:justify-center gap-2 lg:gap-6 w-full overflow-x-auto'>
          <p className={cn('mb-0 mr-2 text-16 cursor-pointer text-axone-khaki', { 'text-axone-orange': true })}>
            All [2]
          </p>
          <p className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': false })}>
            Deposit [2]
          </p>
          <p className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': false })}>
            Voting [2]
          </p>
          <p className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': false })}>
            Passed [2]
          </p>
          <p className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': false })}>
            Rejected [2]
          </p>
        </div>
      </div>
      <div className='flex flex-col w-full overflow-auto'>
        <ProposalsTableSortingHeader activeFilter={null} />
        <BoxInner className='w-[900px] lg:w-full flex-col mb-4'>
          <Row onClick={goToDetails} className='h-[140px] cursor-pointer group p-4 items-center relative justify-between even:bg-axone-dark-blue-3'>
            <Text className='mb-0 w-[80px]'>379</Text>
            <div className='flex flex-col items-start w-[300px]'>
              <div className='flex flex-row items-center gap-4 mb-4'>
                <ColorBadge backgroundColor='#292929' textColor='#ffffff' text='Voting' className='px-2' />
                <ColorBadge backgroundColor='#CCD3D6' textColor='#071622' text='Wasm' className='px-2' />
              </div>
              <Title>Disbursement of OLP rewards for epoch ended on 18 March </Title>
            </div>
            <GaugeChart val={14} />
            <Text className='w-1/6 mb-0'>Msg Store Code</Text>
            <Text className='w-1/6 mb-0'>Voting Ends Tomorrow</Text>
            <div className='w-[200px] flex flex-row items-center gap-6'>
              <Text className='mb-0'>Proposed Apr 01 2024 18:26:12 UTC+02:00</Text>
              <ArrowUpRight className='h-12 w-12 text-axone-khaki group-hover:text-axone-orange' />
            </div>
          </Row>
          <Row className='h-[140px] cursor-pointer group p-4 items-center relative justify-between even:bg-axone-dark-blue-3'>
            <Text className='mb-0 w-[80px]'>379</Text>
            <div className='flex flex-col items-start w-[300px]'>
              <div className='flex flex-row items-center gap-4 mb-4'>
                <ColorBadge backgroundColor='#FB9501' textColor='#071622' text='Passed' className='px-2' />
                <ColorBadge backgroundColor='#CCD3D6' textColor='#071622' text='Wasm' className='px-2' />
              </div>
              <Title>Upload Ninza Contract - Referral </Title>
            </div>
            <GaugeChart val={74} />
            <Text className='w-1/6 mb-0'>Msg Store Code</Text>
            <Text className='w-1/6 mb-0'>Voting Ends Tomorrow</Text>
            <div className='w-[200px] flex flex-row items-center gap-6'>
              <Text className='mb-0'>Proposed Apr 01 2024 18:26:12 UTC+02:00</Text>
              <ArrowUpRight className='h-12 w-12 text-axone-khaki group-hover:text-axone-orange' />
            </div>
          </Row>
        </BoxInner>
      </div>
    </>
  );
};

export { ProposalsListBlock };