import { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
type ModalContextProps = {
  openConnectWalletModal: () => void;
  openDelegateModal: () => void;
  openRewardsCalculatorModal: () => void;
}

const defaultModalContext: ModalContextProps = {
  openConnectWalletModal: () => {},
  openDelegateModal: () => {},
  openRewardsCalculatorModal: () => {}
};

const ModalContext = createContext<ModalContextProps>(defaultModalContext);

export { ModalContext };