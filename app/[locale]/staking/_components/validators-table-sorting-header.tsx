import { FC, useCallback, useState } from 'react';
import { Text } from '@/components/typography';
import { ArrowDownLong } from '@/components/ui/arrow-down-long';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import Row from '@/components/ui/row';
import { ValidatorSortBy } from '@/hooks/use-validators-list';
import { cn } from '@/lib/utils';

type FilterButtonProps = {
  onClick?: () => void;
  text: string;
  width?: string; // tailwind class
  tooltip?: boolean;
  tooltipText?: string;
  selected?: boolean;
};

const FilterButton: FC<FilterButtonProps> = ({
  onClick,
  text,
  width = 'w-1/6',
  tooltip = false,
  tooltipText = '',
  selected = false
}) => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (!selected && active) {
      setActive(false);
    } else {
      setActive(prev => !prev);
    }
    if (onClick) {
      onClick();
    }
  }, [active, onClick, selected]);

  return (
    <div className={cn('flex flex-row items-center gap-2 pl-4 cursor-pointer', width)} onClick={handleClick}>
      <Text className='mb-0'>{text}</Text>
      {tooltip ? <AxoneTooltip iconColor='text-axone-khaki' content={tooltipText} /> : null}
      <ArrowDownLong
        className={cn('relative bottom-[0px]', { 'rotate-180': active && selected })}
        fill={ selected ? '#ffffff' : '#66777E'}
      />
    </div>
  );
};

type ValidatorsTableSortingHeaderProps = {
  sortByParam: (param: ValidatorSortBy) => () => void;
  activeFilter: ValidatorSortBy;
};

const ValidatorsTableSortingHeader: FC<ValidatorsTableSortingHeaderProps> = ({ sortByParam, activeFilter }) => {
  return (
    <Row className='w-[900px] lg:w-full justify-between px-4 mb-2'>
      <FilterButton
        selected={activeFilter === ValidatorSortBy.NAME}
        onClick={sortByParam(ValidatorSortBy.NAME)}
        width='w-1/4'
        text='Validator'
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.STAKED_AMOUNT}
        onClick={sortByParam(ValidatorSortBy.STAKED_AMOUNT)}
        text='Staked Amount'
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.COMMISSION}
        onClick={sortByParam(ValidatorSortBy.COMMISSION)}
        text='Commission'
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.VOTING_POWER}
        onClick={sortByParam(ValidatorSortBy.VOTING_POWER)}
        text='Voting Power'
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.UPTIME}
        onClick={sortByParam(ValidatorSortBy.UPTIME)}
        text='Uptime'
        tooltip
        tooltipText='Uptime percentage based on the latest 10K blocks'
      />
      <Text className='w-[130px] opacity-0'>.</Text>
    </Row>
  );
};

export { ValidatorsTableSortingHeader };