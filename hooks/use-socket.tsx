/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

type SocketParams = {
  socket: Socket;
  eventName: string;
  eventHandler: (data: any) => any;
  isLoading: boolean;
};

const useSocket = ({ socket, eventName, eventHandler, isLoading }: SocketParams) => {

  useEffect(() => {
    if (!isLoading) {
      socket.connect();
      socket.on('connect', () => console.log('connected from hook to', eventName, socket.id));
      socket.on(eventName, (data) => {
        eventHandler(data);
      });
      socket.on('disconnect', () => console.log('disconnected'));
    }

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket, eventName, eventHandler, isLoading]);
};

export { useSocket };