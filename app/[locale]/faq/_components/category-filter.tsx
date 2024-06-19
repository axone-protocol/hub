import { useTranslations } from 'next-intl';
import { memo } from 'react';
import Row from '@/components/ui/row';
import CategoryFilterItem from './category-filter-item';
import { EN_CATEGORIES_ENUM } from '../data';

type CategoryFilterProps = {
  category: string;
  selectCategory: (item: string) => void;
};

const CategoryFilter = ({ category, selectCategory }: CategoryFilterProps) => {
  const t = useTranslations('FAQ');
  return (
    <Row className='mt-10 justify-start lg:justify-center overflow-x-auto'>
      {Object.values(EN_CATEGORIES_ENUM).map((item: EN_CATEGORIES_ENUM): JSX.Element => (
        <CategoryFilterItem
          key={item}
          item={t(`Category.${item}`)}
          itemValue={item}
          selected={category === item}
          onSelect={selectCategory}
        />
      ))}
    </Row>
  );
};

export default memo<typeof CategoryFilter>(CategoryFilter);