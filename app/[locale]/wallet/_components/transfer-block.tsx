'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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

const formSchema = z.object({
  amount: z.string()
    .transform(value => parseFloat(value))
    .refine(value => !isNaN(value) && value >= 5 && value <= 200000, {
      message: 'Amount must be a valid number between 5 and 200000',
    }),
  destination: z.string().min(40, 'Invalid address').refine(value => value.startsWith('okp4'), 'Invalid address'),
  memo: z.string().optional(),
});

const TransferBlock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { balance, isFetchingBalance, balanceDenom, makeTransaction, isTransactionPending } = useAxonePayments();

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });


  const onConfirm = handleSubmit(async (values) => {
    if (values.amount > balance.toNumber()) {
      alert('Insufficient funds');
      return;
    }

    const data = {
      amount: values.amount,
      destination: values.destination,
      memo: values.memo
    };
    await  makeTransaction(data);

    reset({ amount: '', destination: '', memo: '' });
  });

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
      <form onSubmit={onConfirm} className='flex flex-col gap-6'>
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
            type='number'
            id='amount'
            placeholder='Enter Amount'
            {...register('amount')}
          />
          {errors.amount && <p className='text-[12px] text-axone-red'>{`${errors.amount.message}`}</p>}
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
            {...register('destination')}
          />
          {errors.destination && <p className='text-[12px] text-axone-red'>{`${errors.destination.message}`}</p>}
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-white' htmlFor='destination'>Memo</Label>
          <Input
            isRequired={false}
            type='text'
            id='destination'
            placeholder='Memo'
            {...register('memo')}
          />
        </div>
        <Button onClick={onConfirm} variant={'rounded'} className='w-full mt-6'>Transfer</Button>
      </form>

    </Box>
  );
};

export { TransferBlock };