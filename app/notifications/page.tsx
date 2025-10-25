"use client";

import { useEffect, useState } from "react";
import { api } from "@/server/api";
import { useNotifications } from "@/lib/hooks/useNotifications";
import { motion } from "framer-motion";

export default function NotificationsPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [stored, setStored] = useState<any[]>([]);
    const { notifications } = useNotifications(userId ?? undefined);

    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (!raw) return;

        try {
            const u = JSON.parse(raw);
            const id = u.id ?? u._id;
            if (id) setUserId(id);

            (async () => {
                const token = localStorage.getItem("token") || "";
                const list = await api.notifications.listByUser(id, token);
                setStored(list || []);
            })();
        } catch (err) {
            console.error("⚠️ Falha ao carregar notificações:", err);
        }
    }, []);

    // Evita duplicadas combinando as duas fontes (API + Socket)
    const all = [...notifications, ...stored].filter(
        (n, i, self) =>
            i === self.findIndex((x) => (x.id ?? x._id) === (n.id ?? n._id))
    );

    return (
        <div className="min-h-screen p-6 mt-20 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                🔔 Notificações
            </h1>

            {all.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-20">
                    Nenhuma notificação no momento.
                </p>
            ) : (
                <ul className="space-y-3">
                    {all.map((n: any, idx: number) => (
                        <motion.li
                            key={n.id ?? n._id ?? idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-lg border shadow-sm transition-colors 
                ${
                                n.read
                                    ? "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                                    : "bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700"
                            }`}
                        >
                            <div className="text-sm text-gray-900 dark:text-gray-100">
                                {n.message ?? n.text ?? "Notificação recebida"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {new Date(n.createdAt ?? Date.now()).toLocaleString("pt-PT")}
                            </div>
                        </motion.li>
                    ))}
                </ul>
            )}
        </div>
    );
}


