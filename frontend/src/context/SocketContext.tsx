/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserDetails } from "@/utils/store";
import { createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketContextProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const updateAnnouncement = useUserDetails(
    (state) => state.updateAnnouncement
  );

  useEffect(() => {
    const sockett = io("http://localhost:3000");
    setSocket(sockett);

    sockett.on("connect", () => {
      console.log("Connected");
    });

    sockett.on("announcement", (announcement: any) => {
      updateAnnouncement(announcement);
    });

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
