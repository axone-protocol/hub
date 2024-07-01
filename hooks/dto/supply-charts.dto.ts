type SupplyChartsDTO = {
  issuance: {
    time: string;
    change: number;
    burnt: number;
    issuance: number;
  };
  burnt: number;
  growth: number;
}

export type { SupplyChartsDTO };
