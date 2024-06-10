'use client';
import { History } from 'lucide-react';
import { useState } from 'react';
import { Text,Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { cn } from '@/lib/utils';
import { NoTransactionsFound } from './no-transactions-found';
import { TransactionsHistoryList } from './transactions-history-list';

const HistoryBlock = () => {
  const [isEmptyHistrory, setIsEmptyHistrory] = useState(true);
  return(
    <Box >
      <div className='flex flex-col lg:flex-row justify-start mb-8 lg:items-center gap-2 lg:gap-20'>
        <div className='flex flex-row items-center gap-2'>
          <Title>History</Title>
          <History size={20} className='text-axone-orange' />
        </div>

        <div className='flex flex-row w-full flex-grow lg:w-[700px] overflow-x-auto justify-around gap-2'>
          <Text
            className={cn('mb-0 mr-2 cursor-pointer whitespace-nowrap', { 'text-axone-orange': true })}
            onClick={() => setIsEmptyHistrory(false)}
          >
              All [0]
          </Text>
          <Text
            onClick={() => setIsEmptyHistrory(true)}
            className={cn('mb-0 mr-2 cursor-pointer whitespace-nowrap', { 'text-axone-orange': false })}
          >
              In Progress [0]
          </Text>
          <Text
            className={cn('mb-0 cursor-pointer whitespace-nowrap', { 'text-axone-orange':false })}
          >
              Completed [0]
          </Text>
          <Text
            className={cn('mb-0 cursor-pointer whitespace-nowrap', { 'text-axone-orange':false })}
          >
              Failed/Cancelled [0]
          </Text>
        </div>
      </div>

      {
        isEmptyHistrory
          ? <NoTransactionsFound />
          : <TransactionsHistoryList />
      }
    </Box>
  );
};

export { HistoryBlock };