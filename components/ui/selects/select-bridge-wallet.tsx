'use client';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Text } from '@/components/typography';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import LogoDarkMobile from '../logo-dark-mobile';
import Row from '../row';

type BridgeWalletsSelectProps = {
  selected: string;
  setSelected: (value: string) => void;
};

const BridgeWalletsSelect: FC<BridgeWalletsSelectProps> = ({ selected, setSelected }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setSelected(value);
  };

  return (
    <Select onOpenChange={() => setOpen(prev => !prev)} onValueChange={handleChange} value={selected}>
      <SelectTrigger className={cn('justify-start w-[200px] relative -top-[7px]', { 'bg-axone-bg-dark': open })}>
        <Row className={cn('items-center gap-2 justify-start transition-all duration-500 ease-in-out transform')}>
          <SelectValue />
        </Row>
        <SelectIcon asChild>
          <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent className='shadow-lg'>
        <SelectGroup>
          <SelectItem value='injective'>
            <Row className={cn('items-center gap-2 justify-start transition-all duration-500 ease-in-out transform')}>
              <Image src={'/icons/wallets/keplr.svg'} alt='image' width={25} height={25} className='rounded-full' />
              <Text className='mb-0 uppercase'>Injective</Text>
            </Row>
          </SelectItem>
          <SelectItem value='osmosis'>
            <Row className={cn('items-center gap-2 justify-start transition-all duration-500 ease-in-out transform')}>
              <Image src={'/icons/wallets/ninji.svg'} alt='image' width={25} height={25} className='rounded-full' />
              <Text className='mb-0 uppercase'>Osmosis</Text>
            </Row>
          </SelectItem>
          <SelectItem value='andromeda'>
            <Row className={cn('items-center gap-2 justify-start transition-all duration-500 ease-in-out transform')}>
              <Image src={'/icons/wallets/okx.svg'} alt='image' width={25} height={25} className='rounded-full' />
              <Text className='mb-0 uppercase'>Andromeda</Text>
            </Row>
          </SelectItem>
          <SelectItem value='axone'>
            <Row className={cn('items-center gap-2 justify-start transition-all duration-500 ease-in-out transform')}>
              <LogoDarkMobile className='w-6 h-6' />
              <Text className='mb-0 uppercase'>Axone</Text>
            </Row>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );};

export { BridgeWalletsSelect };