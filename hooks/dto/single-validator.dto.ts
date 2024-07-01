type SingleValidatorDTO = {
  address: string;
  commission: {
    updateTime: string,
    rate: string,
    maxChangeRate: string,
    maxRate: string
  };
  description: {
    moniker: string,
    details: string,
    securityContact: string,
    identity: string,
    website: string
  };
  jailed: boolean;
  logo: string;
  stakedAmount: string;
  status: string;
  uptime: number;
  votingPower: number;
}

export type { SingleValidatorDTO };