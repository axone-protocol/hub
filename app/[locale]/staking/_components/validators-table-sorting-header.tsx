/* eslint-disable @typescript-eslint/no-explicit-any */
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
        fill={ selected ? '#FB9501' : '#66777E'}
      />
    </div>
  );
};

type ValidatorsTableSortingHeaderProps = {
  sortByParam: (param: ValidatorSortBy) => () => void;
  activeFilter: ValidatorSortBy | null;
  t: any;
};

const ValidatorsTableSortingHeader: FC<ValidatorsTableSortingHeaderProps> = ({ sortByParam, activeFilter, t }) => {
  console.log('activeFilter', activeFilter);
  return (
    <Row className='w-[900px] lg:w-full justify-between px-4 mb-2'>
      <FilterButton
        selected={activeFilter === ValidatorSortBy.NAME}
        onClick={sortByParam(ValidatorSortBy.NAME)}
        width='w-1/4'
        text={t('Validator')}
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.STAKED_AMOUNT}
        onClick={sortByParam(ValidatorSortBy.STAKED_AMOUNT)}
        text={t('StakedAmount')}
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.COMMISSION}
        onClick={sortByParam(ValidatorSortBy.COMMISSION)}
        text={t('Commission')}
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.VOTING_POWER}
        onClick={sortByParam(ValidatorSortBy.VOTING_POWER)}
        text={t('VotingPower')}
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.UPTIME}
        onClick={sortByParam(ValidatorSortBy.UPTIME)}
        text={t('Uptime')}
        tooltip
        tooltipText={t('UptimeTooltip')}
      />
      <Text className='w-[155px] opacity-0'>.</Text>
    </Row>
  );
};

export { ValidatorsTableSortingHeader };