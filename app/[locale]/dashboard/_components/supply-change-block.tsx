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
      <div className='flex flex-col items-end md:flex-row md:justify-between'>
        <p className='text-4xl tracking-tighter text-axone-orange mb-0'>-2,847,432.80</p>
        <p className='text-4xl tracking-tighter text-axone-khaki mb-0'>AXONE</p>
      </div>
      <Row className='justify-between mt-10'>
        <Column className='justify-end w-auto'>
          <Text className='text-axone-grey tracking-tighter uppercase mb-0'>Updated 34 seconds ago</Text>
        </Column>

        <Column className='w-auto'>
          <Row className='justify-between items-start mb-3'>
            <Image className='mr-2' src={'/icons/fire.svg'} alt='Refresh' width={20} height={20} />
            <div className='flex flex-col md:flex-row'>
              <Text className='text-axone-grey mb-0'>19.547.04</Text>
              <Text className='text-axone-grey mb-0  md:flex md:justify-between'><Text className='text-axone-khaki mb-0 md:px-1'>AXONE</Text> Burned</Text>
            </div>
          </Row>

          <Row className='justify-between items-start'>
            <Image className='mr-2' src={'/icons/water-drop.svg'} alt='Refresh' width={20} height={20} />
            <div className='flex flex-col md:flex-row'>
              <Text className='text-axone-grey mb-0'>19.547.04</Text>
              <Text className='text-axone-grey mb-0 md:flex md:justify-between'><Text className='text-axone-khaki mb-0 md:px-1'>AXONE</Text> Issued</Text>
            </div>
          </Row>
        </Column>

      </Row>
    </Box>
  );
}