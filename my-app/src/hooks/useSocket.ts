// src/hooks/useSocket.ts
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (url: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const listenersRef = useRef<{ [key: string]: (data: any) => void }>({});

    useEffect(() => {
        const socketInstance = io(url);
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            setConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setConnected(false);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [url]);

    const on = (event: string, callback: (data: any) => void) => {
        if (socket) {
            socket.on(event, callback);
            listenersRef.current[event] = callback;
        }
    };

    const off = (event: string) => {
        if (socket && listenersRef.current[event]) {
            socket.off(event, listenersRef.current[event]);
            delete listenersRef.current[event];
        }
    };

    const emit = (event: string, data: any) => {
        if (socket) {
            socket.emit(event, data);
        }
    };

    return { socket, connected, on, off, emit };
};

export default useSocket;
