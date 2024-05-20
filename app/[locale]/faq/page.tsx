'use client';
import { Search as SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense, useCallback, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Box } from '@/components/ui/boxes';
import { ColorBadge } from '@/components/ui/color-badge';
import Column from '@/components/ui/column';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/ui/page-container';
import CategoryFilter from './_components/category-filter';

import { data } from './_mock/data';
import Loading from '../loading';

const SEARCH_ICON_SIZE: number = 20;

export default function FAQ () {
  const t = useTranslations('FAQ');
  const [faqData, setFaqData] = useState(data);
  const [category, selectCategory] = useState<string>('All');

  const searchQuestion = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setFaqData(data);
    } else {
      const filteredData = data.filter((item) => item.question.toLowerCase().includes(e.target.value.toLowerCase()));
      setFaqData(filteredData);
    }
  }, []);

  const renderAccordionItems = (): JSX.Element[] => {
    const itemsToRender = category === 'All' ? faqData : faqData.filter(item => item.category === category);
    return itemsToRender.map((item) => {
      return (
        <AccordionItem key={item.id} value={`item-${item.id}`}>
          <Column className='py-2'>
            <ColorBadge backgroundColor={item.categoryBgColor} textColor={item.categoryTextColor} text={item.category} />
            <AccordionTrigger className='w-full pt-2 pb-5 text-left'>{item.question}</AccordionTrigger>
          </Column>
          <AccordionContent>
            <Text className='ml-5'>{item.answer}</Text>
          </AccordionContent>
        </AccordionItem>
      );
    });
  };

  const onCategorySelect = useCallback((item: string): void => {
    selectCategory(item);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <PageContainer>
        <Box>
          <div className='flex flex-col w-full lg:flex-row items-center'>
            <Title className='whitespace-nowrap mr-8'>{t('Title')}</Title>
            <div className='flex flex-col w-full lg:flex-row relative mt-6 lg:mt-0'>
              <SearchIcon  size={SEARCH_ICON_SIZE} className='absolute top-2 left-2 text-axone-khaki' />
              <Input onChange={searchQuestion} type='search' id='faq' className='pl-10' placeholder={t('SearchQuestions')} />
            </div>
          </div>

          <CategoryFilter category={category} selectCategory={onCategorySelect} />

          <Accordion type='single' collapsible className='mt-5'>
            {renderAccordionItems()}
          </Accordion>
        </Box>
      </PageContainer>
    </Suspense>
  );
}
