import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/ui/use-toast";

export const metadata = {
    title: "Leilão App",
    description: "Sistema de leilões moderno com Next.js + NestJS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt">
        <body className="bg-gray-50 text-gray-900">
        <ToastProvider>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </ToastProvider>
        </body>
        </html>
    );
}




