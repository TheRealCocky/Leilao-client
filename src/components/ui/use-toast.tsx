"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type UseToast = {
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success";
};

type ToastContextValue = {
    toast: (t: { title?: string; description?: string; variant?: UseToast["variant"] }) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [toasts, setToasts] = useState<UseToast[]>([]);

    const toast = useCallback((t: { title?: string; description?: string; variant?: UseToast["variant"] }) => {
        const id = Date.now().toString();
        setToasts((prev) => [{ id, title: t.title, description: t.description, variant: t.variant || "default" }, ...prev]);
        // auto remove
        setTimeout(() => {
            setToasts((prev) => prev.filter((x) => x.id !== id));
        }, 4500);
    }, []);

    const value = useMemo(() => ({ toast }), [toast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed right-4 bottom-6 z-[9999] flex flex-col gap-3">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`max-w-sm w-full rounded-md p-3 shadow-md border ${
                            t.variant === "destructive"
                                ? "bg-red-50 border-red-200 text-red-900"
                                : t.variant === "success"
                                    ? "bg-green-50 border-green-200 text-green-900"
                                    : "bg-white border-gray-200 text-gray-900"
                        }`}
                    >
                        {t.title && <div className="font-semibold">{t.title}</div>}
                        {t.description && <div className="text-sm mt-1">{t.description}</div>}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return ctx;
};
