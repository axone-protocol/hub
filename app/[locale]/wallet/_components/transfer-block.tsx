'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
import { cn, DEFAULT_TOKEN_DENOM } from '@/lib/utils';

const TransferBlock = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    balance,
    isFetchingBalance,
    makeTransaction,
    isTransactionPending
  } = useAxonePayments();

  const t = useTranslations('Wallet');

  const formSchema = z.object({
    amount: z.coerce.number()
      .refine(value => !isNaN(value) && value >= 0 && value <= balance.toNumber(), {
        message: `Amount must be a valid number between 0 and ${balance.toNumber()}`,
      }),
    destination: z.string().min(40, 'Invalid address').refine(value => value.startsWith('okp4'), 'Invalid address'),
    memo: z.string().optional(),
  });

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
    <Box className='w-full lg:w-1/3 m-0 relative'>
      <div className={cn('absolute hidden', {
        'flex flex-row w-full h-full top-0 left-0 rounded-lg opacity-45 right-0 bottom-0 bg-axone-bg-dark text-red-800 items-center justify-center': isTransactionPending,
      })}>
        <Spinner />
      </div>
      <div className='flex flex-col lg:flex-row justify-between mb-10 lg:items-center'>
        <Title>{t('Transfer')}</Title>
      </div>
      <Column className='justify-center items-center'>
        <Row className='justify-center items-center mb-2 gap-4'>
          <Text className='uppercase mb-0'>
            {t('AvailableToTransfer')}
          </Text>
          <AxoneTooltip content='Your available amount to transfer to a different address on Axone' />
        </Row>
        <Text className='uppercase'>{isFetchingBalance ? '0.00' : balance.toNumber().toFixed(2)} {DEFAULT_TOKEN_DENOM}</Text>
      </Column>
      <form onSubmit={onConfirm} className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <Label className='text-white mb-2'>
            {t('Asset')}
          </Label>
          <Select value='axone' onOpenChange={() => setOpen(prev => !prev)}>
            <SelectTrigger className={cn('w-full h-10 bg-axone-bg-dark rounded-md text-sm', { 'bg-axone-bg-dark': open })}>
              <SelectValue placeholder='Choose Asset' />
              <SelectIcon asChild>
                <Image className={cn({ 'rotate-180': open })} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-down'} />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent className='shadow-lg'>
              <SelectGroup>
                <SelectItem value='axone'>{DEFAULT_TOKEN_DENOM}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-white' htmlFor='amount'>
            {t('Amount')}
          </Label>
          <Input
            isRequired={true}
            type='number'
            id='amount'
            placeholder={t('EnterAmount')}
            {...register('amount')}
          />
          {errors.amount && <p className='text-[12px] text-axone-red'>{`${errors.amount.message}`}</p>}
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Row className='items-center gap-4'>
            <Label className='text-white' htmlFor='destination'>
              {t('AxoneAddressDestination')}
            </Label>
            <AxoneTooltip content={t('DestinationTooltip')} />
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
        <Button onClick={onConfirm} variant={'rounded'} className='w-full mt-6'>
          {t('Transfer')}
        </Button>
      </form>

    </Box>
  );
};

export { TransferBlock };