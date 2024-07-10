import Image from 'next/image';
import { FC } from 'react';
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

export { Pagination };