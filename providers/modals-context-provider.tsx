/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useChain } from '@cosmos-kit/react';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { DelegateModal, RewardsCalculatorModal, TermsModal } from '@/components/ui/modals';
import { ModalContext } from '@/context';
import { chainName } from '@/core/chain';

const TERMS_ACCEPTED_KEY = 'termsAccepted';

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [isDelegateOpen, setDelegateOpen] = useState<boolean>(false);
  const [isRewardsCalculatorOpen, setRewardsCalculatorOpen] = useState<boolean>(false);
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

  return (
    <ModalContext.Provider value={{ openConnectWalletModal, openDelegateModal, openRewardsCalculatorModal }}>
      {children}
      <TermsModal open={openTerms} setOpen={setOpenTerms} openWalletModal={openView} />
      <DelegateModal isOpen={isDelegateOpen} setOpen={setDelegateOpen} />
      <RewardsCalculatorModal isOpen={isRewardsCalculatorOpen} setOpen={setRewardsCalculatorOpen} />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider, TERMS_ACCEPTED_KEY };