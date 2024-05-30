'use server';

export type Environment = {
  isDev: boolean;
  baseUrl: string | undefined;
  walletConnectID: string | undefined;
};

export const getEnvironment = async (): Promise<Environment> => {
  return {
    isDev: process.env.NODE_ENV === 'development',
    baseUrl: process.env.AXONE_BASE_URL,
    walletConnectID: process.env.WALLECONNECT_PROJECT_ID,
  };
};