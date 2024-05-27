import PageContainer from '@/components/ui/page-container';
import { BridgeBlock } from './_components/bridge-block';
import { HistoryBlock } from './_components/history-block';

export default function Bridge () {
  return (
    <PageContainer>
      <BridgeBlock />
      <HistoryBlock />
    </PageContainer>
  );
}
