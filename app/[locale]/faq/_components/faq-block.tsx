'use client';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Title } from '@/components/typography';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Box } from '@/components/ui/boxes';
import { ColorBadge } from '@/components/ui/color-badge';
import Column from '@/components/ui/column';
import { Input } from '@/components/ui/input';
import CategoryFilter from './category-filter';
import { data, FAQDataType } from '../_mock/data';

const SEARCH_ICON_SIZE: number = 20;

const FAQBlock = () => {
  const t = useTranslations('FAQ');
  const [faqData, setFaqData] = useState<FAQDataType[]>(data);
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
        <motion.div
          className='even:bg-axone-dark-blue-3'
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AccordionItem  value={`item-${item.id}`}>
            <Column className='py-2'>
              <ColorBadge backgroundColor={item.categoryBgColor} textColor={item.categoryTextColor} text={item.category} />
              <AccordionTrigger className='w-full pt-2 pb-5 text-left'>{item.question}</AccordionTrigger>
            </Column>
            <AccordionContent>
              <p className='ml-6' dangerouslySetInnerHTML={{ __html :item.answer }} />
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      );
    });
  };

  const onCategorySelect = useCallback((item: string): void => {
    selectCategory(item);
  }, []);
  return (
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
  );
};

export { FAQBlock };