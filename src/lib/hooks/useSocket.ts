"use client";

import { useEffect } from "react";
import { socket } from "../websocket";

export function useSocket(userId?: string) {
    useEffect(() => {
        if (!userId) return;

        // Garante que só conecta uma vez
        if (!socket.connected) {
            socket.connect();
            console.log("🔗 Socket conectado ao servidor");
        }

        // Entra na sala do usuário para receber notificações privadas
        socket.emit("join", userId);
        console.log(`👤 Entrou na sala: ${userId}`);

        // Cleanup: apenas remove listeners (não desconecta o socket global)
        return () => {
            socket.off("notification");
        };
    }, [userId]);

    return socket;
}


