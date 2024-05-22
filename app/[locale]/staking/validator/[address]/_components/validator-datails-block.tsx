'use client';
import { CircleCheckBig, CircleX, Copy } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';
import { useModal } from '@/context';
import { useSingleValidatorInfo } from '@/hooks/use-single-validator-info';
import { toast } from '@/hooks/use-toast';
import { ValidatorStatus } from '@/hooks/use-validators-list';


const ValidatorDetailsBlock = () => {
  const { address } = useParams();
  const { data: validatorData } = useSingleValidatorInfo(address);
  const { openDelegateModal } = useModal();

  const copyToClipboard = useCallback((address: string | string[]) => () => {
    if (!address) {
      return toast({
        action: (
          <Row className='items-center -ml-2'>
            <CircleX className='mr-3 text-axone-red' />
            {'Something went wrong, please try again later.'}
          </Row>
        )
      });
    };
    navigator.clipboard.writeText(`${address}`);
    toast({
      action: (
        <Row className='items-center -ml-2'>
          <CircleCheckBig className='mr-3 text-axone-orange' />
          {'Address copied to your clipboard'}
        </Row>
      )
    });
  }, []);

  return (
    <Box>
      <Row>
        <Title>Validator Details</Title>
      </Row>
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mt-6 lg:mb-10'>
        <div className='flex flex-row items-center gap-4 w-full lg:w-1/4 my-4 lg:my-0'>
          <div className='relative border rounded-full w-[60px] h-[60px] p-2'>
            <div className='relative w-full h-full p-[5px]'>
              <Image src={validatorData?.logo || '/icons/wallets/ninji.svg'} className='rounded-full' fill={true} alt='AXONE' />
            </div>
          </div>

          <div className='flex flex-col h-16 justify-between cursor-pointer'>
            <span className='w-[70px] text-center text-[12px] text-axone-khaki bg-axone-bg-dark p-1 rounded-md uppercase'>
              {validatorData?.status === ValidatorStatus.BONDED ? 'Active' : 'Inactive'}
            </span>
            <span className='text-20 text-white'>
              {validatorData?.description.moniker || 'Validator'}
            </span>
          </div>
        </div>

        <Button variant={'rounded'} onClick={openDelegateModal}>Delegate Now</Button>
      </div>

      <div className='w-full border-b-2 border-b-axone-box-border mt-6 mb-2 lg:my-0'></div>

      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6 my-10'>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>{Number(validatorData?.stakedAmount).toFixed(2) || 0.00}</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
            Total Staked
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>{Number(validatorData?.commission.rate).toFixed(2)}%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
            Commission Rate
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0 uppercase'>{validatorData?.votingPower || 0}%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
            Voting Power
          </Text>
        </BoxInner>

        <BoxInner className='py-5 w-full lg:w-1/4 h-32 flex-col justify-between items-center px-6'>
          <Title className='mt-2 mb-0'>{validatorData?.uptime || 0}%</Title>
          <Text className='text-axone-khaki mb-0 uppercase'>
            Uptime
          </Text>
        </BoxInner>
      </div>

      <BoxInner className='flex-col p-6 mb-4'>
        <div className='flex flex-col gap-4 lg:flex-row lg:justify-between items-center mb-10'>
          <div className='w-1/2'>
            <div className='flex flex-row gap-2'>
              <Title>Address</Title>
              <Copy
                className='mx-2 cursor-pointer hover:bg-axone-bg-dark'
                width={20}
                onClick={copyToClipboard(address)}
                stroke='white'
                strokeWidth={2}
                absoluteStrokeWidth
              />
            </div>
            <Text className='text-axone-khaki'>{address}</Text>
          </div>
          <div className='w-1/2'>
            <Title>Website</Title>
            <Text className='text-axone-khaki'>{validatorData?.description.website || ''}</Text>
          </div>
        </div>
        <div className='flex flex-col gap-4 lg:flex-row lg:justify-between items-start'>
          <div className='w-1/2'>
            <Title>Details</Title>
            <Text className='text-axone-khaki'>
              {validatorData?.description.details || 'No details provided'}
            </Text>
          </div>
          <div className='w-1/2'>
            <Title>Security Contact</Title>
            <Text className='text-axone-khaki'>{validatorData?.description.securityContact || ''}</Text>
          </div>
        </div>
      </BoxInner>
    </Box>
  );
};

export { ValidatorDetailsBlock };