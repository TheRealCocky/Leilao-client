"use client";

import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useNotifications(userId?: string) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const socket = useSocket();

    useEffect(() => {
        if (!socket || !userId) return;

        // 👉 entra na sala pessoal do usuário
        socket.emit("join", userId);

        const onNotification = (notif: any) => {
            setNotifications((prev) => [notif, ...prev]);
        };

        socket.on("notification", onNotification);

        return () => {
            socket.off("notification", onNotification);
        };
    }, [socket, userId]);

    return { notifications, setNotifications };
}



