'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Text } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';

const BlocksBlock = () => {
  const t = useTranslations('Index');
  return (
    <Box className='m-0 flex flex-col justify-between mb-0 lg:mb-0 lg:w-1/2 xl:w-full xl:h-full'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>{t('Blocks')}</Text>
      </Row>

      <div className='flex flex-col justify-start gap-6 h-full'>
        <BoxInner className='flex flex-col gap-6 p-6'>
          <div className='flex justify-between items-center'>
            <Text className='text-axone-khaki'>#B21475478</Text>
            <Text className='text-axone-khaki'>12 Sec ago</Text>
          </div>
          <div className='flex justify-start items-center gap-4'>
            <Image className='rounded-full' src='/icons/wallets/bitget.svg' width={20} height={20} alt='eth' />
            <Text className='text-axone-grey mb-0 text-16'>Ubik Capital</Text>
          </div>
        </BoxInner>
      </div>
    </Box>
  );
};

export { BlocksBlock };