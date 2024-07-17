'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';

export default function GovernanceBlock () {
  const t  = useTranslations('Dashboard');
  const locale = useLocale();
  const router = useRouter();

  const navigateToGovernance = () => {
    router.push(`/${locale}/governance`);
  };

  return (
    <Box className='flex flex-col justify-between w-full m-0 lg:ml-3 lg:w-1/2'>
      <div className='flex flex-col w-full lg:flex-row'>
        <div>
          <Title className='mb-5'>{t('Governance')}</Title>
          <Text className='mb-5'>{t('GovernanceDesc')}</Text>
        </div>
        <div className='flex w-full justify-center items-center my-6 lg:my-0 lg:justify-end'>
          <Image src={'/images/governance.svg'} alt={t('Governance')} width={200} height={200} />
        </div>
      </div>
      <Button
        onClick={navigateToGovernance}
        variant={'rounded'}
        className='mt-5 mr-2 text-base w-full lg:w-64'
      >
        {t('OpenGovernance')}
      </Button>
    </Box>
  );
}