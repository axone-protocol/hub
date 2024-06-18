import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useCallback } from 'react';
import { Text } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Button } from '@/components/ui/button';
import Row from '@/components/ui/row';
import { DelegateModalOpenProps } from '@/context';
import { ValidatorsListData } from '@/hooks/use-validators-list';
import { cn, formatNumberToLocale } from '@/lib/utils';


type SingleValidatorItemProps = {
  data: ValidatorsListData;
  openDelegateModal(data?: DelegateModalOpenProps): () => void;
};

const SingleValidatorItem: FC<SingleValidatorItemProps> = ({ data, openDelegateModal }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Staking');

  const goToDetails = useCallback(() => {
    router.push(`/${locale}/staking/validator/${data.address}`);
  }, [data.address, locale, router]);

  const shortenedAddress = `${data.address?.slice(0, 8)}...${data.address?.slice(-4)}`;

  const onDelegate = useCallback(() => {
    const dataToPass = {
      validatorName: data.description.moniker,
      validatorAddress: data.address
    };
    console.log(dataToPass);
    openDelegateModal(dataToPass)();
  }, [data.description.moniker, data.address, openDelegateModal]);

  const stakedAmount = formatNumberToLocale(Number(data.stakedAmount)/1000000);

  return (
    <Row className={cn('justify-between items-center p-4 group even:bg-axone-dark-blue-3')}>
      <div className='flex flex-row items-center gap-4 w-1/4'>
        <Image src={data.logo || '/icons/wallets/ninji.svg'} className='rounded-full' width={38} height={38} alt='AXONE' />
        <div className='flex flex-col cursor-pointer' onClick={goToDetails}>
          <Text className='w-[150px] mb-0 truncate ...'>{data.description.moniker}</Text>
          <Text className='mb-0 text-axone-khaki'>{shortenedAddress}</Text>
        </div>
        <AxoneTooltip iconColor='text-axone-khaki' content='The Axone address to which you are sending tokens' />
      </div>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>{stakedAmount} <span className='text-axone-khaki'>axone</span></Text>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>{Number(data.commission.rate).toFixed(2)}%</Text>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>{Number(data.votingPower).toFixed(2)}%</Text>
      <Text className='w-1/6 mb-0 pl-4 uppercase'>{Number(data.uptime).toFixed(2)}%</Text>
      <Button onClick={onDelegate} variant={'link'} className='mb-0 text-axone-orange'>
        {t('DelegateNow')}
        <Image className='ml-2' src='/icons/arrow-right-long.svg' width={16} height={16} alt='AXONE' />
      </Button>
    </Row>
  );
};

export { SingleValidatorItem };