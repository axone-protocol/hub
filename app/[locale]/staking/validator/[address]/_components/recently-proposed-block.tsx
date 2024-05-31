'use client';
import { differenceInSeconds, formatDistanceToNow } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { useEnvironment } from '@/context/environment-context';
import { SingleProposedBlock, useSingleValidatorProposedBlocks, ValidatorProposedBlocksData } from '@/hooks/use-single-validator-proposed-blocks';

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
  const { socket } = useEnvironment();
  const { data, isLoading } = useSingleValidatorProposedBlocks(address);
  const [blocks, setBlocks] = useState<ValidatorProposedBlocksData>({ recentlyProposedBlocks: [], total: '0' });

  useEffect(() => {
    if (!isLoading && data) {
      setBlocks(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (!isLoading && data) {
      socket.connect();
      socket.on('connect', () => console.log('connected to', socket.id));
      socket.on('new_block', (block: SingleProposedBlock) => {
        setBlocks((prev: ValidatorProposedBlocksData) => {
          const newData = {
            ...prev,
            recentlyProposedBlocks: [block, ...prev.recentlyProposedBlocks]
          };
          return newData;
        });
      });
      socket.on('disconnect', () => console.log('disconnected'));
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [data, isLoading, socket]);

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
          isLoading
            ? <div className='flex w-full h-full items-center justify-center'><Spinner /></div>
            : blocks?.recentlyProposedBlocks.map((block) => {
              return (
                <Row key={block.blockHash} className='p-6 justify-between even:bg-axone-dark-blue-3'>
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