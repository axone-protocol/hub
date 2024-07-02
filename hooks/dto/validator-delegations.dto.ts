type ValidatorDelegation = {
  delegator: string;
  delegatedAmount: string;
  commission: string;
}

type ValidatorDelegationsDTO = {
  validatorDelegations: ValidatorDelegation[];
  pagination: {
    total: number;
    limit: number | string | null;
    offset: number | string | null;
  }
}

export type { ValidatorDelegationsDTO, ValidatorDelegation };