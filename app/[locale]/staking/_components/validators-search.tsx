'use client';

import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Title } from '@/components/typography';
import { Input } from '@/components/ui/input';
import { CountType, ValidatorStatus } from '@/hooks/use-validators-list';
import { cn } from '@/lib/utils';

type ValidatorsSearchProps = {
  searchValidator: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterByStatus: (status: ValidatorStatus) => () => void;
  validatorStatus: ValidatorStatus;
  searchTerm: string;
  activeCount: CountType;
  inactiveCount: CountType;
};

const ValidatorsSearch: FC<ValidatorsSearchProps> = ({
  searchValidator,
  filterByStatus,
  validatorStatus,
  searchTerm,
  activeCount,
  inactiveCount
}) => {
  const t = useTranslations('Staking');

  const activeSelected = validatorStatus === ValidatorStatus.BONDED;
  const inactiveSelected = validatorStatus === ValidatorStatus.UNBONDED;
  return (
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
      <div className='flex flex-row justify-start gap-2 mt-2'>
        <p
          className={cn('mb-0 mr-2 cursor-pointer text-16',
            { 'text-axone-orange': activeSelected, 'text-axone-grey': !activeSelected })
          }
          onClick={filterByStatus(ValidatorStatus.BONDED)}
        >
          {t('Active')} [{activeCount}]
        </p>
        <p
          className={cn('mb-0 mr-2 cursor-pointer text-16',
            { 'text-axone-orange': inactiveSelected, 'text-axone-grey': !inactiveSelected })
          }
          onClick={filterByStatus(ValidatorStatus.UNBONDED)}
        >
          {t('Inactive')} [{inactiveCount}]
        </p>
      </div>
    </div>
  );
};

export { ValidatorsSearch };