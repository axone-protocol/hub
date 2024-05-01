import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';

export default function GovernanceBlock () {
  const t  = useTranslations('Dashboard');
  return (
    <Box className='flex flex-col justify-between w-full m-0 md:ml-3 md:w-1/2'>
      <div className='flex flex-col w-full md:flex-row'>
        <div>
          <Title className='mb-5'>{t('Governance')}</Title>
          <Text className='mb-5'>{t('GovernanceDesc')}</Text>
        </div>
        <div className='flex w-full justify-center items-center my-6 md:my-0 md:justify-end'>
          <Image src={'/images/governance.svg'} alt='Governance' width={200} height={200} />
        </div>
      </div>
      <Button variant={'rounded'} className='mt-5 mr-2 text-base font-bold w-full md:w-64'>{t('OpenGovernance')}</Button>
    </Box>
  );
}