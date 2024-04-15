import { useTranslations } from 'next-intl';
import { memo } from 'react';
import Row from '@/components/ui/row';
import CategoryFilterItem from './category-filter-item';

type CategoryFilterProps = {
  category: string;
  selectCategory: (item: string) => void;
};

enum CategoriesEnum {
  All = 'All',
  General = 'General',
  Walkthrough = 'Walkthrough',
  Bridge = 'Bridge',
  Validator = 'Validator',
  Staking = 'Staking',
  Governance = 'Governance',
  Proposal = 'Proposal',
  Insurance = 'Insurance'
};

const CategoryFilter = ({ category, selectCategory }: CategoryFilterProps) => {
  const t = useTranslations('FAQ');
  return (
    <Row className='mt-10 justify-center'>
      {Object.values(CategoriesEnum).map((item: CategoriesEnum): JSX.Element => (
        <CategoryFilterItem
          key={item}
          item={t(`Category.${item}`)}
          selected={category === item}
          onSelect={selectCategory}
        />
      ))}
    </Row>
  );
};

export default memo<typeof CategoryFilter>(CategoryFilter);