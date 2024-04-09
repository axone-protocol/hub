'use client';
import { Search as SearchIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Box from '@/components/ui/box';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/ui/page-container';
import Row from '@/components/ui/row';
import CategoryFilter from './_components/category-filter';

import { data } from './_mock/data';

const SEARCH_ICON_SIZE: number = 20;

export default function FAQ () {
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
          <AccordionTrigger>{item.question}</AccordionTrigger>
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
    <PageContainer>
      <Box>
        <Row className='items-center'>
          <Title className='whitespace-nowrap mr-8'>Frequently Asked Questions</Title>
          <Row className='relative'>
            <SearchIcon  size={SEARCH_ICON_SIZE} className='absolute top-2 left-2 text-axone-khaki' />
            <Input onChange={searchQuestion} type='search' id='faq' className='pl-10' placeholder='Search Questions' />
          </Row>
        </Row>

        <CategoryFilter category={category} selectCategory={onCategorySelect} />

        <Accordion type='single' collapsible className='mt-5'>
          {renderAccordionItems()}
        </Accordion>
      </Box>
    </PageContainer>
  );
}
