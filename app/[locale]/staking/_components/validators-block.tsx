'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Box, BoxInner } from '@/components/ui/boxes';
import Spinner from '@/components/ui/spinner';
import { useModal } from '@/context';
import { useValidatorsList, ValidatorSortBy, ValidatorStatus } from '@/hooks/use-validators-list';
import { SingleValidatorItem } from './single-validator-item';
import { ValidatorsSearch } from './validators-search';
import { ValidatorsTableSortingHeader } from './validators-table-sorting-header';

const ValidatorsBlock = () => {
  const t = useTranslations('Staking');
  const {
    filteredData: validators,
    setValidatorStatus,
    validatorStatus,
    activeCount,
    inactiveCount,
    setSearchTerm,
    searchTerm,
    sortBy,
    setSortBy,
    order,
    setOrder,
    isLoading,
    isFetching,
    isRefetching
  } = useValidatorsList();
  const [activeFilter, setActiveFilter] = useState<ValidatorSortBy | null>(sortBy);

  const searchValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filterByStatus = useCallback((status: ValidatorStatus) => () => {
    setValidatorStatus(status);
  }, [setValidatorStatus]);

  const sortByParam = useCallback((param: ValidatorSortBy, defaultOrder: 'asc' | 'desc' = 'asc') => () => {
    let newOrder: 'asc' | 'desc' = defaultOrder;
    if (sortBy === param) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
    }
    setSortBy(param);
    setOrder(newOrder);
    setActiveFilter(param);
  }, [sortBy, order, setSortBy, setOrder]);

  const { openDelegateModal } = useModal();

  return (
    <Box className='w-full m-0'>
      <ValidatorsSearch
        searchValidator={searchValidator}
        filterByStatus={filterByStatus}
        validatorStatus={validatorStatus}
        searchTerm={searchTerm}
        activeCount={activeCount}
        inactiveCount={inactiveCount}
      />

      <div className='flex flex-col w-full overflow-auto'>
        <ValidatorsTableSortingHeader
          sortByParam={sortByParam}
          activeFilter={activeFilter}
          t={t}
        />

        <BoxInner className='w-[900px] lg:w-full flex-col mb-4'>
          {
            isLoading || isFetching || isRefetching
              ? (<div className='flex w-full h-full items-center justify-center p-10'><Spinner /></div>)
              : (
                validators?.map((item, index) => (
                  <SingleValidatorItem key={index} data={item} openDelegateModal={openDelegateModal} />
                ))
              )
          }
        </BoxInner>
      </div>
    </Box>
  );
};

export { ValidatorsBlock };