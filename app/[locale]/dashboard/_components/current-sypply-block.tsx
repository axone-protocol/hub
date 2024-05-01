import { useTranslations } from 'next-intl';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Column from '@/components/ui/column';

export default function CurrentSupplyBlock () {
  const t  = useTranslations('Dashboard');
  return (
    <Box className='h-1/2 m-0 flex flex-col justify-between'>
      <Text className='mb-5 uppercase m-0'>{t('CurrentSupply')}</Text>
      <div className='flex flex-col items-end md:flex-row md:justify-between py-8 md:py-0'>
        <p className='text-4xl tracking-tighter text-axone-white mb-0'>2,847,432.80</p>
        <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
      </div>
      <Column className='justify-end'>
        <Text className='text-axone-grey tracking-tighter uppercase mb-0'>Updated 34 seconds ago</Text>
      </Column>
    </Box>
  );
}