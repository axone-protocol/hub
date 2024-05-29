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
import Spinner from '@/components/ui/spinner';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';
import { cn } from '@/lib/utils';

const TransferBlock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(5);
  const [destination, setDestination] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const { balance, isFetchingBalance, balanceDenom, makeTransaction, isTransactionPending } = useAxonePayments();

  const onConfirm = async () => {
    if (!amount || !destination) {
      alert('Please fill all fields');
      return;
    }
    if (isNaN(amount) || amount < 5 || amount > 200000) {
      setAmount(5);
      alert('Amount must be a valid number with min 5 and max 200000');
      return;
    }
    if (amount > balance.toNumber()) {
      alert('Insufficient funds');
      return;
    }
    if (destination.length < 40 || !destination.startsWith('okp4')) {
      alert('Invalid address');
      return;
    }
    const data = {
      amount,
      destination,
      memo
    };
    await  makeTransaction(data);
    setDestination('');
    setMemo('');
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
  };

  return (
    <Box className='w-full lg:w-1/3 my-0 mx-0 mt-0 lg:mt-6 relative'>
      <div className={cn('absolute hidden', {
        'flex flex-row w-full h-full top-0 left-0 rounded-lg opacity-45 right-0 bottom-0 bg-axone-bg-dark text-red-800 items-center justify-center': isTransactionPending,
      })}>
        <Spinner />
      </div>
      <div className='flex flex-col lg:flex-row justify-between mb-10 lg:items-center'>
        <Title>Transfer</Title>
      </div>
      <Column className='justify-center items-center'>
        <Row className='justify-center items-center mb-2 gap-4'>
          <Text className='uppercase mb-0'>Available to transfer</Text>
          <AxoneTooltip content='Your available amount to transfer to a different address on Axone' />
        </Row>
        <Text className='uppercase'>{isFetchingBalance ? '0.00' : balance.toNumber().toFixed(2)} {balanceDenom || 'Axone'}</Text>
      </Column>
      <Column className='gap-6'>

        <div className='flex flex-col'>
          <Label className='text-white mb-2'>Asset</Label>
          <Select value='axone' onOpenChange={() => setOpen(prev => !prev)}>
            <SelectTrigger className={cn('w-full h-10 bg-axone-bg-dark rounded-md text-sm', { 'bg-axone-bg-dark': open })}>
              <SelectValue placeholder='Choose Asset' />
              <SelectIcon asChild>
                <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent className='shadow-lg'>
              <SelectGroup>
                <SelectItem value='axone'>AXONE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-white' htmlFor='amount'>Amount</Label>
          <Input
            isRequired={true}
            type='text'
            id='amount'
            placeholder='Enter Amount'
            value={amount}
            onChange={onAmountChange}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Row className='items-center gap-4'>
            <Label className='text-white' htmlFor='destination'>Axone Address Destination</Label>
            <AxoneTooltip content='The Axone address to which you are sending tokens' />
          </Row>
          <Input
            isRequired={true}
            type='text'
            id='destination'
            placeholder='axone4f2s...'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-white' htmlFor='destination'>Memo</Label>
          <Input
            isRequired={false}
            type='text'
            id='destination'
            placeholder='Memo'
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
        <Button onClick={onConfirm} variant={'rounded'} className='w-full mt-6'>Transfer</Button>
      </Column>

    </Box>
  );
};

export { TransferBlock };