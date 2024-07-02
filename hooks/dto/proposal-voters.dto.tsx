type Voter = {
  voter: string;
  option: string;
};

type Pagination = {
  total: number;
  limit: number | null;
  offset: number | null;
};

type ProposalVotersDTO = {
  voters: Voter[];
  pagination: Pagination;
};

export type { ProposalVotersDTO };