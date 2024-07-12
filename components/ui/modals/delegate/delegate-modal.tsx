'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Text from '@/components/typography/text';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Row from '@/components/ui/row';
import { DelegateModalOpenProps } from '@/context';
import { useValidatorStore } from '@/hooks/use-single-validator-info';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';
import { cn } from '@/lib/utils';
import Spinner from '../../spinner';

type DelegateModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  delegationData: DelegateModalOpenProps;
};

const DelegateModal = ({ isOpen, setOpen, delegationData }: DelegateModalProps) => {
  const t = useTranslations('Staking');
  const { balance, delegateToValidator, isDelegatingPending } = useAxonePayments();
  const validatorData = useValidatorStore((state) => state.validatorData);

  const formSchema = z.object({
    amount: z.coerce.number()
      .refine(value => !isNaN(value) && value >= 0.005 && value <= balance.toNumber(), {
        message: `Amount must be a valid number between 0.005 and ${balance.toNumber()}`,
      })
  });

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onDelegate = handleSubmit(async (values) => {
    if (values.amount > balance.toNumber()) {
      alert('Insufficient funds');
      return;
    }
    await delegateToValidator({ amount: values.amount, validatorAddress: `${delegationData.validatorAddress || validatorData?.address}`, commission: `${validatorData?.commission.rate || delegationData.commission}` , memo: '' });
    reset({ amount: '' });
    setOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='text-white w-[85%] lg:w-1/3 max-h-3/4 p-10'>
        <div className={cn('hidden', {
          'flex absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-axone-bg-dark opacity-75 ': isDelegatingPending
        })}>
          <Spinner />
        </div>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>{t('DelegateTo')} { delegationData.validatorName || validatorData?.description.moniker || '' }</DialogTitle>
        </DialogHeader>
        <div className='overflow-y-auto scrollbar-none h-full'>
          <Column className='justify-center items-center'>
            <Row className='justify-center items-center mb-2 gap-4'>
              <Text className='uppercase mb-0 text-axone-grey'>{t('AvailableForDelegation')}</Text>
              <AxoneTooltip content='Your available amount to transfer to a different address on Axone' />
            </Row>
            <Text className='uppercase'>{ balance.toNumber() } <span className='uppercase text-axone-khaki'>Axone</span></Text>
          </Column>
          <div className='grid w-full items-center gap-1.5 my-10'>
            <Label className='text-white mb-2' htmlFor='amount'>{t('Amount')}</Label>
            <div className='relative'>
              <Input
                className='pr-16'
                disabled={isDelegatingPending}
                type='number'
                id='amount'
                placeholder={t('EnterYourAmountToBeDelegated')}
                {...register('amount')}
              />
              {errors.amount && <p className='text-[12px] text-axone-red'>{`${errors.amount.message}`}</p>}
              <Text className='uppercase absolute right-2.5 top-2.5 bottom-0'>Axone</Text>
            </div>
          </div>
          <Button disabled={isDelegatingPending} onClick={onDelegate} className='w-full' variant={'rounded'}>
            {isDelegatingPending ? t('Delegating') : t('Delegate')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { DelegateModal };