export type FAQDataType = {
  id: number;
  question: string;
  answer: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
};

export const data: FAQDataType[] = [
  {
    id: 1,
    question: 'Which wallets are supported for interacting with axone?',
    answer: 'You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus',
    category: 'General',
    categoryBgColor: 'axone-bg-dark',
    categoryTextColor: 'white'
  },
  {
    id: 2,
    question: 'General question 2',
    answer: 'You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus',
    category: 'General',
    categoryBgColor: 'axone-bg-dark',
    categoryTextColor: 'white'
  },
  {
    id: 3,
    question: 'This is proposal one?',
    answer: 'You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus',
    category: 'Staking',
    categoryBgColor: 'axone-orange',
    categoryTextColor: 'axone-bg-dark'
  },
  {
    id: 4,
    question: 'This is proposal two?',
    answer: 'You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus',
    category: 'Proposal',
    categoryBgColor: 'axone-orange',
    categoryTextColor: 'axone-bg-dark'
  },
  {
    id: 5,
    question: 'This is Validator one?',
    answer: 'You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus',
    category: 'Validator',
    categoryBgColor: 'axone-light-blue',
    categoryTextColor: 'axone-bg-dark'
  },
  {
    id: 6,
    question: 'This is bridge one?',
    answer: 'You can currently connect with MetaMask, Ledger, Keplr, Trezor and Torus',
    category: 'Bridge',
    categoryBgColor: 'axone-orange',
    categoryTextColor: 'axone-bg-dark'
  }
];