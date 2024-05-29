'use client';
import React from 'react';
import { Environment } from '@/app/actions';
import { EnvironmentContext } from '@/context/environment-context';

type PropsWithChildren =  {
  env: Environment;
  children?: React.ReactNode;
}

const EnvironmentProvider: React.FC<PropsWithChildren> = async ({ children, env }) => {
  const { baseUrl, walletConnectID } = env;
  return (
    <EnvironmentContext.Provider value={{
      baseUrl,
      walletConnectID
    }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export { EnvironmentContext, EnvironmentProvider };