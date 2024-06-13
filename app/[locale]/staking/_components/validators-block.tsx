'use client';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Input } from '@/components/ui/input';
import { useModal } from '@/context';
import { useValidatorsList, ValidatorSortBy, ValidatorStatus } from '@/hooks/use-validators-list';
import { cn } from '@/lib/utils';
import { SingleValidatorItem } from './single-validator-item';
import { ValidatorsTableSortingHeader } from './validators-table-sorting-header';


const ValidatorsBlock = () => {
  const t = useTranslations('Staking');
  const [activeFilter, setActiveFilter] = useState<ValidatorSortBy | null>(null);
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
    setOrder
  } = useValidatorsList();

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
    <Box className='mb-0 lg:mx-0'>
      <div className='flex flex-col lg:flex-row justify-between mb-8 lg:items-center gap-2 lg:gap-4'>
        <Title>{t('Validators')}</Title>
        <div className='flex flex-col w-full lg:w-[650px] lg:flex-row relative mt-6 lg:mt-0'>
          <SearchIcon size={20} className='absolute top-2 left-2 text-axone-khaki' />
          <Input
            onChange={searchValidator}
            value={searchTerm}
            type='search'
            id='validators'
            className='pl-10'
            placeholder={t('SearchValidators')}
          />
        </div>
        <div className='flex flex-row justify-center gap-2'>
          <Text
            className={cn('mb-0 mr-2 cursor-pointer', { 'text-axone-orange': validatorStatus === ValidatorStatus.BONDED })}
            onClick={filterByStatus(ValidatorStatus.BONDED)}
          >
            {t('Active')} [{activeCount}]
          </Text>
          <Text
            className={cn('mb-0 mr-2 cursor-pointer', { 'text-axone-orange': validatorStatus === ValidatorStatus.UNBONDED })}
            onClick={filterByStatus(ValidatorStatus.UNBONDED)}
          >
            {t('Inactive')} [{inactiveCount}]
          </Text>
        </div>
      </div>

      <div className='flex flex-col w-full overflow-auto'>
        <ValidatorsTableSortingHeader
          sortByParam={sortByParam}
          activeFilter={activeFilter}
          t={t}
        />

        <BoxInner className='w-[900px] lg:w-full flex-col mb-4'>
          {validators?.map((item, index) => (
            <SingleValidatorItem key={index} data={item} openDelegateModal={openDelegateModal} />
          ))}
        </BoxInner>
      </div>
    </Box>
  );
};

export { ValidatorsBlock };