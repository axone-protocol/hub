import { createContext, useContext } from 'react';

type EnvironmentContextProps = {
  baseUrl: string | undefined;
  walletConnectID: string | undefined;
}

const defaultModalContext: EnvironmentContextProps = {
  baseUrl: undefined,
  walletConnectID: undefined,
};
const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error('useEnvironment must be used within a EnvironmentProvider');
  }
  return context;
};

const EnvironmentContext = createContext<EnvironmentContextProps>(defaultModalContext);

export { EnvironmentContext, useEnvironment };