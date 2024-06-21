'use client';
import { useChain } from '@cosmos-kit/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Text } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import Spinner from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { chainName } from '@/core/chain';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';
import { cn, DEFAULT_TOKEN_DENOM } from '@/lib/utils';


export default function NewProposal () {
  const { back } = useRouter();
  const locale = useLocale();
  const { isWalletConnected } = useChain(chainName);
  const { submitProposal, isSubmittingProposalPending, balance } = useAxonePayments();
  const t = useTranslations('Governance');

  const formSchema = z.object({
    title: z.string().min(4, 'Title is required'),
    description: z.string().min(10, 'Description is required'),
    amount: z.coerce.number()
      .refine(value => !isNaN(value) && value >= 1 && value <= balance.toNumber(), {
        message: `Amount must be a valid number between 1 and ${balance.toNumber()} ${DEFAULT_TOKEN_DENOM}`,
      }),
  });

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onConfirm = handleSubmit(async (values) => {
    if (values.amount > balance.toNumber()) {
      alert('Insufficient funds');
      return;
    }

    try {
      const data = {
        title: values.title,
        description: values.description,
        amount: values.amount,
        depositDenom: 'uknow'
      };
      await  submitProposal(data);
    } catch (error) {
      console.error(error);
    } finally {
      reset({ amount: '', description: '', title: '' });
    }

  });

  if (!isWalletConnected) {
    redirect(`/${locale}/governance`);
  }
  return (
    <PageContainer>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6'>
        <Box className='w-full m-0 relative'>
          <div className={cn('hidden', {
            'flex flex-row justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 rounded-lg': isSubmittingProposalPending,
          })}>
            <Spinner />
          </div>
          <div className='flex flex-col lg:flex-row mb-10 items-left lg:items-center justify-between'>
            <div className='flex justify-start lg:flex-row items-left items-center'>
              <Button onClick={back} variant={'link'} className='text-axone-khaki'>
                <Image className='rotate-90 mr-2' src='/icons/arrow-down-long.svg' width={16} height={16} alt='AXONE' />
                {t('Back')}
              </Button>
              <p className='ml-2 pl-4 border-l border-axone-box-border text-20'>
                {t('NewProposal')}
              </p>
            </div>
          </div>

          <div className='flex w-full'>
            <div className='hidden lg:flex flex-col w-1/3 pr-6'>
              <div>
                <p className='text-16'>{t('TextProposal')}</p>
                <Text>{t('TextProposalDesc')}</Text>
              </div>
              <div className='mt-32'>
                <p className='text-16'>{t('DepositInformation')}</p>
                <Text>{t('DepositInformationDesc')}</Text>
              </div>
            </div>


            <div className='flex flex-col w-full lg:w-2/3 lg:pl-6 lg:border-l lg:border-axone-box-border'>
              <div className='lg:hidden flex flex-col mb-6'>
                <p className='text-16'>{t('TextProposal')}</p>
                <Text>{t('TextProposalDesc')}</Text>
              </div>
              <div className='grid w-full items-center gap-1.5 mb-12'>
                <Label className='text-white' htmlFor='title'>
                  {t('Title')}
                </Label>
                <Input
                  isRequired={true}
                  type='text'
                  id='title'
                  placeholder={t('ProposalTitle')}
                  {...register('title')}
                />
                {errors.title && <p className='text-[12px] text-axone-red'>{`${errors.title.message}`}</p>}
              </div>
              <div className='grid w-full items-center gap-1.5 mb-12'>
                <Label className='text-white' htmlFor='description'>
                  {t('Description')}
                </Label>
                <Textarea
                  isRequired={true}
                  id='description'
                  placeholder={t('ProposalDescription')}
                  {...register('description')}
                />
                {errors.description && <p className='text-[12px] text-axone-red'>{`${errors.description.message}`}</p>}
              </div>
              <div className='lg:hidden flex flex-col mb-6'>
                <p className='text-16'>{t('DepositInformation')}</p>
                <Text>{t('DepositInformationDesc')}</Text>
              </div>
              <div className='grid w-full items-center gap-1.5 mb-10'>
                <Row className='items-center gap-2'>
                  <Label className='text-white' htmlFor='amount'>
                    {t('Deposit')}
                  </Label>
                  <AxoneTooltip
                    iconColor='text-axone-khaki'
                    content='The Axone address to which you are sending tokens'
                  />
                </Row>
                <Input
                  isRequired={true}
                  type='number'
                  id='amount'
                  placeholder={'Enter Amount in ' + DEFAULT_TOKEN_DENOM}
                  {...register('amount')}
                />
                {errors.amount && <p className='text-[12px] text-axone-red'>{`${errors.amount.message}`}</p>}
              </div>
              <Button
                variant={'rounded'}
                className='w-4/12 mt-6'
                onClick={onConfirm}
              >
                {t('Propose')}
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </PageContainer>
  );
}
