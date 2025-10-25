"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
    children: React.ReactNode;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({
                                                  variant = "default",
                                                  children,
                                                  className = "",
                                                  ...props
                                              }) => {
    const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition";
    const variants: Record<string, string> = {
        default: "bg-black text-white hover:opacity-95",
        outline: "border bg-transparent hover:bg-gray-50",
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
