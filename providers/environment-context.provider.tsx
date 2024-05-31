'use client';
import React from 'react';
import { io } from 'socket.io-client';
import { Environment } from '@/app/actions';
import { EnvironmentContext } from '@/context/environment-context';

type PropsWithChildren =  {
  env: Environment;
  children?: React.ReactNode;
}

const EnvironmentProvider: React.FC<PropsWithChildren> = ({ children, env }) => {
  const { baseUrl, walletConnectID, isDev } = env;
  const socket = io(`${baseUrl}`, {
    autoConnect: false,
    transports: ['websocket'],
  });
  return (
    <EnvironmentContext.Provider value={{
      isDev,
      baseUrl,
      walletConnectID,
      socket
    }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export { EnvironmentContext, EnvironmentProvider };