'use client';
import { useChain } from '@cosmos-kit/react-lite';
import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';
import PageContainer from '@/components/ui/page-container';
import { chainName } from '@/core/config';
import { BalancesBlock } from './_components/balances-block';
import { OverviewBlock } from './_components/overview-block';
import { TransferBlock } from './_components/transfer-block';

export default function Wallet () {
  const locale = useLocale();
  const { isWalletConnected } = useChain(chainName);

  if (!isWalletConnected) {
    return redirect(`/${locale}/dashboard`);
  }
  return (
    <PageContainer>
      <OverviewBlock />
      <div className='flex w-full flex-col lg:flex-row px-6 pb-6 lg:px-0 gap-6'>
        <BalancesBlock />
        <TransferBlock />
      </div>
    </PageContainer>
  );
}
