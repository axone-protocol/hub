import { createContext, useContext } from 'react';

type ModalContextProps = {
  openConnectWalletModal: () => void;
  openDelegateModal: () => void;
  openRewardsCalculatorModal: () => void;
  openVoteProposalModal: () => void;
  openConfirmTransactionModal: () => void;
}

const defaultModalContext: ModalContextProps = {
  openConnectWalletModal: () => {},
  openDelegateModal: () => {},
  openRewardsCalculatorModal: () => {},
  openVoteProposalModal: () => {},
  openConfirmTransactionModal: () => {},
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