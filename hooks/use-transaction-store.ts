import { create } from 'zustand';

type TimeFrameState = {
  transactionCompleted: boolean;
  setTransactionCompleted: (transactionCompleted: boolean) => void;
};

export const useTransactionStore = create<TimeFrameState>((set) => ({
  transactionCompleted: false,
  setTransactionCompleted: (transactionCompleted) => {
    set({ transactionCompleted });
    setTimeout(() => set({ transactionCompleted: false }), 3000);
  },
}));