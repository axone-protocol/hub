import { createContext, useContext } from 'react';

export type DelegateModalOpenProps = {
  validatorName?: string;
  validatorAddress?: string;
  commission?: string;
};

export type VoteModalData = {
  proposalTitle: string;
  proposalId: string;
}

type ModalContextProps = {
  openConnectWalletModal: () => void;
  openDelegateModal: (data?: DelegateModalOpenProps) => () => void;
  openRewardsCalculatorModal: () => void;
  openVoteProposalModal: (data: VoteModalData) => void;
  openConfirmTransactionModal: () => void;
  delegationData?: DelegateModalOpenProps;
  proposalData?: VoteModalData;
}

const defaultModalContext: ModalContextProps = {
  openConnectWalletModal: () => {},
  openDelegateModal: () => () => {},
  openRewardsCalculatorModal: () => {},
  openVoteProposalModal: () => {},
  openConfirmTransactionModal: () => {},
  delegationData: {},
  proposalData: { proposalTitle: '', proposalId: '' },
};
const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

const ModalContext = createContext<ModalContextProps>(defaultModalContext);

export { ModalContext, useModal };