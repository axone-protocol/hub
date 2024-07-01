'use client';
import { useChain } from '@cosmos-kit/react-lite';
import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';
import PageContainer from '@/components/ui/page-container';
import { chainName } from '@/core/chain';
import { BalancesBlock } from './_components/balances-block';
import { OverviewBlock } from './_components/overview-block';
import { RewardsHistoryBlock } from './_components/rewards-history-block';
import { TransferBlock } from './_components/transfer-block';

export default function Wallet () {
  const locale = useLocale();
  const { isWalletConnected } = useChain(chainName);

  if (!isWalletConnected) {
    return redirect(`/${locale}/dashboard`);
  }
  return (
    <PageContainer>
      <div className='flex w-full lg:flex-row lg:w-full mobile:flex-col mobile:p-6 p-0'>
        <OverviewBlock />
      </div>
      <div className='flex w-full flex-col lg:flex-row mobile:p-6 mobile:pt-0 p-0 pt-0 gap-6'>
        <BalancesBlock />
        <TransferBlock />
      </div>
      <div className='flex w-full flex-col px-6 pb-6 lg:px-0'>
        <RewardsHistoryBlock />
      </div>
    </PageContainer>
  );
}
