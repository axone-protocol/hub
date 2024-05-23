'use client';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { Text, Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { useSingleValidatorUptime } from '@/hooks/use-single-validator-uptime';
import { cn } from '@/lib/utils';

type UptimeBlockItemProps = {
  size?: 'large' | 'small';
  type?: 'signed' | 'proposed' | 'missed';
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
  const { data } = useSingleValidatorUptime(address);

  return (
    <Box className='flex-col p-6 mb-4'>
      <Row className='justify-between items-center mb-4'>
        <Title>Uptime</Title>
        <Title className='text-axone-grey font-normal tracking-tighter'>Last 60 Blocks</Title>
      </Row>
      <div className='flex flex-row flex-wrap gap-2 mb-6'>
        {
          data?.blocks.map((block, index) => {
            return <UptimeBlockItem type={index === 5 || index === 38 ? 'proposed' : index === 40 ? 'missed' : 'signed'} key={block.signature} />;
          })
        }
      </div>
      <Row className='justify-between lg:items-center'>
        <div className='flex flex-col lg:flex-row justify-start gap-4 w-2/4'>
          <Row className='items-center gap-2'><UptimeBlockItem size='small' type='proposed' /><Text className='mb-0'>Proposed: 1</Text></Row>
          <Row className='items-center gap-2'><UptimeBlockItem size='small' type='signed' /><Text className='mb-0'>Signed: 59</Text></Row>
          <Row className='items-center gap-2'><UptimeBlockItem size='small' type='missed' /><Text className='mb-0'>Missed: 0</Text></Row>
        </div>
        <Text className='mt-1 lg:mt-0'>Current: {data?.current || 0}</Text>
      </Row>
    </Box>
  );
};

export { UptimeBlock };