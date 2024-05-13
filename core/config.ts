export const config = {
  baseApiUri: process.env.NEXT_PUBLIC_AXONE_BASE_URL,
  isProduction: process.env.NODE_ENV === 'production',
  walletConnectID: process.env.NEXT_PUBLIC_WALLECONNECT_PROJECT_ID,
};

