'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { useEnvironment } from '@/context/environment-context';
import { SingleBlockData, useSingleValidatorUptime, ValidatorUptimeData } from '@/hooks/use-single-validator-uptime';
import { cn } from '@/lib/utils';

type UptimeBlockItemProps = {
  size?: 'large' | 'small';
  type?: 'signed' | 'proposed' | 'missed' | string;
};

const UptimeBlockItem: FC<UptimeBlockItemProps> = ({ size = 'large', type = 'signed' }) => {
  return(
    <div className={cn('rounded-md flex justify-center items-center',
      {
        'w-8 h-8' : size === 'large',
        'w-6 h-6': size === 'small',
        'bg-axone-khaki': type === 'signed',
        'bg-axone-orange': type === 'proposed',
        'bg-axone-bg-dark border border-axone-khaki': type === 'missed',
      })}>
      <X className={cn('text-axone-khaki hidden', { 'flex': type === 'missed', 'w-5 h-5': size === 'small', 'w-7 h-7': size === 'large' })} />
    </div>
  );
};

const UptimeBlock = () => {
  const { address } = useParams();
  const { socket } = useEnvironment();
  const { data, isLoading } = useSingleValidatorUptime(address);
  const [blocks, setBlocks] = useState<ValidatorUptimeData>({ blocks: [], current: '0' });

  useEffect(() => {
    if (!isLoading && data) {
      setBlocks(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (!isLoading && data) {
      socket.connect();
      socket.on('connect', () => console.log('connected uptime to', socket.id));
      socket.on(`uptime.${address}`, (block: SingleBlockData[]) => {
        console.log('uptime', block);
        setBlocks((prev: ValidatorUptimeData) => {
          const newData = {
            ...prev,
            blocks: prev.blocks.length >= 60
              ? [...prev.blocks.slice(0, -block.length), ...block]
              : [...prev.blocks, ...block]
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
  }, [address, data, isLoading, socket]);

  const missedBlocks = blocks?.blocks.filter((block) => block.status === 'Missed').length;
  const proposedBlocks = blocks?.blocks.filter((block) => block.status === 'Proposed').length;
  const signedBlocks = blocks?.blocks.filter((block) => block.status === 'Signed').length;
  return (
    <Box className='flex-col p-6 mb-4'>
      <Row className='justify-between items-center mb-4'>
        <Title>Uptime</Title>
        <Title className='text-axone-grey font-normal tracking-tighter'>Last 60 Blocks</Title>
      </Row>
      <div className='flex flex-row flex-wrap gap-2 mb-6'>
        {
          blocks?.blocks.map((block) => {
            return (
              <motion.div
                key={block.signature}
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <UptimeBlockItem type={block.status?.toLowerCase() || 'signed'} />
              </motion.div>
            );
          })
        }
      </div>
      <Row className='justify-between lg:items-center'>
        <div className='flex flex-col lg:flex-row justify-start gap-4 w-2/4'>
          <Row className='items-center gap-2'><UptimeBlockItem size='small' type='proposed' /><Text className='mb-0'>Proposed: {proposedBlocks}</Text></Row>
          <Row className='items-center gap-2'><UptimeBlockItem size='small' type='signed' /><Text className='mb-0'>Signed: {signedBlocks}</Text></Row>
          <Row className='items-center gap-2'><UptimeBlockItem size='small' type='missed' /><Text className='mb-0'>Missed: {missedBlocks}</Text></Row>
        </div>
        <Text className='mt-1 lg:mt-0'>Current: {data?.current || 0}</Text>
      </Row>
    </Box>
  );
};

export { UptimeBlock };