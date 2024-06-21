'use client';
import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { useState } from 'react';
import Text from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VoteModalData } from '@/context';
import { useAxonePayments } from '@/hooks/wallet/use-axone-payments';
import { cn } from '@/lib/utils';
import { BoxInner } from '../../boxes';
import { CheckMarkIcon } from '../../checkmark-icon';
import Spinner from '../../spinner';

type VoteProposalModalProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  proposalData: VoteModalData;
};

const VoteProposalModal = ({ isOpen, setOpen, proposalData }: VoteProposalModalProps) => {
  const [selectedOption, setSelectedOption] = useState<VoteOption | null>(null);

  const handleOptionClick = (option: VoteOption) => {
    setSelectedOption(option);
  };

  const { voteProposal, isVotingProposalPending } = useAxonePayments();

  const onConfirmVote = async () => {
    if (!selectedOption) return;
    await voteProposal({ proposalId: proposalData.proposalId, option: selectedOption! });
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className='text-white w-[85%] lg:w-1/3 max-h-3/4 p-10 gap-0'>
        <div className={cn('hidden', {
          'flex absolute top-0 bottom-0 left-0 right-0 justify-center items-center bg-axone-bg-dark opacity-75 ': isVotingProposalPending
        })}>
          <Spinner />
        </div>
        <DialogHeader>
          <DialogTitle className='text-left text-20'>Vote</DialogTitle>
        </DialogHeader>
        <div className='overflow-y-auto scrollbar-none h-full'>
          <Text className='mb-10 font-bold'>
            {proposalData.proposalTitle}
          </Text>
          <div className='flex flex-col gap-4 my-8'>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick(VoteOption.VOTE_OPTION_YES)}>
              <CheckMarkIcon active={selectedOption === VoteOption.VOTE_OPTION_YES} />
              <Text className='mb-0'>Yes</Text>
            </BoxInner>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick(VoteOption.VOTE_OPTION_NO)}>
              <CheckMarkIcon active={selectedOption === VoteOption.VOTE_OPTION_NO} />
              <Text className='mb-0'>No</Text>
            </BoxInner>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick(VoteOption.VOTE_OPTION_NO_WITH_VETO)}>
              <CheckMarkIcon active={selectedOption === VoteOption.VOTE_OPTION_NO_WITH_VETO} />
              <Text className='mb-0'>No with Veto</Text>
            </BoxInner>
            <BoxInner className='p-2 cursor-pointer gap-4' onClick={() => handleOptionClick(VoteOption.VOTE_OPTION_ABSTAIN)}>
              <CheckMarkIcon active={selectedOption === VoteOption.VOTE_OPTION_ABSTAIN} />
              <Text className='mb-0'>Abstain</Text>
            </BoxInner>
          </div>
          <Button
            onClick={onConfirmVote}
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