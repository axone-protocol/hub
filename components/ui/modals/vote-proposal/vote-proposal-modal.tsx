'use client';
import { useState } from 'react';
import Text from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { BoxInner } from '../../boxes';

type VoteProposalModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CheckMarkIcon = ({ active = false }) => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M17.397 9.39697C17.0639 9.39697 16.794 9.66691 16.794 10C16.794 13.7463 13.7463 16.794 10 16.794C6.25387 16.794 3.20603 13.7463 3.20603 10C3.20603 6.25387 6.25387 3.20603 10 3.20603C10.3331 3.20603 10.603 2.93609 10.603 2.60303C10.603 2.26994 10.3331 2 10 2C5.58875 2 2 5.58875 2 10C2 14.4111 5.58875 18 10 18C14.4111 18 18 14.4111 18 10C18 9.66694 17.7301 9.39697 17.397 9.39697Z' fill={active ? '#FB9501' : '#00213A'} />
    <path d='M17.5482 4.18493C17.3128 3.94914 16.9309 3.94874 16.6955 4.18393L9.46138 11.399L6.85132 8.56421C6.62579 8.3194 6.24448 8.30352 5.99926 8.52902C5.75423 8.75455 5.73854 9.13605 5.96407 9.38108L8.99926 12.6774C9.11041 12.7982 9.26598 12.8683 9.43001 12.8717C9.43441 12.8719 9.43866 12.8719 9.44288 12.8719C9.60229 12.8719 9.75563 12.8086 9.8686 12.6961L17.547 5.03777C17.783 4.80261 17.7834 4.42071 17.5482 4.18493Z' fill={active ? '#FB9501' : '#00213A'}/>
  </svg>

);

const VoteProposalModal = ({ isOpen, setOpen }: VoteProposalModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='text-white w-[85%] lg:w-1/3 max-h-3/4 p-10 gap-0'>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>Vote</DialogTitle>
        </DialogHeader>
        <div className='overflow-y-auto scrollbar-none h-full'>
          <Text className='mb-10'>prop 379: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</Text>
          <div className='flex flex-col gap-4 my-8'>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick('Yes')}>
              <CheckMarkIcon active={selectedOption === 'Yes'} />
              <Text className='mb-0'>Yes</Text>
            </BoxInner>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick('No')}>
              <CheckMarkIcon active={selectedOption === 'No'} />
              <Text className='mb-0'>No</Text>
            </BoxInner>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick('No with Veto')}>
              <CheckMarkIcon active={selectedOption === 'No with Veto'} />
              <Text className='mb-0'>No with Veto</Text>
            </BoxInner>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick('Abstain')}>
              <CheckMarkIcon active={selectedOption === 'Abstain'} />
              <Text className='mb-0'>Abstain</Text>
            </BoxInner>
          </div>
          <Text className='mb-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</Text>
          <Button
            className={cn('w-full mt-8',
              { 'border-axone-khaki text-axone-khaki cursor-not-allowed hover:border-axone-khaki hover:text-axone-khaki hover:bg-transparent': !selectedOption }
            )}
            variant={'rounded'}>
              Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { VoteProposalModal };