import { Suspense } from 'react';
import PageContainer from '@/components/ui/page-container';
import { FAQBlock } from './_components/faq-block';
import Loading from '../loading';

export default async function FAQ () {
  return (
    <Suspense fallback={<Loading />}>
      <PageContainer>
        <FAQBlock />
      </PageContainer>
    </Suspense>
  );
}
