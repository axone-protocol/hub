export const config = {
  baseApiUri: process.env.AXONE_BASE_URL,
  isProduction: process.env.NODE_ENV === 'production',
  walletConnectID: process.env.WALLECONNECT_PROJECT_ID,
};