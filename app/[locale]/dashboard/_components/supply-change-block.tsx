import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Text } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import Column from '@/components/ui/column';
import Row from '@/components/ui/row';
import TimeframeSelect from '@/components/ui/select-timeframe';

export default function SupplyChangeBlock () {
  const t  = useTranslations('Dashboard');
  return (
    <Box className='h-1/2 m-0 flex flex-col justify-between mb-6'>
      <Row className='justify-between'>
        <Text className='mb-5 uppercase'>{t('SupplyChange')}</Text>
        <TimeframeSelect />
      </Row>
      <Row className='justify-between'>
        <p className='text-4xl tracking-tighter text-axone-orange mb-0'>-2,847,432.80</p>
        <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
      </Row>
      <Row className='justify-between mt-10'>
        <Column className='justify-end'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-0'>Updated 34 seconds ago</Text>
        </Column>
        <Column>
          <Row className='justify-between items-center mb-3'>
            <Image src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
            <Text className='text-axone-grey mb-0'>19.547.04</Text>
            <Text className='text-axone-khaki mb-0'>AXONE</Text>
            <Text className='text-axone-grey mb-0'>Burned</Text>
          </Row>
          <Row className='justify-between items-center'>
            <Image src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
            <Text className='text-axone-grey mb-0'>19.547.04</Text>
            <Text className='text-axone-khaki mb-0'>AXONE</Text>
            <Text className='text-axone-grey mb-0'>Burned</Text>
          </Row>
        </Column>
      </Row>
    </Box>
  );
}