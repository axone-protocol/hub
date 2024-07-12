'use client';
import { useChain } from '@cosmos-kit/react';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box, BoxInner } from '@/components/ui/boxes';
import { Pagination } from '@/components/ui/pagination';
import Row from '@/components/ui/row';
import { chainName } from '@/core/chain';
import { CheckedItems, useWalletHistory } from '@/hooks/use-wallet-history';
import { formatDate, formatTimestamp, shortenHash } from '@/lib/utils';
import { MessageFilter } from './message-filter';
import { RewardsHistoryLoadingBlock } from './rewards-history-loading-block';

const defaultCheckedItems: CheckedItems = {
  all: true,
  send: true,
  delegate: true,
  redelegate: true,
  undelegate: true,
  claimRewards: true,
  ibcTransfer: true,
};

const RewardsHistoryBlock = () => {
  const t = useTranslations('Wallet');
  const { address } = useChain(chainName);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>(defaultCheckedItems);
  const [appliedFilters, setAppliedFilters] = useState<CheckedItems>(checkedItems);
  const [page, setPage] = useState(1);

  const handleCheckboxChange = useCallback((item: string) => () => {
    setCheckedItems(prevState => {
      const newState = { ...prevState, [item]: !prevState[item] };

      if (item === 'all') {
        const allChecked = !prevState.all;
        return {
          all: allChecked,
          send: allChecked,
          delegate: allChecked,
          redelegate: allChecked,
          undelegate: allChecked,
          claimRewards: allChecked,
          ibcTransfer: allChecked,
        };
      } else {
        const allChecked = Object.keys(newState).every(key => key === 'all' || newState[key]);
        return { ...newState, all: allChecked };
      }
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(checkedItems);
  }, [checkedItems]);

  const { data, isLoading, isFetching, isRefetching, isError, isLoadingError } = useWalletHistory(address || '', appliedFilters, page);

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  if (!data || !data.history || !data.pagination || isLoading || isFetching || isRefetching || isError || isLoadingError) {
    return <RewardsHistoryLoadingBlock />;
  }
  return (
    <Box className='w-full mt-0 mb-0 mx-0 lg:mx-0'>
      <div className='flex flex-row justify-between mb-6 lg:items-center'>
        <Title>{t('MyRewardsHistory')}</Title>
      </div>

      <div className='flex flex-col w-full overflow-auto'>
        <Row className='justify-between w-[900px] lg:w-full '>
          <Text className='w-1/6'>{t('TxHash')}</Text>
          <Text className='w-1/6'>{t('Result')}</Text>
          <MessageFilter
            onApply={handleApplyFilters}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
          <Text className='w-1/6'>{t('Amount')}</Text>
          <Text className='w-1/6'>{t('Time')}</Text>
        </Row>

        <BoxInner className='flex-col w-[900px] h-64 lg:h-[600px] overflow-y-auto scrollbar scrollbar-thin lg:w-full  pb-4 mb-4'>
          {
            data.history.map(transaction => (
              <Row key={transaction.txHash} className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
                <div className='flex flex-row gap-4 w-1/8'>
                  <Text className='mb-0'>ex: {shortenHash(transaction.txHash)}</Text>
                  <AxoneTooltip iconColor='text-axone-khaki' content={`ex: ${transaction.txHash}`} />
                </div>
                <Text className='w-1/6 mb-0 text-axone-orange'>{transaction.result}</Text>
                <div className='flex w-1/5 items-center gap-2'>
                  <Text className='mb-0'>{transaction.messages[0].replace('Msg', '')}</Text>
                  {
                    transaction.messages.length > 1 ? (
                      <div
                        className='relative flex group bg-axone-bg-dark p-2 rounded-md cursor-pointer'
                      >
                        +{transaction.messages.length - 1}
                        <ul className='list-disc absolute hidden top-6 group-hover:block bg-axone-dark-blue rounded-lg shadow-lg p-4 px-6 z-10'>
                          {transaction.messages.map((msg, index) => (
                            <li key={index} className='mb-0 text-axone-grey'>
                              {msg.replace('Msg', '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null
                  }
                </div>
                <Text className='w-1/6 mb-0'>{transaction.amount}</Text>
                <div className='w-1/6 flex flex-col'>
                  <Text className='mb-0'>{
                    formatDate(transaction.time, false, true)}
                  </Text>
                  <Text className='mb-0 text-axone-khaki'>{
                    formatDate(transaction.time, true, false)}
                  </Text>
                  <Text className='mb-0 text-axone-khaki'>
                    ({formatTimestamp(transaction.time)})
                  </Text>
                </div>
              </Row>
            ))
          }
        </BoxInner>
      </div>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(data.pagination?.total / data.pagination?.limit)}
        onPageChange={setPage}
        onPrev={handlePreviousPage}
        onNext={handleNextPage}
      />
    </Box>
  );
};

export { RewardsHistoryBlock };