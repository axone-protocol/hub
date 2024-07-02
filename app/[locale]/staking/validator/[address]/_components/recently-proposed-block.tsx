'use client';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { useEnvironment } from '@/context/environment-context';
import { SingleProposedBlock, ValidatorProposedBlocksDTO } from '@/hooks/dto/validator-proposed-blocks.dto';
import { useSingleValidatorProposedBlocks } from '@/hooks/use-single-validator-proposed-blocks';
import { useSocket } from '@/hooks/use-socket';
import { formatTimestamp } from '@/lib/utils';

// TODO: Move this to a shared utility file in case if it will be used in other places
const shortenHash = (str: string, startLength: number = 6, endLength: number = 6): string => {
  if (str.length <= startLength + endLength) {
    return str;
  }
  return str.slice(0, startLength) + '...' + str.slice(-endLength);
};

const RecentlyProposedBlock = () => {
  const t = useTranslations('Staking');
  const { address } = useParams();
  const { socket } = useEnvironment();
  const { data, isLoading } = useSingleValidatorProposedBlocks(address);
  const [blocks, setBlocks] = useState<ValidatorProposedBlocksDTO>({ recentlyProposedBlocks: [], total: '0' });

  const newBlockHandler = useCallback((block: SingleProposedBlock) => {
    setBlocks((prev: ValidatorProposedBlocksDTO) => {
      const newData = {
        ...prev,
        recentlyProposedBlocks: [block, ...prev.recentlyProposedBlocks]
      };
      return newData;
    });
  }, []);

  useSocket({
    socket,
    eventName: `proposed_block.${address}`,
    eventHandler: newBlockHandler,
    isLoading
  });

  useEffect(() => {
    if (!isLoading && data) {
      setBlocks(data);
    }
  }, [isLoading, data]);

  return (
    <Box className='m-0'>
      <Row className='justify-between items-center mb-6'>
        <Title>{t('RecentlyProposedBlocks')}</Title>
      </Row>
      <Row className='px-6 justify-between mb-3'>
        <Text className='w-1/4 text-white mb-0 text-left'>{t('Height')}</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>{t('BlockHash')}</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>TXS</Text>
        <Text className='w-1/4 text-white mb-0 text-left'>{t('Time')}</Text>
      </Row>
      <BoxInner className='flex flex-col h-[140px] overflow-y-auto scrollbar scrollbar-thin'>
        {
          isLoading
            ? <div className='flex w-full h-full items-center justify-center'><Spinner /></div>
            : blocks?.recentlyProposedBlocks.map((block, i) => {
              return (
                <motion.div
                  className='even:bg-axone-dark-blue-3'
                  key={block.blockHash + i}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Row className='p-6 justify-between'>
                    <Text className='w-1/3 text-axone-orange mb-0 text-left'>{block.height || ''}</Text>
                    <Text className='w-1/3 text-axone-orange mb-0 text-left'>{shortenHash(block.blockHash)}</Text>
                    <Text className='w-1/3 text-axone-khaki mb-0 text-left'>{block.txs}</Text>
                    <Text className='w-1/3 text-axone-khaki mb-0 text-left'>{formatTimestamp(block.time)}</Text>
                  </Row>
                </motion.div>
              );
            })
        }
      </BoxInner>
    </Box>
  );
};

export { RecentlyProposedBlock };