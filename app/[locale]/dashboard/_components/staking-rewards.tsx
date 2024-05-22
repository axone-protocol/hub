'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import { useModal } from '@/context';
import { useTokenInfo } from '@/hooks/use-token-info';

export default function StakingRewardsBlock () {
  const t  = useTranslations('Dashboard');
  const locale = useLocale();
  const router = useRouter();
  const { data: tokenInfo } = useTokenInfo();
  const { openRewardsCalculatorModal } = useModal();

  const navigateToStaking = () => {
    router.push(`/${locale}/staking`);
  };
  return (
    <Box className='flex flex-col justify-between w-full m-0 mb-6 lg:w-1/2 lg:mr-3 lg:mb-0'>

      <div className='flex flex-col lg:flex-row w-full'>
        <div className='flex flex-col w-full lg:w-2/3'>
          <Title className='mb-5'>{t('StakingRewards')}</Title>
          <Text className='mb-5'>{t('StakingRewardsDesc')}</Text>
        </div>

        <div className='relative flex items-center justify-center'>
          <Image src={'/images/blueBg.svg'} className='hidden lg:visible absolute -top-8 -right-8 rounded-lg' alt='bg' width={160} height={160} />
          <Image src={'/images/staking.svg'} alt='Staking Rewards' width={166} height={166} />
          <div className='absolute flex flex-col justify-center items-center'>
            <Text className='text-xl mb-0 text-axone-grey'>APR</Text>
            <Text className='text-xl mb-0 text-white font-bold'>
              {Number(tokenInfo?.apr || 0).toFixed(2)}%
            </Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:w-full'>
        <Button
          variant={'rounded'}
          className='mt-5 mr-2 text-base font-bold'
          onClick={navigateToStaking}
        >
          {t('DelegateNow')}
        </Button>
        <ButtonWithIcon onClick={openRewardsCalculatorModal} variant={'link'} className='mt-5 text-axone-orange text-base font-bold z-8'>
          {t('CalculateRewards')}
        </ButtonWithIcon>
      </div>
    </Box>
  );
}