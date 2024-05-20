'use client';

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
  className?: string;
};

const FilterButton: FC<FilterButtonProps> = ({
  onClick,
  text,
  width = 'w-1/6',
  tooltip = false,
  tooltipText = '',
  selected = false,
  className
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
    <div className={cn('flex flex-row items-center gap-2 cursor-pointer', width, className)} onClick={handleClick}>
      <Text className='mb-0'>{text}</Text>
      {tooltip ? <AxoneTooltip iconColor='text-axone-khaki' content={tooltipText} /> : null}
      <ArrowDownLong
        className={cn('relative bottom-[0px]', { 'rotate-180': active && selected })}
        fill={ selected ? '#ffffff' : '#66777E'}
      />
    </div>
  );
};

type ProposalsTableSortingHeaderProps = {
  sortByParam?: () => void;
  activeFilter: ValidatorSortBy | null;
};

const ProposalsTableSortingHeader: FC<ProposalsTableSortingHeaderProps> = ({ activeFilter }) => {
  return (
    <Row className='w-[900px] lg:w-full justify-between mt-10 mb-2'>
      <FilterButton
        selected={activeFilter === ValidatorSortBy.NAME}
        width='w-[100px]'
        text='ID'
      />
      <Text className='mb-0 w-[300px]'>Proposals</Text>
      <Text className='mb-0 w-[100px]'>Turnout</Text>
      <Text className='mb-0 w-1/6'>Type</Text>
      <FilterButton
        selected={activeFilter === ValidatorSortBy.VOTING_POWER}
        text='Voting Ends'
        className='mr-4'
      />
      <FilterButton
        selected={activeFilter === ValidatorSortBy.UPTIME}
        text='Date'
        className='mr-4'
      />
    </Row>
  );
};

export { ProposalsTableSortingHeader };