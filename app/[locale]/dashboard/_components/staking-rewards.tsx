import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import Box  from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';
import { RewardsCalculatorModal } from '@/components/ui/modals';
import Row from '@/components/ui/row';

export default function StakingRewardsBlock () {
  const t  = useTranslations('Dashboard');
  return (
    <Box className='w-1/2 mr-0 flex flex-row justify-between'>
      <Column className='w-2/3'>
        <Title className='mb-5'>{t('StakingRewards')}</Title>
        <Text className='mb-5'>{t('StakingRewardsDesc')}</Text>
        <Row>
          <Button
            variant={'rounded'}
            className='mt-5 mr-2 text-base font-bold'
          >
            {t('DelegateNow')}
          </Button>
          <RewardsCalculatorModal />
        </Row>
      </Column>
      <div className='relative flex items-center justify-center'>
        <Image src={'/images/blueBg.svg'} className='absolute -top-8 -right-8 rounded-lg' alt='bg' width={160} height={160} />
        <Image src={'/images/staking.svg'} alt='Staking Rewards' width={166} height={166} />
        <div className='absolute flex flex-col justify-center items-center'>
          <Text className='text-xl mb-0 text-axone-grey'>APS</Text>
          <Text className='text-xl mb-0 text-white font-bold'>15.68%</Text>
        </div>
      </div>
    </Box>
  );
}