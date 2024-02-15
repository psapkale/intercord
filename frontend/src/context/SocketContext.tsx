/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketContextProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const sockett = io("http://localhost:3000");
    setSocket(sockett);

    return () => {
      sockett && sockett.close();
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
