'use client';
import { Search as SearchIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { Title } from '@/components/typography';
import { Box } from '@/components/ui/boxes';
import { Input } from '@/components/ui/input';
import CategoryFilter from './category-filter';
import { QuestionsAccordion } from './questions-accordion';
import { FAQ_EN, FAQ_FR, FAQDataType } from '../data';

const SEARCH_ICON_SIZE: number = 20;

const FAQBlock = () => {
  const locale = useLocale();
  const SORTED_DATA = locale === 'en' ? FAQ_EN : FAQ_FR;
  const t = useTranslations('FAQ');
  const [faqData, setFaqData] = useState<FAQDataType[]>(SORTED_DATA);
  const [category, selectCategory] = useState<string>('All');

  const searchQuestion = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === '') {
      setFaqData(SORTED_DATA);
    } else {
      const filteredData = SORTED_DATA.filter((item) => item.question.toLowerCase().includes(e.target.value.toLowerCase()));
      setFaqData(filteredData);
    }
  }, []);

  const onCategorySelect = useCallback((item: string): void => {
    selectCategory(item);
  }, []);

  const questions = useMemo(() => {
    return category === 'All' ? faqData : faqData.filter(item => item.category === category);
  }, [category, faqData]);

  return (
    <Box>
      <div className='flex flex-col w-full lg:flex-row items-center'>
        <Title className='whitespace-nowrap mr-8'>{t('Title')}</Title>
        <div className='flex flex-col w-full lg:flex-row relative mt-6 lg:mt-0'>
          <SearchIcon
            size={SEARCH_ICON_SIZE}
            className='absolute top-2 left-2 text-axone-khaki'
          />
          <Input
            onChange={searchQuestion}
            type='search'
            id='faq'
            className='pl-10'
            placeholder={t('SearchQuestions')}
          />
        </div>
      </div>
      <CategoryFilter
        category={category}
        selectCategory={onCategorySelect}
      />
      <QuestionsAccordion questions={questions} />
    </Box>
  );
};

export { FAQBlock };