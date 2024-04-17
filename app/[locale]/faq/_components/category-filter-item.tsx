import { memo } from 'react';
import { Text } from '@/components/typography';
import { cn } from '@/lib/utils';

type CategoryFilterItemProps = {
  item: string;
  itemValue: string;
  selected: boolean;
  onSelect: (item: string) => void;
};

const CategoryFilterItem = ({ item, itemValue, selected, onSelect }: CategoryFilterItemProps) => (
  <Text
    onClick={() => onSelect(itemValue)}
    className={cn('cursor-pointer hover:text-axone-orange mx-2.5 text-axone-khaki', { 'text-axone-orange': selected })}
  >
    {item}
  </Text>);

export default memo<typeof CategoryFilterItem>(CategoryFilterItem);