import Image from 'next/image';
import { Text } from '@/components/typography';
import { BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import Row from '@/components/ui/row';

const TransactionsHistoryList = () => {
  return (
    <div className='flex flex-col w-full overflow-auto'>
      <BoxInner className='flex-col w-[700px] lg:w-full '>
        <div className='flex flex-row justify-between items-center p-4 even:bg-axone-dark-blue-3'>
          <Row className='gap-4 w-full'>
            <Image className='rounded-full' src='/icons/wallets/torus.svg' width={40} height={40} alt='bridge-icon' />
            <Column>
              <Text className='mb-0'>deposit from hgvf5412...g47fdc41g</Text>
              <Text className='mb-0 text-axone-khaki text-[12px]'>Completed</Text>
            </Column>
          </Row>
          <Column>
            <Text className='mb-0'>0.10 Axone</Text>
            <Text className='mb-0 text-axone-khaki text-[12px]'>2 Minutes ago</Text>
          </Column>
          <Button variant={'link'} className='mb-0 text-axone-orange'>
            Info
            <Image className='ml-2' src='/icons/arrow-right-long.svg' width={16} height={16} alt='AXONE' />
          </Button>
        </div>
        <div className='flex flex-row justify-between items-center p-4 even:bg-axone-dark-blue-3'>
          <Row className='gap-4 w-full'>
            <Image className='rounded-full' src='/icons/wallets/okx.svg' width={40} height={40} alt='bridge-icon' />
            <Column>
              <Text className='mb-0'>deposit from hgvf5412...g47fdc41g</Text>
              <Text className='mb-0 text-axone-khaki text-[12px]'>Completed</Text>
            </Column>
          </Row>
          <Column>
            <Text className='mb-0'>0.10 Axone</Text>
            <Text className='mb-0 text-axone-khaki text-[12px]'>2 Minutes ago</Text>
          </Column>
          <Button variant={'link'} className='mb-0 text-axone-orange'>
          Info
            <Image className='ml-2' src='/icons/arrow-right-long.svg' width={16} height={16} alt='AXONE' />
          </Button>
        </div>
      </BoxInner>
    </div>
  );
};

export { TransactionsHistoryList };