export type FAQDataType = {
  id: number;
  question: string;
  answer: string;
  category: string;
  categoryBgColor: string;
  categoryTextColor: string;
};

enum COLORS_ENUM {
  PURPLE = '#1986CF',
  ORANGE = '#FB9501',
  LIGHT_BLUE = '#D8FAFF',
  LIGHT_BLUE_2 = '#63D1D0',
  DARK_BLUE = '#071622',
  WHITE = '#FFFFFF',
}

enum EN_CATEGORIES_ENUM {
  GENERAL = 'General',
  TRANSFER = 'Transfer',
  STAKING = 'Staking',
  GOVERNANCE = 'Governance',
  BRIDGE = 'Bridge',
}

enum FR_CATEGORIES_ENUM {
  GENERAL = 'Général',
  TRANSFER = 'Transfert',
  STAKING = 'Staking',
  GOVERNANCE = 'Gouvernance',
  BRIDGE = 'Bridge',
}

export const FAQ_EN: FAQDataType[] = [
  {
    id: 1,
    question: 'What is the Axone Hub?',
    answer: 'Axone Hub is a comprehensive application that allows users to monitor the price and supply of Axone tokens, manage their holdings through Keplr wallet integration, transfer tokens, participate in governance through voting on proposals, and engage in staking activities with validators, including claiming rewards and checking unbonding tokens.',
    category: EN_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 2,
    question: 'Which wallets are supported by the Axone Hub?',
    answer: 'You can currently connect with Keplr.',
    category: EN_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 3,
    question: 'How can I get assistance with the Axone Hub?',
    answer: 'Your support team is readily available on Discord if you require assistance or have any questions. You can create an issue to describe your problem.',
    category: EN_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 4,
    question: 'What is the Axone token for?',
    answer: 'The Axone token (AXONE) is a digital asset associated with the Axone ecosystem. It can be used for a variety of purposes within this ecosystem, including but not limited to: Transactions: Value exchange between providers and consumers Fees: Pay for transaction fees Governance: Token holders may participate in the on-chain governance of the Axone ecosystem. Staking: Users can stake their AXONE tokens to secure the network and earn rewards. Trading: AXONE tokens can be traded on various cryptocurrency exchanges. Traders can buy, sell, or hold these tokens as part of their investment portfolio. Train an AI Collaboratively: AXONE is a utility token that aims to share digital resources to train AI collaboratively. You can learn more in the Whitepaper. ',
    category: EN_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 5,
    question: 'How can I transfer Axone tokens?',
    answer: 'To transfer Axone tokens, ensure your Keplr wallet is connected. Then, go to the "Transfer" section, enter the recipients wallet address and the amount of tokens you wish to send, and confirm the transaction. You’ll need to authenticate the transfer using your Keplr wallet. Keep in mind that you will pay fees to make a transfer. These fees are indicated on the Keplr widget. ',
    category: EN_CATEGORIES_ENUM.TRANSFER,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 6,
    question: 'Is there a fee for transferring Axone tokens?',
    answer: 'Yes, there are network fees associated with transferring Axone tokens. These fees vary based on network congestion and transaction complexity. Always check the current fees displayed in the app before confirming any transactions.',
    category: EN_CATEGORIES_ENUM.TRANSFER,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 7,
    question: 'What is token staking, and how do I stake Axone tokens?',
    answer: 'Token staking involves delegating and locking up your Axone tokens to one or a set of validators. This enables them to maintain the network and validate transactions. To stake Axone tokens, navigate to the \'Staking\' section, choose a validator you trust, and allocate the amount of Axone tokens you wish to stake. Ideally, don’t delegate your tokens to validators with the most tokens staked to increase decentralization.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 8,
    question: 'How do I claim rewards from staking?',
    answer: 'Rewards can be claimed through the \'Staking\' section. Select the option to view your staked tokens and see the \'Claim Rewards\' button. Click on it and confirm the transaction to add your rewards to your wallet.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 9,
    question: 'What does it mean to unbond tokens, and how is it done?',
    answer: 'To unbond tokens refers to the process of withdrawing your staked tokens from a validator. This can be done by going to the \'Staking\' section, selecting the validator from whom you want to unbond tokens, and choosing the amount to unbond. Note that there may be a locking period before the tokens become fully available in your wallet.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 10,
    question: 'Is there a fee for staking Axone tokens?',
    answer: 'Yes, there are network fees associated with staking Axone tokens. These fees vary based on network congestion and transaction complexity. Always check the current fees displayed in the app before confirming any transactions.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 11,
    question: 'How can I ensure my transactions and wallet are secure?',
    answer: 'Always keep your Private keys secure, and never share them with anyone.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 12,
    question: 'How are staking rewards calculated and distributed?',
    answer: 'Staking rewards are calculated based on the number of tokens you stake, the duration of your staking period, and the overall staking pool\'s performance. Rewards are distributed at each block. You can track your staking rewards in the \'Rewards\' section of the Axone Hub.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 13,
    question: 'Can I unstake my Axone tokens at any time?',
    answer: 'While you can initiate the unstaking process at any time, there is usually a mandatory waiting period (known as the \'unstaking period\') before your tokens are released and become available for withdrawal. The length of the unstaking period can vary, so please refer to the Axone Hub for specific details.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 14,
    question: 'What is the unbonding process, and how long does it take?',
    answer: 'A7: The unbonding process involves the transition period after you initiate the unstaking of your Axone tokens. During this period, your tokens are locked and not eligible for rewards or transactions. The unbonding period can vary in length, so please check the Axone Hub for specific details on the duration.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 15,
    question: 'What is slashing?',
    answer: 'Slashing is a penalty mechanism designed to enforce network security and integrity. It involves reducing or forfeiting a staker\'s tokens if they engage in malicious behavior or by double signing a block. This mechanism helps ensure that all participants act in the best interest of the blockchain network.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 16,
    question: 'What happens if the validators to whom I delegated my tokens are slashed?',
    answer: 'If the validators to whom you delegated your tokens are slashed, you, as a delegator, will also be affected. A validator is jailed when slashed, and 5% of his stake is burned. So, you may lose 5% of the amount you staked on this validator.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 17,
    question: 'How can I minimize the risk of slashing when delegating my tokens?',
    answer: 'To minimize the risk of slashing when delegating your tokens, consider the following:<br /> 1.Choose Reliable Validators: Delegate your tokens to well-established and reputable validators with a proven performance and reliability track record.<br /> 2. Diversify Delegations: Spread your tokens across multiple validators to reduce the impact of any single validator being slashed.<br /> 3. Monitor Validator Performance: Regularly check the performance and behavior of your chosen validators. Stay informed about their uptime, governance participation, and overall network contribution.<br /> 4. Stay Informed: Keep up with network updates and changes in slashing rules to make informed decisions about your delegations.',
    category: EN_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 18,
    question: 'What is governance?',
    answer: 'Governance in the Axone Hub refers to the process by which Axone token holders can participate in decision-making activities related to the blockchain network. This includes voting on proposals that affect the network’s operations, upgrades, and policies. Governance ensures that the community has a say in the direction and development of the network.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 19,
    question: 'How can I view and participate in governance proposals?',
    answer: 'Visit the "Governance" section in the Hub. Here, you can view active and past proposals, read details about each proposal, and cast your vote. Your voting power is based on the number of Axone tokens you stake.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 20,
    question: 'What types of proposals can be voted on?',
    answer: 'Types of proposals that can be voted on within the Axone Hub include:<br /> 1. Network upgrades and protocol changes.<br /> 2. Allocation of funds from the community treasury.<br /> 3. Changes to governance parameters and staking rewards.<br /> 4. Proposals for new features or enhancements.<br /> 5. Policy changes and amendments to existing rules.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 21,
    question: 'Is there a minimum amount of Axone tokens required to vote on proposals?',
    answer: 'No, there is no minimum amount of Axone tokens required to participate in voting. However, a minimum amount is required to initiate a proposal to avoid spam proposals and ensure the proposer has a meaningful stake in the network.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 22,
    question: 'How are votes counted and results determined?',
    answer: 'Votes are counted based on the number of Axone tokens each participant has staked. Each token typically represents one vote. The results are determined by the total number of votes cast for each option (e.g., For, Against, Abstain). Proposals are valid if the quorum (33% of the votes) is reached. Proposals are validated if the threshold is reached: if there is more than 50% of votes “For”.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 23,
    question: 'What happens after a proposal is approved?',
    answer: 'After a proposal is approved, the implementation process begins. This may involve updating the network protocol, allocating funds, or enacting the proposed changes. The specific steps and timeline for implementation will depend on the nature of the proposal and the network’s governance rules.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 24,
    question: 'Can I change my vote once it is cast?',
    answer: 'Once a vote is cast, it can be changed as long as the voting period is not over.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 25,
    question: 'What do the quorum, threshold, and veto parameters mean?',
    answer: 'Quorum: The minimum percentage of voting power that needs to be cast on a proposal for the result to be valid.<br /> Threshold: Minimum proportion of Yes votes (excluding Abstain votes) for the proposal to be accepted.<br /> Veto: Minimum value of Veto votes to total votes ratio for the proposal to be vetoed.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 26,
    question: 'How can I submit my own proposal for governance?',
    answer: 'To submit your own proposal:<br /> 1. Open the Axone Hub and connect your wallet. <br />2. Navigate to the "Governance" section.<br /> 3. Select the option to create a new proposal.<br /> 4. Provide the necessary details and description for your proposal.<br /> 5. Submit the proposal. You need to make a deposit of 1,000 AXONE to submit your proposal. <br />The AXONE tokens will be burnt if: <br /> 1. Votes do not reach the quorum <br />2. Enough vote “no with veto” reaches 33% compared with total votes. <br />Otherwise, the tokens will be returned.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 27,
    question: 'How can I stay informed about upcoming proposals and governance decisions?',
    answer: 'To stay informed about upcoming proposals and governance decisions:<br /> 1. Regularly check the "Governance" section in the Axone Hub.<br /> 2. Join community forums and Discord.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 28,
    question: 'What are the benefits of participating in governance and voting on proposals?',
    answer: 'Participating in governance and voting on proposals allows you to impact the direction and development of the Axone network directly.<br /> Benefits include:<br /> 1. Influencing important decisions that shape the network’s future.<br /> 2. Helping ensure the network operates in a way that aligns with the community’s best interests.<br /> 3. Staying engaged and informed about network developments and changes.',
    category: EN_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 29,
    question: 'What is the Axone Bridge?',
    answer: 'The Axone bridge leverages IBC (Inter Blockchain Communication) to enable interoperability between the Axone blockchain and other blockchains, particularly in the Cosmos ecosystem. It allows users to transfer tokens between Axone and other blockchains, facilitating seamless interaction and integration with a broader range of decentralized applications and services.',
    category: EN_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 30,
    question: 'Are there any fees associated with using IBC?',
    answer: 'Yes, fees are associated with using the IBC. These fees cover the cost of processing the transfer and ensuring network security.',
    category: EN_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 31,
    question: 'How long does it take for a token transfer to complete using the Axone Bridge?',
    answer: 'The time for a token transfer to complete using IBC can vary based on network congestion and the specific blockchains involved. Generally, transfers should be completed within one to a few minutes. You can track the status of your transfer on the Explorer. ',
    category: EN_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 32,
    question: 'Can I transfer tokens from the Cosmos ecosystem back to Axone using IBC?',
    answer: 'Yes, IBC supports bidirectional transfers as long as a channel is open between Axone and the target/receiving chain.',
    category: EN_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 33,
    question: 'Are there any risks associated with using IBC?',
    answer: 'While IBC is designed to be secure, cross-chain transfers carry inherent risks, such as potential vulnerabilities and network delays. It is important to double-check all transaction details and ensure you are using the correct addresses. Additionally, keep your wallet and private keys secure to prevent unauthorized access.',
    category: EN_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 34,
    question: 'What should I do if my token transfer fails or is delayed?',
    answer: 'If your token transfer fails or is delayed, check the following: <br /> 1. Ensure that you entered the correct destination address and transaction details.<br /> 2. Verify that the Axone and the target chain are operating normally and not experiencing congestion. <br /> 3. Contact the Axone support team for assistance if the issue persists. Provide them with the transaction ID and any relevant details to help resolve the problem.',
    category: EN_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
];

export const FAQ_FR: FAQDataType[] = [
  {
    id: 1,
    question: 'Qu\'est-ce que le Hub Axone ?',
    answer: 'Le Hub Axone est une application complète qui permet aux utilisateurs de surveiller le prix et l\'offre des tokens Axone, de gérer leurs actifs via l\'intégration du portefeuille Keplr, de transférer des tokens, de participer à la gouvernance en votant sur des propositions et de s\'engager dans des activités de staking avec des validateurs, y compris la réclamation de récompenses et la vérification des tokens en cours de déblocage.',
    category: FR_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 2,
    question: 'Quels portefeuilles sont pris en charge par le Hub Axone ?',
    answer: 'Vous pouvez actuellement vous connecter avec Keplr.',
    category: FR_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 3,
    question: 'Comment puis-je obtenir de l\'aide avec le Hub Axone ?',
    answer: 'Notre équipe de support est facilement disponible sur Discord si vous avez besoin d\'aide ou si vous avez des questions. Vous pouvez créer un ticket pour décrire votre problème.',
    category: FR_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 4,
    question: 'À quoi sert le token Axone ?',
    answer: 'Le token Axone (AXONE) est un actif numérique associé à l\'écosystème Axone. Il peut être utilisé pour diverses fins au sein de cet écosystème, y compris mais sans s\'y limiter : <br/>Transactions : Échange de valeur entre les fournisseurs et les consommateurs. <br/>Frais : Paiement des frais de transaction. <br/>Gouvernance : Les détenteurs de tokens peuvent participer à la gouvernance on-chain de l\'écosystème Axone. <br/>Staking : Les utilisateurs peuvent staker leurs tokens AXONE pour sécuriser le réseau et gagner des récompenses. <br/>Trading : Les tokens AXONE peuvent être échangés sur diverses plateformes de cryptomonnaie. Les traders peuvent acheter, vendre ou conserver ces tokens dans le cadre de leur portefeuille d\'investissement. <br/>Entraînement d\'IA Collaboratif : AXONE est un token utilitaire visant à partager des ressources numériques pour entraîner l\'IA de manière collaborative. Vous pouvez en savoir plus dans le Whitepaper.',
    category: FR_CATEGORIES_ENUM.GENERAL,
    categoryBgColor: COLORS_ENUM.DARK_BLUE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 5,
    question: 'Comment puis-je transférer des tokens Axone ?',
    answer: 'Pour transférer des tokens Axone, assurez-vous que votre portefeuille Keplr est connecté. Ensuite, allez dans la section "Wallet", entrez l\'adresse du portefeuille du destinataire et le montant de tokens que vous souhaitez envoyer, et confirmez la transaction. Vous devrez signer la transaction en utilisant votre portefeuille Keplr. Gardez à l\'esprit que vous devrez payer des frais pour effectuer un transfert. Ces frais sont indiqués sur le widget Keplr.',
    category: FR_CATEGORIES_ENUM.TRANSFER,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 6,
    question: 'Y a-t-il des frais pour transférer des tokens Axone ?',
    answer: 'Oui, il y a des frais de réseau associés au transfert de tokens Axone. Ces frais varient en fonction de la congestion du réseau et de la complexité de la transaction. Vérifiez toujours les frais actuels affichés dans l\'application avant de confirmer toute transaction.',
    category: FR_CATEGORIES_ENUM.TRANSFER,
    categoryBgColor: COLORS_ENUM.PURPLE,
    categoryTextColor: COLORS_ENUM.WHITE
  },
  {
    id: 7,
    question: 'Qu\'est-ce que le staking de tokens et comment puis-je staker des tokens Axone ?',
    answer: 'Le staking de tokens consiste à déléguer et à verrouiller vos tokens Axone à un ou plusieurs validateurs. Cela leur permet de maintenir le réseau et de valider les transactions. Pour staker des tokens Axone, naviguez jusqu\'à la section "Staking", choisissez un validateur en qui vous avez confiance et allouez le montant de tokens Axone que vous souhaitez staker. Idéalement, ne déléguez pas vos tokens aux validateurs avec le plus de tokens stakés pour augmenter la décentralisation.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 8,
    question: 'Comment puis-je réclamer des récompenses de staking ?',
    answer: 'Les récompenses peuvent être réclamées via la section "Staking". Sélectionnez l\'option pour voir vos tokens stakés et cliquez sur le bouton "Réclamer des récompenses". Confirmez la transaction pour ajouter vos récompenses à votre portefeuille.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 9,
    question: 'Qu\'est-ce que cela signifie de déverrouiller des tokens et comment cela se fait-il ?',
    answer: 'Déverrouiller des tokens fait référence au processus de retrait de vos tokens stakés d\'un validateur. Cela peut être fait en allant dans la section "Staking", en sélectionnant le validateur auprès duquel vous souhaitez déverrouiller des tokens et en choisissant le montant à déverrouiller. Notez qu\'il peut y avoir une période de verrouillage avant que les tokens ne deviennent entièrement disponibles dans votre portefeuille.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 10,
    question: 'Y a-t-il des frais pour staker des tokens Axone ? ',
    answer: 'Oui, il y a des frais de réseau associés au staking de tokens Axone. Ces frais varient en fonction de la congestion du réseau et de la complexité de la transaction. Vérifiez toujours les frais actuels affichés dans l\'application avant de confirmer toute transaction.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 11,
    question: 'Comment puis-je m\'assurer que mes transactions et mon portefeuille sont sécurisés ?',
    answer: 'Gardez toujours vos clés privées en sécurité et ne les partagez jamais avec personne.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 12,
    question: 'Comment les récompenses de staking sont-elles calculées et distribuées ?',
    answer: 'Les récompenses de staking sont calculées en fonction du nombre de tokens que vous stakez, de la durée de votre période de staking et de la performance globale du pool de staking. Les récompenses sont distribuées à chaque bloc. Vous pouvez suivre vos récompenses de staking dans la section "Récompenses" du Hub Axone.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 13,
    question: 'Puis-je déverrouiller mes tokens Axone à tout moment ?',
    answer: 'Bien que vous puissiez initier le processus de déstakage à tout moment, il y a généralement une période d\'attente obligatoire (connue sous le nom de "période de déverrouillage") avant que vos tokens ne soient libérés et deviennent disponibles pour retrait. La durée de la période de déstakage peut varier, alors veuillez consulter le Hub Axone pour des détails spécifiques.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 14,
    question: 'Qu\'est-ce que le processus de déverrouillage et combien de temps cela prend-il ?',
    answer: 'Le processus de déverrouillage implique la période de transition après que vous ayez initié le déstakage de vos tokens Axone. Pendant cette période, vos tokens sont verrouillés et ne sont pas éligibles pour des récompenses ou des transactions. La période de déverrouillage peut varier en longueur, alors veuillez vérifier le Hub Axone pour des détails spécifiques sur la durée.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 15,
    question: 'Qu\'est-ce que le slashing ?',
    answer: 'Le slashing est un mécanisme de pénalité conçu pour garantir la sécurité et l\'intégrité du réseau. Il implique de réduire ou de confisquer les tokens d\'un staker s\'ils se livrent à un comportement malveillant ou à une double signature d\'un bloc. Ce mécanisme aide à garantir que tous les participants agissent dans le meilleur intérêt du réseau blockchain.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 16,
    question: 'Que se passe-t-il si les validateurs auxquels j\'ai délégué mes tokens sont slashed ?',
    answer: 'Si les validateurs auxquels vous avez délégué vos tokens sont slashed, vous serez également affecté en tant que délégateur. Un validateur est mis en quarantaine lorsqu\'il est slashed, et 5% de son stake est brûlé. Ainsi, vous pouvez perdre 5% du montant que vous avez staké sur ce validateur.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 17,
    question: 'Comment puis-je minimiser le risque de slashing lors de la délégation de mes tokens ?',
    answer: 'Pour minimiser le risque de slashing lors de la délégation de vos tokens, considérez les points suivants :<br />Choisissez des validateurs fiables : Déléguez vos tokens à des validateurs bien établis et réputés avec une performance prouvée et une fiabilité.<br />Diversifiez vos délégations : Répartissez vos tokens entre plusieurs validateurs pour réduire l\'impact de la réduction d\'un seul validateur.<br />Surveillez la performance des validateurs : Vérifiez régulièrement la performance et le comportement de vos validateurs choisis. Restez informé de leur temps de disponibilité, de leur participation à la gouvernance et de leur contribution globale au réseau.<br />Restez informé : Tenez-vous au courant des mises à jour du réseau et des changements dans les règles de slashing pour prendre des décisions éclairées sur vos délégations.',
    category: FR_CATEGORIES_ENUM.STAKING,
    categoryBgColor: COLORS_ENUM.ORANGE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 18,
    question: 'Qu\'est-ce que la gouvernance ?',
    answer: 'La gouvernance dans le Hub Axone fait référence au processus par lequel les détenteurs de tokens Axone peuvent participer aux activités de prise de décision liées au réseau blockchain. Cela inclut le vote sur les propositions qui affectent les opérations, les mises à jour et les politiques du réseau. La gouvernance assure que la communauté a son mot à dire dans la direction et le développement du réseau.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 19,
    question: 'Comment puis-je consulter et participer aux propositions de gouvernance ?',
    answer: 'Visitez la section "Gouvernance" dans le Hub. Ici, vous pouvez voir les propositions actives et passées, lire les détails sur chaque proposition et voter. Votre pouvoir de vote est basé sur le nombre de tokens Axone que vous staker.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 20,
    question: 'Quels types de propositions peuvent être votés ?',
    answer: 'Les types de propositions pouvant être votés au sein du Hub Axone incluent : <br />Mises à jour du réseau et changements de protocole. <br />Allocation de fonds du trésor communautaire. <br />Changements des paramètres de gouvernance et des récompenses de staking. <br />Propositions pour de nouvelles fonctionnalités ou améliorations. <br />Changements de politique et amendements aux règles existantes.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 21,
    question: 'Y a-t-il une quantité minimale de tokens Axone requise pour voter sur des propositions ?',
    answer: 'Non, il n\'y a pas de quantité minimale de tokens Axone requise pour participer au vote. Cependant, un montant minimum est requis pour initier une proposition afin d\'éviter les propositions spam et de garantir que le proposant ait un stake significatif dans le réseau.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 22,
    question: 'Comment les votes sont-ils comptés et les résultats déterminés ?',
    answer: 'Les votes sont comptés en fonction du nombre de tokens Axone stakés par chaque participant. Chaque token représente un vote. Les résultats sont déterminés par le nombre total de votes exprimés pour chaque option (par exemple, Pour, Contre, Abstention). Les propositions sont valides si le quorum (33 % des votes) est atteint. Les propositions sont validées si le seuil est atteint : s\'il y a plus de 50 % de votes "Pour".',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 23,
    question: 'Que se passe-t-il après l\'approbation d\'une proposition ?',
    answer: 'Après l\'approbation d\'une proposition, le processus de mise en œuvre commence. Cela peut impliquer la mise à jour du protocole du réseau, l\'allocation de fonds ou la mise en œuvre des changements proposés. Les étapes spécifiques et le calendrier de mise en œuvre dépendent de la nature de la proposition et des règles de gouvernance du réseau.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 24,
    question: 'Puis-je changer mon vote une fois qu\'il est exprimé ?',
    answer: 'Une fois qu\'un vote est exprimé, il peut être changé tant que la période de vote n\'est pas terminée.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 25,
    question: 'Que signifient les paramètres de quorum, seuil et veto ?',
    answer: 'Quorum : Le pourcentage minimum de pouvoir de vote qui doit être exprimé sur une proposition pour que le résultat soit valide.  <br />Seuil : La proportion minimale de votes Oui (hors votes Abstention) pour que la proposition soit acceptée. <br />Veto : La valeur minimale du rapport entre les votes de Veto et le total des votes pour que la proposition soit rejetée.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 26,
    question: 'Comment puis-je soumettre ma propre proposition de gouvernance ?',
    answer: 'Pour soumettre votre propre proposition : Ouvrez l\'Axone Hub et connectez votre portefeuille. Accédez à la section "Gouvernance". Sélectionnez l\'option pour créer une nouvelle proposition. Fournissez les détails nécessaires et la description de votre proposition. Soumettez la proposition. Vous devez faire un dépôt de 1 000 AXONE pour soumettre votre proposition. Les tokens AXONE seront brûlés si : <br /> 1. Les votes n\'atteignent pas le quorum.  <br /> 2. Assez de votes "non avec veto" atteignent 33 % par rapport au total des votes.  <br /> Sinon, les tokens seront retournés.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 27,
    question: 'Comment puis-je rester informé des propositions et des décisions de gouvernance à venir ?',
    answer: 'Pour rester informé des propositions et des décisions de gouvernance à venir : <br />1. Consultez régulièrement la section "Gouvernance" dans l\'Axone Hub. <br />2. Rejoignez les forums communautaires et Discord.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 28,
    question: 'Quels sont les avantages de participer à la gouvernance et de voter sur les propositions ?',
    answer: 'Participer à la gouvernance et voter sur les propositions vous permet d\'influencer directement la direction et le développement du réseau Axone. Les avantages incluent : <br />1. Influencer les décisions importantes qui façonnent l\'avenir du réseau. <br />2. Aider à garantir que le réseau fonctionne de manière alignée avec les intérêts de la communauté. <br />3. Rester engagé et informé sur les développements et les changements du réseau.',
    category: FR_CATEGORIES_ENUM.GOVERNANCE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 29,
    question: 'Qu\'est-ce que l\'Axone Bridge ?',
    answer: 'Le bridge Axone utilise IBC (Inter Blockchain Communication) pour permettre l\'interopérabilité entre la blockchain Axone et d\'autres blockchains, en particulier dans l\'écosystème Cosmos. Il permet aux utilisateurs de transférer des tokens entre Axone et d\'autres blockchains, facilitant une interaction et une intégration fluides avec une gamme plus large d\'applications et de services décentralisés.',
    category: FR_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 30,
    question: 'Y a-t-il des frais associés à l\'utilisation d\'IBC ?',
    answer: 'Oui, des frais sont associés à l\'utilisation d\'IBC. Ces frais couvrent le coût du traitement du transfert et garantissent la sécurité du réseau.',
    category: FR_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 31,
    question: 'Combien de temps faut-il pour qu\'un transfert de tokens soit complété en utilisant l\'Axone Bridge ?',
    answer: 'Le temps nécessaire pour qu\'un transfert de tokens soit complété en utilisant IBC peut varier en fonction de la congestion du réseau et des blockchains spécifiques impliquées. En général, les transferts devraient être complétés en quelques minutes. Vous pouvez suivre l\'état de votre transfert sur l\'Explorer.',
    category: FR_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 32,
    question: 'Puis-je transférer des tokens de l\'écosystème Cosmos vers Axone en utilisant IBC ?',
    answer: 'Oui, IBC prend en charge les transferts bidirectionnels tant qu\'un canal est ouvert entre Axone et la chaîne de destination/réception.',
    category: FR_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 33,
    question: 'Y a-t-il des risques associés à l\'utilisation d\'IBC ?',
    answer: 'Bien que l\'IBC soit conçu pour être sécurisé, les transferts inter-chaînes comportent des risques inhérents, tels que des vulnérabilités potentielles et des retards du réseau. Il est important de vérifier tous les détails de la transaction et de vous assurer que vous utilisez les bonnes adresses. De plus, gardez votre portefeuille et vos clés privées en sécurité pour éviter tout accès non autorisé.',
    category: FR_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
  {
    id: 34,
    question: 'Que dois-je faire si mon transfert de tokens échoue ou est retardé ?',
    answer: 'Si votre transfert de tokens échoue ou est retardé, vérifiez les points suivants : <br />1. Assurez-vous d\'avoir saisi la bonne adresse de destination et les détails de la transaction. <br />2. Vérifiez que les blockchains Axone et la chaîne cible fonctionnent normalement et ne subissent pas de congestion. <br />3. Contactez l\'équipe de support Axone pour obtenir de l\'aide si le problème persiste. Fournissez-leur l\'ID de la transaction et tous les détails pertinents pour aider à résoudre le problème.',
    category: FR_CATEGORIES_ENUM.BRIDGE,
    categoryBgColor: COLORS_ENUM.LIGHT_BLUE_2,
    categoryTextColor: COLORS_ENUM.DARK_BLUE
  },
];
