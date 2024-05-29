'use server';

export type Environment = {
  baseUrl: string | undefined;
  walletConnectID: string | undefined;
};

export const getEnvironment = async (): Promise<Environment> => {
  return {
    baseUrl: process.env.AXONE_BASE_URL,
    walletConnectID: process.env.WALLECONNECT_PROJECT_ID,
  };
};