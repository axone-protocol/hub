/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useChain } from '@cosmos-kit/react';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { DelegateModal, RewardsCalculatorModal, TermsModal } from '@/components/ui/modals';
import { ConfirmTransactionModal } from '@/components/ui/modals/confirm-transaction/confirm-transaction-modal';
import { VoteProposalModal } from '@/components/ui/modals/vote-proposal/vote-proposal-modal';
import { ModalContext } from '@/context';
import { chainName } from '@/core/chain';

const TERMS_ACCEPTED_KEY = 'termsAccepted';

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [isDelegateOpen, setDelegateOpen] = useState<boolean>(false);
  const [isRewardsCalculatorOpen, setRewardsCalculatorOpen] = useState<boolean>(false);
  const [isVoteProposalOpen, setVoteProposalOpen] = useState<boolean>(false);
  const [isConfirmTransactionOpen, setConfirmTransactionOpen] = useState<boolean>(false);

  const { openView } = useChain(chainName);

  const openConnectWalletModal = useCallback(async () => {
    const termsAccepted = localStorage.getItem(TERMS_ACCEPTED_KEY);
    if (termsAccepted) {
      openView();
    } else {
      setOpenTerms(true);
    }
  }, [openView]);

  const openDelegateModal = useCallback(() => {
    setDelegateOpen(true);
  }, []);

  const openRewardsCalculatorModal = useCallback(() => {
    setRewardsCalculatorOpen(true);
  }, []);

  const openVoteProposalModal = useCallback(() => {
    setVoteProposalOpen(true);
  }, []);

  const openConfirmTransactionModal = useCallback(() => {
    setConfirmTransactionOpen(true);
  }, []);

  return (
    <ModalContext.Provider value={{
      openConnectWalletModal,
      openDelegateModal,
      openRewardsCalculatorModal,
      openVoteProposalModal,
      openConfirmTransactionModal
    }}>
      {children}
      <TermsModal open={openTerms} setOpen={setOpenTerms} openWalletModal={openView} />
      <DelegateModal isOpen={isDelegateOpen} setOpen={setDelegateOpen} />
      <RewardsCalculatorModal isOpen={isRewardsCalculatorOpen} setOpen={setRewardsCalculatorOpen} />
      <VoteProposalModal isOpen={isVoteProposalOpen} setOpen={setVoteProposalOpen} />
      <ConfirmTransactionModal isOpen={isConfirmTransactionOpen} setOpen={setConfirmTransactionOpen} />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider, TERMS_ACCEPTED_KEY };