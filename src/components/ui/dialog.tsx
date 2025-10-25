"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    useEffect(() => {
        if (typeof document === "undefined") return;

        // ✅ Impede scroll do body enquanto o modal estiver aberto
        document.body.style.overflow = open ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
                open ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
            {/* Backdrop */}
            <div
                onClick={() => onOpenChange(false)}
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            />

            {/* Conteúdo */}
            <div
                className={`relative z-10 transform transition-all duration-300 ${
                    open
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-4 scale-95"
                }`}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

// 🔹 Conteúdo principal do modal
export const DialogContent: React.FC<
    React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>
> = ({ children, className = "", style }) => {
    return (
        <div
            role="dialog"
            aria-modal="true"
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[95vw] max-w-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700 ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

// 🔹 Cabeçalho
export const DialogHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
                                                                                            children,
                                                                                            className = "",
                                                                                        }) => <div className={`mb-4 ${className}`}>{children}</div>;

// 🔹 Título
export const DialogTitle: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
                                                                                           children,
                                                                                           className = "",
                                                                                       }) => (
    <h3 className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
        {children}
    </h3>
);

// 🔹 Descrição
export const DialogDescription: React.FC<
    React.PropsWithChildren<{ className?: string }>
> = ({ children, className = "" }) => (
    <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>{children}</p>
);

// 🔹 Rodapé (botões)
export const DialogFooter: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
                                                                                            children,
                                                                                            className = "",
                                                                                        }) => (
    <div
        className={`mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 ${className}`}
    >
        {children}
    </div>
);

