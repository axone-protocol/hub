'use client';
import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';
// import PageContainer from '@/components/ui/page-container';
// import { BridgeBlock } from './_components/bridge-block';
// import { HistoryBlock } from './_components/history-block';

export default function Bridge () {
  const locale = useLocale();

  return redirect(`/${locale}/dashboard`);

  // TODO: Uncomment this code after implementing the Bridge logic and remove redirect
  // return (
  //   <PageContainer>
  //     <BridgeBlock />
  //     <HistoryBlock />
  //   </PageContainer>
  // );
}
