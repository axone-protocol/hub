'use client';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { BoxInner } from '@/components/ui/boxes';
import { Input } from '@/components/ui/input';
import { ProposalSortBy, ProposalStatus, useProposalsList } from '@/hooks/use-proposals-list';
import { cn } from '@/lib/utils';
import { ProposalsListItem } from './proposals-list-item';
import { ProposalsTableSortingHeader } from './proposals-table-sorting-header';

const ProposalsListBlock = () => {
  const router = useRouter();
  const locale = useLocale();
  const {
    filteredData: proposals,
    setProposalStatus,
    proposalStatus,
    rejectedCount,
    passedCount,
    setSearchTerm,
    searchTerm,
    sortBy,
    setSortBy,
    order,
    setOrder,
    allCount,
    depositCount,
    votingCount
  } = useProposalsList();

  const goToDetails = useCallback((id: string | number) => () => {
    router.push(`/${locale}/governance/proposal/${id}`);
  }, [locale, router]);

  const searchProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [activeFilter, setActiveFilter] = useState<ProposalSortBy | null>(sortBy);

  const sortByParam = useCallback((param: ProposalSortBy | null, defaultOrder: 'asc' | 'desc' = 'asc') => () => {
    let newOrder: 'asc' | 'desc' = defaultOrder;
    if (sortBy === param) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
    }
    setSortBy(param);
    setOrder(newOrder);
    setActiveFilter(param);
  }, [sortBy, order, setSortBy, setOrder]);

  const filterByStatus = useCallback((status: ProposalStatus) => () => {
    setProposalStatus(status);
  }, [setProposalStatus]);

  const t = useTranslations('Governance');

  return (
    <>
      <div className='flex flex-col items-center lg:flex-row gap-6'>
        <div className='flex flex-col w-full lg:w-[540px] lg:flex-row relative mt-0 lg:mt-0'>
          <SearchIcon size={20} className='absolute top-2 left-2 text-axone-khaki' />
          <Input
            onChange={searchProposal}
            value={searchTerm}
            type='search'
            id='proposals'
            className='pl-10'
            placeholder={t('SearchProposal')}
          />
        </div>
        <div className='flex flex-row justify-start lg:justify-center gap-2 lg:gap-6 w-full overflow-x-auto'>
          <p
            onClick={filterByStatus(ProposalStatus.ALL)}
            className={cn('mb-0 mr-2 text-16 cursor-pointer text-axone-khaki', { 'text-axone-orange': proposalStatus === ProposalStatus.ALL })}
          >
            {t('All')} [{allCount || 0}]
          </p>
          <p
            onClick={filterByStatus(ProposalStatus.DEPOSIT_PERIOD)}
            className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': proposalStatus === ProposalStatus.DEPOSIT_PERIOD })}
          >
            {t('Deposit')} [{depositCount || 0}]
          </p>
          <p
            onClick={filterByStatus(ProposalStatus.VOTING_PERIOD)}
            className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': proposalStatus === ProposalStatus.VOTING_PERIOD })}
          >
            {t('Voting')} [{votingCount || 0}]
          </p>
          <p
            onClick={filterByStatus(ProposalStatus.PASSED)}
            className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange': proposalStatus === ProposalStatus.PASSED })}>
            {t('Passed')} [{passedCount || 0}]
          </p>
          <p
            onClick={filterByStatus(ProposalStatus.REJECTED)}
            className={cn('mb-0 mr-2 cursor-pointer text-16 text-axone-khaki', { 'text-axone-orange':  proposalStatus === ProposalStatus.REJECTED })}
          >
            {t('Rejected')} [{rejectedCount || 0}]
          </p>
        </div>
      </div>
      <div className='flex flex-col w-full overflow-auto'>
        <ProposalsTableSortingHeader
          activeFilter={activeFilter}
          sortByParam={sortByParam}
        />
        <BoxInner className='w-[900px] lg:w-full flex-col mb-4'>
          {
            proposals?.map((proposal) => <ProposalsListItem key={proposal.id} item={proposal} goToDetails={goToDetails(proposal.id)} />)
          }

        </BoxInner>
      </div>
    </>
  );
};

export { ProposalsListBlock };