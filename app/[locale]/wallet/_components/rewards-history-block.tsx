'use client';
import Image from 'next/image';
import React, { FC } from 'react';
import { Text, Title } from '@/components/typography';
import { AxoneTooltip } from '@/components/ui/axone-tooltip';
import { Box, BoxInner } from '@/components/ui/boxes';
import Row from '@/components/ui/row';
import { cn } from '@/lib/utils';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number === currentPage) {
      return <span className={cn('px-[4px] bg-axone-bg-dark rounded-md text-white')} key={number}>{number}</span>;
    } else if (number === 1 || number === totalPages || number === totalPages - 1 || number === totalPages - 2 || (number >= currentPage - 2 && number <= currentPage + 2)) {
      return <button className='text-axone-khaki px-[4px] hover:bg-axone-bg-dark hover:rounded-md hover:text-white' key={number} onClick={() => onPageChange(number)}>{number}</button>;
    } else if (number === 2 || number === currentPage - 3 || number === totalPages - 3) {
      return <span key={number}>...</span>;
    } else {
      return null;
    }
  });

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex justify-center items-center gap-4'>
      <Image onClick={handlePrev} className={'rotate-90'} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-left'} />
      {renderPageNumbers}
      <Image onClick={handleNext} className={'-rotate-90'} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-right'} />
    </div>
  );
};

const RewardsHistoryBlock = () => {
  return (
    <Box className='w-full mt-0 mb-0 mx-0 lg:mx-0'>
      <div className='flex flex-row justify-between mb-6 lg:items-center'>
        <Title>My Rewards History</Title>
      </div>

      <div className='flex flex-col w-full overflow-auto'>
        <Row className='justify-between w-[900px] lg:w-full '>
          <Text className='w-1/6'>Tx hash</Text>
          <Text className='w-1/6'>Result</Text>
          <Text className='w-1/6'>Message</Text>
          <Text className='w-1/6'>Amount</Text>
          <Text className='w-1/6'>Time</Text>
        </Row>

        <BoxInner className='flex-col w-[900px] lg:w-full  pb-4 mb-4'>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='ex: 45GFDCA2DC12C85859104377132074D9AE822211D4C2E0D67C5B1447B0628CDF042EE45G2' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>
          <Row className='justify-between p-4 items-center even:bg-axone-dark-blue-3'>
            <div className='flex flex-row gap-4 w-1/6'>
              <Text className='mb-0'>ex: 45GFD...45G2</Text>
              <AxoneTooltip iconColor='text-axone-khaki' content='0x7a3...f3c' />
            </div>
            <Text className='w-1/6 mb-0 text-axone-orange'>Success</Text>
            <Text className='w-1/6 mb-0'>Send</Text>
            <Text className='w-1/6 mb-0'>1.002.420</Text>
            <div className='w-1/6 flex flex-col'>
              <Text className='mb-0'>May 24th,2024</Text>
              <Text className='mb-0 text-axone-khaki'>12:08:44 (12sec ago)</Text>
            </div>
          </Row>

        </BoxInner>
      </div>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </Box>
  );
};

export { RewardsHistoryBlock };