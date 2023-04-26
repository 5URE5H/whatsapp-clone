import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import io from "socket.io-client";

const SocketContext = React.createContext<any>(undefined);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({
  id,
  children,
}: PropsWithChildren<{ id: string }>) {
  const [socket, setSocket] = useState<any>();

  useEffect((): any => {
    const newSocket = io("http://localhost:5000", { query: { id } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
