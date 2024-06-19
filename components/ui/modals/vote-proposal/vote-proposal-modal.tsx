'use client';
import { useState } from 'react';
import Text from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VoteModalData } from '@/context';
import { cn } from '@/lib/utils';
import { BoxInner } from '../../boxes';
import { CheckMarkIcon } from '../../checkmark-icon';

type VoteProposalModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  proposalData: VoteModalData;
};

const VoteProposalModal = ({ isOpen, setOpen, proposalData }: VoteProposalModalProps) => {
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
          <Text className='mb-10 font-bold'>
            {proposalData.proposalTitle}
          </Text>
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