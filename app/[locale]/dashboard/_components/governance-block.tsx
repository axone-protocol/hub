import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Text, Title } from '@/components/typography';
import Box  from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import Column from '@/components/ui/column';

export default function GovernanceBlock () {
  const t  = useTranslations('Dashboard');
  return (
    <Box className='w-1/2 flex flex-row justify-between'>
      <Column className='w-2/3'>
        <Title className='mb-5'>{t('Governance')}</Title>
        <Text className='mb-5'>{t('GovernanceDesc')}</Text>
        <Button variant={'rounded'} className='mt-5 mr-2 text-base font-bold w-64'>{t('OpenGovernance')}</Button>
      </Column>
      <Image src={'/images/governance.svg'} alt='Governance' width={200} height={200} />
    </Box>
  );
}