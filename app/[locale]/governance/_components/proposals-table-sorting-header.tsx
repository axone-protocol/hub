'use client';

import { useTranslations } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { Text } from '@/components/typography';
import { ArrowDownLong } from '@/components/ui/arrow-down-long';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import Row from '@/components/ui/row';
import { ProposalSortBy } from '@/hooks/use-proposals-list';
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
        fill={ selected ? '#FB9501' : '#66777E'}
      />
    </div>
  );
};

type ProposalsTableSortingHeaderProps = {
  sortByParam: (param: ProposalSortBy) => () => void;
  activeFilter: ProposalSortBy | null;
};

const ProposalsTableSortingHeader: FC<ProposalsTableSortingHeaderProps> = ({ activeFilter, sortByParam }) => {
  const t = useTranslations('Governance');
  return (
    <Row className='w-[900px] lg:w-full justify-between mt-10 mb-2'>
      <FilterButton
        onClick={sortByParam(ProposalSortBy.ID)}
        selected={activeFilter === ProposalSortBy.ID}
        width='w-[100px]'
        text='ID'
      />
      <Text className='mb-0 w-[300px]'>
        {t('Proposals')}
      </Text>
      <Text className='mb-0 w-[100px]'>
        {t('Turnout')}
      </Text>
      <Text className='mb-0 w-1/6'>
        {t('Type')}
      </Text>
      <FilterButton
        onClick={sortByParam(ProposalSortBy.VOTING_ENDS)}
        selected={activeFilter === ProposalSortBy.VOTING_ENDS}
        text={t('VotingEnds')}
        className='mr-4'
      />
      <FilterButton
        onClick={sortByParam(ProposalSortBy.DATE)}
        selected={activeFilter === ProposalSortBy.DATE}
        text={t('Date')}
        className='mr-4'
      />
    </Row>
  );
};

export { ProposalsTableSortingHeader };