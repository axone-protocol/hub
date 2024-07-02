/* eslint-disable @typescript-eslint/no-explicit-any */
type Message = {
  '@type': string;
  authority: string;
  params?: any;
  plan?: any;
};

type Deposit = {
  denom: string;
  amount: string;
};

type TallyResult = {
  yes_count: string;
  abstain_count: string;
  no_count: string;
  no_with_veto_count: string;
};

type Proposal = {
  id: string;
  messages: Message[];
  status: string;
  final_tally_result: TallyResult;
  submit_time: string;
  deposit_end_time: string;
  total_deposit: Deposit[];
  voting_start_time: string;
  voting_end_time: string;
  metadata: string;
  title: string;
  summary: string;
  proposer: string;
  expedited: boolean;
  failed_reason: string;
  turnout: string;
};

type Pagination = {
  next_key: null | string;
  total: string;
};

type ProposalsListDTO = {
  proposals: Proposal[];
  pagination: Pagination;
};

export type { ProposalsListDTO, Proposal };