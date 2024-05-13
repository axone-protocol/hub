'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Row from '@/components/ui/row';
import { Select, SelectContent, SelectGroup, SelectIcon, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const TransferBlock = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box className='w-full lg:w-1/3 my-0 mx-0 mt-0 lg:mt-6'>
      <div className='flex flex-col lg:flex-row justify-between mb-10 lg:items-center'>
        <Title>Transfer</Title>
      </div>
      <Column className='justify-center items-center'>
        <Row className='justify-center items-center mb-2 gap-4'>
          <Text className='uppercase mb-0'>Available to transfer</Text>
          <AxoneTooltip content='Your available amount to transfer to a different address on Axone' />
        </Row>
        <Text className='uppercase'>0.00</Text>
      </Column>
      <Column className='gap-6'>

        <div className='flex flex-col'>
          <Label className='text-white mb-2'>Asset</Label>
          <Select onOpenChange={() => setOpen(prev => !prev)}>
            <SelectTrigger className={cn('w-full h-10 bg-axone-bg-dark rounded-md text-sm', { 'bg-axone-bg-dark': open })}>
              <SelectValue placeholder='Choose Asset' />
              <SelectIcon asChild>
                <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent className='shadow-lg'>
              <SelectGroup>
                <SelectItem value='val1'>value</SelectItem>
                <SelectItem value='val2'>value2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-white' htmlFor='amount'>Amount</Label>
          <Input isRequired={true} type='text' id='amount' placeholder='Enter Amount' />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Row className='items-center gap-4'>
            <Label className='text-white' htmlFor='destination'>Axone Address Destination</Label>
            <AxoneTooltip content='The Axone address to which you are sending tokens' />
          </Row>
          <Input isRequired={true} type='text' id='destination' placeholder='axone4f2s...' />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-white' htmlFor='destination'>Memo</Label>
          <Input isRequired={true} type='text' id='destination' placeholder='Memo' />
        </div>
        <Button variant={'rounded'} className='w-full mt-6'>Transfer</Button>
      </Column>

    </Box>
  );
};

export { TransferBlock };