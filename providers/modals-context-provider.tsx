/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useChain } from '@cosmos-kit/react';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { DelegateModal, RewardsCalculatorModal, TERMS_VERSION, TermsModal } from '@/components/ui/modals';
import { ConfirmTransactionModal } from '@/components/ui/modals/confirm-transaction/confirm-transaction-modal';
import { VoteProposalModal } from '@/components/ui/modals/vote-proposal/vote-proposal-modal';
import { DelegateModalOpenProps, ModalContext, VoteModalData } from '@/context';
import { chainName } from '@/core/chain';
import { suggestTestNetToKeplr } from '@/lib/utils';

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [openTerms, setOpenTerms] = useState<boolean>(false);
  const [delegationData, setDelegationData] = useState<DelegateModalOpenProps>({});
  const [proposalData, setProposalData] = useState<VoteModalData>({ proposalTitle: '', proposalId: '' });
  const [isDelegateOpen, setDelegateOpen] = useState<boolean>(false);
  const [isRewardsCalculatorOpen, setRewardsCalculatorOpen] = useState<boolean>(false);
  const [isVoteProposalOpen, setVoteProposalOpen] = useState<boolean>(false);
  const [isConfirmTransactionOpen, setConfirmTransactionOpen] = useState<boolean>(false);

  const { openView, disconnect, isWalletConnected } = useChain(chainName);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('termsVersion');
    if (termsAccepted !== TERMS_VERSION) {
      disconnect();
      setOpenTerms(true);
    }
  }, [disconnect]);

  const openConnectWalletModal = useCallback(async () => {
    const termsAccepted = localStorage.getItem('termsVersion');
    if (termsAccepted === TERMS_VERSION) {
      suggestTestNetToKeplr();
      openView();
    } else {
      setOpenTerms(true);
    }
  }, [openView]);

  const openDelegateModal = useCallback((data: DelegateModalOpenProps | undefined) => () => {
    if (!isWalletConnected) {
      openConnectWalletModal();
    } else {
      if (data && data.validatorName && data.validatorAddress) {
        setDelegationData({ validatorName: data.validatorName, validatorAddress: data.validatorAddress, commission: data.commission });
      }
      setDelegateOpen(true);
    }
  }, [isWalletConnected, openConnectWalletModal]);

  const onDelegateModalClose = useCallback(() => {
    setDelegationData({});
    setDelegateOpen(false);
  }, []);

  const openRewardsCalculatorModal = useCallback(() => {
    setRewardsCalculatorOpen(true);
  }, []);

  const openVoteProposalModal = useCallback((data: VoteModalData) => {
    setProposalData(data);
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
      openConfirmTransactionModal,
      delegationData,
      proposalData
    }}>
      {children}
      <TermsModal open={openTerms} setOpen={setOpenTerms} openWalletModal={openConnectWalletModal} />
      <DelegateModal delegationData={delegationData} isOpen={isDelegateOpen} setOpen={onDelegateModalClose} />
      <RewardsCalculatorModal isOpen={isRewardsCalculatorOpen} setOpen={setRewardsCalculatorOpen} />
      <VoteProposalModal proposalData={proposalData} isOpen={isVoteProposalOpen} setOpen={setVoteProposalOpen} />
      <ConfirmTransactionModal isOpen={isConfirmTransactionOpen} setOpen={setConfirmTransactionOpen} />
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider, TERMS_VERSION };