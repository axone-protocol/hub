'use client';
import { useChain } from '@cosmos-kit/react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Button } from '@/components/ui/button';
import { ButtonWithIcon } from '@/components/ui/button-with-icon';
import { Line } from '@/components/ui/line';
import PageContainer from '@/components/ui/page-container';
import { useModal } from '@/context';
import { chainName } from '@/core/chain';
import { ProposalsListBlock } from './_components/proposals-list-block';
import { ProposalsMetricsBlock } from './_components/proposals-metrics-block';


export default function Governance () {
  const t = useTranslations('Governance');
  const router = useRouter();
  const locale = useLocale();
  const { isWalletConnected } = useChain(chainName);
  const { openConnectWalletModal } = useModal();

  const navigateToNewProposal = () => {
    if (!isWalletConnected) {
      openConnectWalletModal();
      return;
    };
    router.push(`/${locale}/governance/new-proposal`);
  };

  const goToDiscussionForum = () => window.open('https://github.com/axone-protocol/community/discussions/categories/governance-proposals', '_blank');

  return (
    <PageContainer>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col p-6'>
        <Box className='w-full m-0'>
          <div className='flex flex-col lg:flex-row mb-10 items-left lg:items-center justify-between'>
            <div className='flex flex-col justify-start lg:flex-row items-left lg:items-center'>
              <Title className='mr-10'>
                {t('Governance')}
              </Title>
              <ButtonWithIcon
                onClick={goToDiscussionForum}
                variant={'noBorder'}
              >
                {t('DiscussionForum')}
              </ButtonWithIcon>
            </div>
            <Button
              className='hidden lg:flex'
              variant={'rounded'}
              onClick={navigateToNewProposal}
            >
              {t('NewProposal')}
            </Button>
          </div>
          <ProposalsMetricsBlock goToNewProposal={navigateToNewProposal} />
          <Line className='my-10' />
          <ProposalsListBlock />
        </Box>
      </div>
    </PageContainer>
  );
}
