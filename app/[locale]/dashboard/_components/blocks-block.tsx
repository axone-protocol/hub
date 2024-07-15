'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { Text } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { useEnvironment } from '@/context/environment-context';
import { ProposedBlockDTO } from '@/hooks/dto/proposed-block.dto';
import { useBlocksStore, useProposedBlocks } from '@/hooks/use-blocks';
import { useSocket } from '@/hooks/use-socket';
import { formatTimestamp, shortenHash } from '@/lib/utils';

const BlocksBlock = () => {
  const t = useTranslations('Index');
  const { socket } = useEnvironment();
  const { data, isLoading, isFetching, isError, isLoadingError } = useProposedBlocks();
  const { blocks, setBlocks, addBlock } = useBlocksStore();

  const newBlockHandler = useCallback((block: ProposedBlockDTO) => {
    addBlock(block);
  }, [addBlock]);

  useSocket({
    socket,
    eventName: 'proposed_block',
    eventHandler: newBlockHandler,
    isLoading
  });

  useEffect(() => {
    if (!isLoading && data && blocks.length === 0) {
      setBlocks(data.slice(0, 4));
    }
  }, [isLoading, data, setBlocks, blocks.length]);

  return (
    <Box className='m-0 flex flex-col justify-between mb-0 lg:mb-0 lg:w-1/2 xl:w-full xl:h-[695px]'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>{t('Blocks')}</Text>
      </Row>

      <div className='flex flex-col justify-start gap-6 h-full overflow-y-hidden scrollbar scrollbar-none'>
        {
          isLoading || isFetching || isError || isLoadingError
            ? <div className='flex w-full h-full items-center justify-center'><Spinner /></div>
            : <AnimatePresence>
              {
                blocks?.map((block) => (
                  <motion.div
                    key={block.blockHash}
                    initial={{ opacity: 0, scale: 1, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1, y: -100 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BoxInner className='flex flex-col gap-6 p-6'>
                      <div className='flex justify-between items-center'>
                        <Text className='text-axone-khaki'>{shortenHash(block.blockHash)}</Text>
                        <Text className='text-axone-khaki'>{formatTimestamp(block.time)}</Text>
                      </div>
                      <div className='flex justify-start items-center gap-4'>
                        {block.img ? <Image className='rounded-full' src={block.img} width={20} height={20} alt='eth' /> : <div className='w-5 h-5 rounded-full bg-axone-blue' />}
                        <Text className='text-axone-grey mb-0 text-16'>{block.name}</Text>
                      </div>
                    </BoxInner>
                  </motion.div>
                ))
              }
            </AnimatePresence>}
      </div>
    </Box>
  );
};

export { BlocksBlock };