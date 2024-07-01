export type ValidatorsListDTO = {
  logo: string | null;
  description: {
    moniker: string;
    details: string;
    securityContact: string;
    identity: string;
    website: string;
  };
  address: string;
  status: string;
  jailed: boolean;
  stakedAmount: string;
  votingPower: string;
  commission: {
    updateTime: string;
    rate: string;
    maxChangeRate: string;
    maxRate: string;
  };
  uptime: string;
}