'use client';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';
import { DelegateModal } from '@/components/ui/modals/delegate/delegate-modal';

type FilterButtonProps = {
  onClick?: () => void;
  text: string;
  width?: string; // tailwind class
  tooltip?: boolean;
  tooltipText?: string;
};

const FilterButton: FC<FilterButtonProps> = ({ onClick, text, width = 'w-1/6', tooltip = false, tooltipText = '' }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setActive(prev => !prev);
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <div className={`flex flex-row items-center gap-2 pl-4 cursor-pointer ${width}`} onClick={handleClick}>
      <Text className='mb-0'>{text}</Text>
      {tooltip ? <AxoneTooltip iconColor='text-axone-khaki' content={tooltipText} /> : null}
      <Image className={cn('relative bottom-[0px]', { 'rotate-180': active })} src='/icons/arrow-down-long.svg' width={10} height={10} alt='validator' />
    </div>
  );
};

const ValidatorItem = ({ isOdd = false, openDelegateModal = () => null }) => {
  const router = useRouter();
  const locale = useLocale();

  const goToDetails = useCallback(() => {
    router.push(`/${locale}/staking/validator`);
  }, [locale, router]);

  return (
    <Row className={cn('justify-between items-center p-4 group', { 'bg-axone-dark-blue-3': isOdd })}>
      <div className='flex flex-row items-center gap-4 w-1/4'>
        <Image src='/icons/wallets/ninji.svg' className='rounded-full' width={38} height={38} alt='AXONE' />
        <div className='flex flex-col cursor-pointer' onClick={goToDetails}>
          <Text className='mb-0'>Ubik Capital</Text>
          <Text className='mb-0 text-axone-khaki'>axn...ty028k</Text>
        </div>
        <AxoneTooltip iconColor='text-axone-khaki' content='The Axone address to which you are sending tokens' />
      </div>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>331,916,08 <span className='text-axone-khaki'>axone</span></Text>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>5,00%</Text>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>8,41%</Text>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>96,46%</Text>
      <Button onClick={openDelegateModal} variant={'link'} className='mb-0 text-axone-orange'>Delegate Now</Button>
    </Row>
  );
};

const ValidatorsBlock = () => {
  const [isDelegateOpen, setDelegateOpen] = useState<boolean>(false);

  return (
    <Box className='w-full mb-0 mx-0 lg:mx-0'>
      <div className='flex flex-row justify-between mb-8 lg:items-center gap-4'>
        <Title>Validators</Title>
        <div className='flex flex-col w-[650px] lg:flex-row relative mt-6 lg:mt-0'>
          <SearchIcon  size={20} className='absolute top-2 left-2 text-axone-khaki' />
          <Input type='search' id='validators' className='pl-10' placeholder='Search Validators' />
        </div>
        <div className='flex flex-row justify-center gap-2'>
          <Text className='mb-0 mr-2 cursor-pointer text-axone-orange'>Active [16]</Text>
          <Text className='mb-0 mr-2 cursor-pointer'>Inactive [23]</Text>
          <Text className='mb-0 cursor-pointer'>Jailed [1]</Text>
        </div>
      </div>

      <Row className='justify-between px-4 mb-2'>
        <FilterButton width='w-1/4' text='Validator' />
        <FilterButton text='Staked Amount' />
        <FilterButton text='Commission' />
        <FilterButton text='Voting Power' />
        <FilterButton text='Uptime' tooltip tooltipText='Uptime percentage based on the latest 10K blocks' />
        <Text className='w-[130px] opacity-0'>.</Text>
      </Row>

      <BoxInner className='flex-col pb-4 mb-4'>
        <ValidatorItem openDelegateModal={() => setDelegateOpen(true)} />
        <ValidatorItem openDelegateModal={() => setDelegateOpen(true)} isOdd />
        <ValidatorItem openDelegateModal={() => setDelegateOpen(true)} />
        <ValidatorItem openDelegateModal={() => setDelegateOpen(true)} isOdd />
      </BoxInner>
      <DelegateModal isOpen={isDelegateOpen} setOpen={setDelegateOpen} />
    </Box>
  );
};

export { ValidatorsBlock };