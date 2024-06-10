/* eslint-disable quotes */
export type FAQDataType = {
  id: number;
  question: string;
  answer: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
};

// Function to shuffle the array and randomize the order of the FAQ items
function shuffleArray(array: FAQDataType[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

enum COLORS_ENUM {
  PURPLE = '#9B1FE8',
  ORANGE = '#FB9501',
  LIGHT_BLUE = '#D8FAFF',
  LIGHT_BLUE_2 = '#63D1D0',
  DARK_BLUE = '#071622',
  WHITE = '#FFFFFF',
}

enum CATEGORIES_ENUM {
  GENERAL = 'General',
  TRANSFER = 'Transfer',
  STAKING = 'Staking',
  GOVERNANCE = 'Governance',
  BRIDGE = 'Bridge',
}

const data_sorted: FAQDataType[] = [
  {
    id: 1,
    question: 'What is the Axone Hub?',
    answer: 'Axone Hub is a comprehensive application that allows users to monitor the price and supply of Axone tokens, manage their holdings through Keplr wallet integration, transfer tokens, participate in governance through voting on proposals, and engage in staking activities with validators, including claiming rewards and checking unbonding tokens.',
    category: CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 2,
    question: 'Which wallets are supported by the Axone Hub?',
    answer: 'You can currently connect with Keplr.',
    category: CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 3,
    question: 'How can I get assistance with the Axone Hub?',
    answer: 'Your support team is readily available on Discord if you require assistance or have any questions. You can create an issue to describe your problem.',
    category: CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 4,
    question: 'What is the Axone token for?',
    answer: 'The Axone token (AXONE) is a digital asset associated with the Axone ecosystem. It can be used for a variety of purposes within this ecosystem, including but not limited to: Transactions: Value exchange between providers and consumers Fees: Pay for transaction fees Governance: Token holders may participate in the on-chain governance of the Axone ecosystem. Staking: Users can stake their AXONE tokens to secure the network and earn rewards. Trading: AXONE tokens can be traded on various cryptocurrency exchanges. Traders can buy, sell, or hold these tokens as part of their investment portfolio. Train an AI Collaboratively: AXONE is a utility token that aims to share digital resources to train AI collaboratively. You can learn more in the Whitepaper. ',
    category: CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 5,
    question: 'How can I transfer Axone tokens?',
    answer: 'To transfer Axone tokens, ensure your Keplr wallet is connected. Then, go to the "Transfer" section, enter the recipients wallet address and the amount of tokens you wish to send, and confirm the transaction. You’ll need to authenticate the transfer using your Keplr wallet. Keep in mind that you will pay fees to make a transfer. These fees are indicated on the Keplr widget. ',
    category: CATEGORIES_ENUM.TRANSFER,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 6,
    question: 'Is there a fee for transferring Axone tokens?',
    answer: 'Yes, there are network fees associated with transferring Axone tokens. These fees vary based on network congestion and transaction complexity. Always check the current fees displayed in the app before confirming any transactions.',
    category: CATEGORIES_ENUM.TRANSFER,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 7,
    question: 'What is token staking, and how do I stake Axone tokens?',
    answer: "Token staking involves delegating and locking up your Axone tokens to one or a set of validators. This enables them to maintain the network and validate transactions. To stake Axone tokens, navigate to the 'Staking' section, choose a validator you trust, and allocate the amount of Axone tokens you wish to stake. Ideally, don’t delegate your tokens to validators with the most tokens staked to increase decentralization.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 8,
    question: 'How do I claim rewards from staking?',
    answer: "Rewards can be claimed through the 'Staking' section. Select the option to view your staked tokens and see the 'Claim Rewards' button. Click on it and confirm the transaction to add your rewards to your wallet.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 9,
    question: 'What does it mean to unbond tokens, and how is it done?',
    answer: "To unbond tokens refers to the process of withdrawing your staked tokens from a validator. This can be done by going to the 'Staking' section, selecting the validator from whom you want to unbond tokens, and choosing the amount to unbond. Note that there may be a locking period before the tokens become fully available in your wallet.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 10,
    question: 'Is there a fee for staking Axone tokens?',
    answer: "Yes, there are network fees associated with staking Axone tokens. These fees vary based on network congestion and transaction complexity. Always check the current fees displayed in the app before confirming any transactions.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 11,
    question: 'How can I ensure my transactions and wallet are secure?',
    answer: "Always keep your Private keys secure, and never share them with anyone.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 12,
    question: 'How are staking rewards calculated and distributed?',
    answer: "Staking rewards are calculated based on the number of tokens you stake, the duration of your staking period, and the overall staking pool's performance. Rewards are distributed at each block. You can track your staking rewards in the 'Rewards' section of the Axone Hub.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 13,
    question: 'Can I unstake my Axone tokens at any time?',
    answer: "While you can initiate the unstaking process at any time, there is usually a mandatory waiting period (known as the 'unstaking period') before your tokens are released and become available for withdrawal. The length of the unstaking period can vary, so please refer to the Axone Hub for specific details.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 14,
    question: 'What is the unbonding process, and how long does it take?',
    answer: "A7: The unbonding process involves the transition period after you initiate the unstaking of your Axone tokens. During this period, your tokens are locked and not eligible for rewards or transactions. The unbonding period can vary in length, so please check the Axone Hub for specific details on the duration.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 15,
    question: 'What is slashing?',
    answer: "Slashing is a penalty mechanism designed to enforce network security and integrity. It involves reducing or forfeiting a staker's tokens if they engage in malicious behavior or by double signing a block. This mechanism helps ensure that all participants act in the best interest of the blockchain network.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 16,
    question: 'What happens if the validators to whom I delegated my tokens are slashed?',
    answer: "If the validators to whom you delegated your tokens are slashed, you, as a delegator, will also be affected. A validator is jailed when slashed, and 5% of his stake is burned. So, you may lose 5% of the amount you staked on this validator.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 17,
    question: 'How can I minimize the risk of slashing when delegating my tokens?',
    answer: "To minimize the risk of slashing when delegating your tokens, consider the following:<br /> 1.Choose Reliable Validators: Delegate your tokens to well-established and reputable validators with a proven performance and reliability track record.<br /> 2. Diversify Delegations: Spread your tokens across multiple validators to reduce the impact of any single validator being slashed.<br /> 3. Monitor Validator Performance: Regularly check the performance and behavior of your chosen validators. Stay informed about their uptime, governance participation, and overall network contribution.<br /> 4. Stay Informed: Keep up with network updates and changes in slashing rules to make informed decisions about your delegations.",
    category: CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 18,
    question: 'What is governance?',
    answer: 'Governance in the Axone Hub refers to the process by which Axone token holders can participate in decision-making activities related to the blockchain network. This includes voting on proposals that affect the network’s operations, upgrades, and policies. Governance ensures that the community has a say in the direction and development of the network.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 19,
    question: 'How can I view and participate in governance proposals?',
    answer: 'Visit the "Governance" section in the Hub. Here, you can view active and past proposals, read details about each proposal, and cast your vote. Your voting power is based on the number of Axone tokens you stake.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 20,
    question: 'What types of proposals can be voted on?',
    answer: 'Types of proposals that can be voted on within the Axone Hub include:<br /> 1. Network upgrades and protocol changes.<br /> 2. Allocation of funds from the community treasury.<br /> 3. Changes to governance parameters and staking rewards.<br /> 4. Proposals for new features or enhancements.<br /> 5. Policy changes and amendments to existing rules.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 21,
    question: 'Is there a minimum amount of Axone tokens required to vote on proposals?',
    answer: 'No, there is no minimum amount of Axone tokens required to participate in voting. However, a minimum amount is required to initiate a proposal to avoid spam proposals and ensure the proposer has a meaningful stake in the network.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 22,
    question: 'How are votes counted and results determined?',
    answer: 'Votes are counted based on the number of Axone tokens each participant has staked. Each token typically represents one vote. The results are determined by the total number of votes cast for each option (e.g., For, Against, Abstain). Proposals are valid if the quorum (33% of the votes) is reached. Proposals are validated if the threshold is reached: if there is more than 50% of votes “For”.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 23,
    question: 'What happens after a proposal is approved?',
    answer: 'After a proposal is approved, the implementation process begins. This may involve updating the network protocol, allocating funds, or enacting the proposed changes. The specific steps and timeline for implementation will depend on the nature of the proposal and the network’s governance rules.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 24,
    question: 'Can I change my vote once it is cast?',
    answer: 'Once a vote is cast, it can be changed as long as the voting period is not over.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 25,
    question: 'What do the quorum, threshold, and veto parameters mean?',
    answer: 'Quorum: The minimum percentage of voting power that needs to be cast on a proposal for the result to be valid.<br /> Threshold: Minimum proportion of Yes votes (excluding Abstain votes) for the proposal to be accepted.<br /> Veto: Minimum value of Veto votes to total votes ratio for the proposal to be vetoed.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 26,
    question: 'How can I submit my own proposal for governance?',
    answer: 'To submit your own proposal:<br /> 1. Open the Axone Hub and connect your wallet. <br />2. Navigate to the "Governance" section.<br /> 3. Select the option to create a new proposal.<br /> 4. Provide the necessary details and description for your proposal.<br /> 5. Submit the proposal. You need to make a deposit of 1,000 AXONE to submit your proposal. <br />The AXONE tokens will be burnt if: <br /> 1. Votes do not reach the quorum <br />2. Enough vote “no with veto” reaches 33% compared with total votes. <br />Otherwise, the tokens will be returned.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 27,
    question: 'How can I stay informed about upcoming proposals and governance decisions?',
    answer: 'To stay informed about upcoming proposals and governance decisions:<br /> 1. Regularly check the "Governance" section in the Axone Hub.<br /> 2. Join community forums and Discord.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 28,
    question: 'What are the benefits of participating in governance and voting on proposals?',
    answer: 'Participating in governance and voting on proposals allows you to impact the direction and development of the Axone network directly.<br /> Benefits include:<br /> 1. Influencing important decisions that shape the network’s future.<br /> 2. Helping ensure the network operates in a way that aligns with the community’s best interests.<br /> 3. Staying engaged and informed about network developments and changes.',
    category: CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 29,
    question: 'What is the Axone Bridge?',
    answer: 'The Axone bridge leverages IBC (Inter Blockchain Communication) to enable interoperability between the Axone blockchain and other blockchains, particularly in the Cosmos ecosystem. It allows users to transfer tokens between Axone and other blockchains, facilitating seamless interaction and integration with a broader range of decentralized applications and services.',
    category: CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 30,
    question: 'Are there any fees associated with using IBC?',
    answer: 'Yes, fees are associated with using the IBC. These fees cover the cost of processing the transfer and ensuring network security.',
    category: CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 31,
    question: 'How long does it take for a token transfer to complete using the Axone Bridge?',
    answer: 'The time for a token transfer to complete using IBC can vary based on network congestion and the specific blockchains involved. Generally, transfers should be completed within one to a few minutes. You can track the status of your transfer on the Explorer. ',
    category: CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 32,
    question: 'Can I transfer tokens from the Cosmos ecosystem back to Axone using IBC?',
    answer: 'Yes, IBC supports bidirectional transfers as long as a channel is open between Axone and the target/receiving chain.',
    category: CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 33,
    question: 'Are there any risks associated with using IBC?',
    answer: 'While IBC is designed to be secure, cross-chain transfers carry inherent risks, such as potential vulnerabilities and network delays. It is important to double-check all transaction details and ensure you are using the correct addresses. Additionally, keep your wallet and private keys secure to prevent unauthorized access.',
    category: CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 34,
    question: 'What should I do if my token transfer fails or is delayed?',
    answer: 'If your token transfer fails or is delayed, check the following: <br /> 1. Ensure that you entered the correct destination address and transaction details.<br /> 2. Verify that the Axone and the target chain are operating normally and not experiencing congestion. <br /> 3. Contact the Axone support team for assistance if the issue persists. Provide them with the transaction ID and any relevant details to help resolve the problem.',
    category: CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
];

export const data = shuffleArray([...data_sorted]);
