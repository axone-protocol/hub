'use client';

import { useState } from 'react';
import { Text } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import { cn } from '@/lib/utils';

const ProposalParamsTable = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <BoxInner className='flex flex-col lg:flex-row gap-10 p-6 items-start mb-8 overflow-x-auto px-6'>
      <div className='flex flex-col w-[1000px] lg:w-full'>
        <div className='flex flex-row mb-6'>
          <div className='flex flex-row w-[140px]'>
            <Text className='hidden'>Params</Text>
          </div>
          <p onClick={() => setActiveTab(0)} className={cn('cursor-pointer border-b-2 border-b-axone-khaki pr-5 pb-3', { 'border-b-axone-orange text-axone-orange': activeTab === 0 })}>Code_upload_access</p>
          <p onClick={() => setActiveTab(1)} className={cn('cursor-pointer border-b-2 border-b-axone-khaki pl-5 pb-3', { 'border-b-axone-orange text-axone-orange': activeTab === 1 })}>Instantiate_default_permission</p>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row items-start'>
            <Text className='text-axone-khaki w-[140px]'>Params</Text>
            <div className='flex flex-col pl-3'>
              {
                activeTab === 0 ? (
                  <>
                    <div className='flex flex-row'>
                      <Text className='text-axone-khaki mb-6 w-[200px]'>Permission</Text>
                      <Text className='text-axone-khaki mb-6 flex-grow'>AnyOfAddresses</Text>
                    </div>
                    <div className='flex flex-row'>
                      <Text className='text-axone-khaki w-[200px] mb-0'>Addresses</Text>
                      <Text className='text-axone-khaki flex-grow mb-0 break-words'>{'[ "okp414pjwgekpxtuwfkpr0nvj8eek49llfy60szlh6d", "okp41zj7awem0sh5k4rr3j0fzzjs7afvxqffyrl73x8" ]'}</Text>
                    </div>
                  </>
                ) : (
                  <div className='flex flex-row'>
                    <Text className='text-axone-khaki mb-6 w-[200px]'>Everybody</Text>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </BoxInner>
  );
};

export { ProposalParamsTable };