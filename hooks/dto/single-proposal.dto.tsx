type Message = {
  '@type': string;
  authority: string;
  plan: {
    name: string;
    time: string;
    height: string;
    info: string;
    upgraded_client_state: null;
  };
};

type Deposit = {
  denom: string;
  amount: string;
};

type Vote = {
  total: string;
  votingEnds: string;
  tallyInPercents: {
    yes: string;
    no: string;
    abstain: string;
    noWithVeto: string;
  };
};

type VoteOverview = {
  quorum: string;
  threshold: string;
  votingPeriod: {
    start: string;
    end: string;
  };
};

type SingleProposal = {
  id: string;
  messages: Message[];
  status: string;
  final_tally_result: {
    yes_count: string;
    abstain_count: string;
    no_count: string;
    no_with_veto_count: string;
  };
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
  vote: Vote;
  voteOverview: VoteOverview;
};

type SingleProposalDTO = {
  proposal: SingleProposal;
};

export type { SingleProposalDTO, SingleProposal };