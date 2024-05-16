'use client';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import Row from '@/components/ui/row';

const MyDelegationInfoBlock = () => {
  return (
    <Box className='w-full lg:w-[380px] m-0 relative'>
      <Title className='mb-6'>My Delegation Info</Title>
      <Row className='gap-2'>
        <Text>My Delegation</Text>
        <AxoneTooltip iconColor='text-axone-khaki' content='My Delegation' />
      </Row>
      <Row className='gap-2 mb-4'>
        <p className='text-40 text-white'>0.00</p>
        <p className='text-40 text-axone-khaki'>AXONE</p>
      </Row>
      <Row className='gap-4'>
        <Button className='w-1/2' variant={'rounded'}>Delegate</Button>
        <Button className='w-1/2 border-axone-khaki text-axone-khaki' variant={'rounded'}>Unbond</Button>
      </Row>

      <div className='w-full border-b-2 border-b-axone-box-border my-8'></div>

      <Row className='gap-2'>
        <Text>My Earnings</Text>
        <AxoneTooltip iconColor='text-axone-khaki' content='My Earnings' />
      </Row>
      <Row className='gap-2 mb-4'>
        <p className='text-40 text-white'>0.00</p>
        <p className='text-40 text-axone-khaki'>AXONE</p>
      </Row>
      <Row className='gap-4'>
        <Button className='w-1/2 border-axone-khaki text-axone-khaki' variant={'rounded'}>Claim</Button>
      </Row>

      <div className='w-full border-b-2 border-b-axone-box-border mt-8 mb-10'></div>

      <ButtonWithIcon variant='rounded' className=' absolute bottom-8 left-6 right-6'>View My Wallet</ButtonWithIcon>
    </Box>
  );
};

export { MyDelegationInfoBlock };