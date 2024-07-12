import Image from 'next/image';
import { FC } from 'react';
import { cn } from '@/lib/utils';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPrev, onNext, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  const renderPageNumbers = pageNumbers.map((number) => {
    if (
      number === 1 ||
      number === totalPages ||
      (number >= currentPage - 2 && number <= currentPage + 2)
    ) {
      return (
        <button
          className={cn('text-axone-khaki px-[4px]', {
            'bg-axone-bg-dark rounded-md text-white': number === currentPage,
            'hover:bg-axone-bg-dark hover:rounded-md hover:text-white': number !== currentPage,
          })}
          key={number}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      );
    } else if (
      number === currentPage - 3 ||
      number === currentPage + 3
    ) {
      return <span key={number}>...</span>;
    } else {
      return null;
    }
  });

  const handlePrev = () => {
    if (currentPage > 1) {
      onPrev();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onNext();
    }
  };

  const goToStart = () => {
    onPageChange(1);
  };

  const goToEnd = () => {
    onPageChange(totalPages);
  };

  return (
    <div className='flex justify-center items-center gap-4'>
      <Image onClick={goToStart} className={'rotate-180 cursor-pointer'} src={'/icons/arrow-final.svg'}  width={20} height={20} alt={'arrow-left'} />
      <Image onClick={handlePrev} className={'rotate-90 cursor-pointer'} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-left'} />
      {renderPageNumbers}
      <Image onClick={handleNext} className={'-rotate-90 cursor-pointer'} src={'/icons/arrow-down.svg'}  width={20} height={20} alt={'arrow-right'} />
      <Image onClick={goToEnd} className={'cursor-pointer'} src={'/icons/arrow-final.svg'}  width={20} height={20} alt={'arrow-left'} />
    </div>
  );
};

export { Pagination };