'use client';
import React from 'react';
import { Environment } from '@/app/actions';
import { EnvironmentContext } from '@/context/environment-context';

type PropsWithChildren =  {
  env: Environment;
  children?: React.ReactNode;
}

const EnvironmentProvider: React.FC<PropsWithChildren> = ({ children, env }) => {
  const { baseUrl, walletConnectID, isDev } = env;
  return (
    <EnvironmentContext.Provider value={{
      isDev,
      baseUrl,
      walletConnectID
    }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export { EnvironmentContext, EnvironmentProvider };