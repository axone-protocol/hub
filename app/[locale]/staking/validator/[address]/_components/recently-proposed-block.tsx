'use client';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { useSingleValidatorProposedBlocks } from '@/hooks/use-single-validator-proposed-blocks';

// TODO: Move this to a shared utility file in case if it will be used in other places
const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const secondsAgo = differenceInSeconds(new Date(), date);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }
  return formatDistanceToNow(date, { addSuffix: true });
};

// TODO: Move this to a shared utility file in case if it will be used in other places
const shortenHash = (str: string, startLength: number = 6, endLength: number = 6): string => {
  if (str.length <= startLength + endLength) {
    return str;
  }
  return str.slice(0, startLength) + '...' + str.slice(-endLength);
};

const RecentlyProposedBlock = () => {
  const { address } = useParams();
  const { data, isFetching: isFetchingData } = useSingleValidatorProposedBlocks(address);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    if (isFetchingData) {
      setIsFetching(true);
    } else {
      const timeoutId = setTimeout(() => setIsFetching(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isFetchingData]);

  return (
    <Box className='m-0'>
      <Row className='justify-between items-center mb-6'>
        <Title>Recently Proposed Blocks</Title>
      </Row>
      <Row className='px-6 justify-between mb-3'>
        <Text className='w-1/4 text-white mb-0 text-left'>Height</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>Block Hash</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>TXS</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>Time</Text>
      </Row>
      <BoxInner className='flex flex-col h-[140px] overflow-y-auto scrollbar scrollbar-thin'>
        {
          isFetching
            ? <div className='flex w-full h-full items-center justify-center'><Spinner /></div>
            : data?.recentlyProposedBlocks.map((block) => {
              return (
                <Row key={block.blockHash} className='p-6 justify-between'>
                  <Text className='w-1/3 text-axone-orange mb-0 text-left'>{block.height}</Text>
                  <Text className='w-1/3 text-axone-orange mb-0 text-left'>{shortenHash(block.blockHash)}</Text>
                  <Text className='w-1/3 text-axone-khaki mb-0 text-left'>{block.txs}</Text>
                  <Text className='w-1/3 text-axone-khaki mb-0 text-left'>{formatTimestamp(block.time)}</Text>
                </Row>
              );
            })
        }
      </BoxInner>
    </Box>
  );
};

export { RecentlyProposedBlock };