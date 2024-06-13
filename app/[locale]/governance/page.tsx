'use client';
import { useTranslations } from 'next-intl';
import { Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import { Line } from '@/components/ui/line';
import PageContainer from '@/components/ui/page-container';
import { ProposalsListBlock } from './_components/proposals-list-block';
import { ProposalsMetricsBlock } from './_components/proposals-metrics-block';


export default function Governance () {
  const t = useTranslations('Governance');
  return (
    <PageContainer>
      <Box className='lg:mx-0 mb-0'>
        <div className='flex flex-col lg:flex-row mb-10 items-left lg:items-center justify-between'>
          <div className='flex flex-col justify-start lg:flex-row items-left lg:items-center'>
            <Title className='mr-10'>
              {t('Governance')}
            </Title>
            <ButtonWithIcon variant={'noBorder'}>
              {t('DiscussionForum')}
            </ButtonWithIcon>
          </div>
          <Button variant={'rounded'}>
            {t('NewProposal')}
          </Button>
        </div>
        <ProposalsMetricsBlock />
        <Line className='my-10' />
        <ProposalsListBlock />
      </Box>
    </PageContainer>
  );
}
