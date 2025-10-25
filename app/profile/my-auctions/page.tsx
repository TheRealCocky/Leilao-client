"use client";

import { useEffect, useState } from "react";
import { api } from "@/server/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Auction {
    _id: string;
    title: string;
    description: string;
    currentPrice: number;
    endTime: string;
    status: string;
}

export default function MyAuctionsPage() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchMyAuctions = async () => {
            try {
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;

                if (!token || !user) {
                    router.push("/auth/login");
                    return;
                }

                const parsedUser = JSON.parse(user);
                const data = await api.auctions.list(); // traz todos
                const my = data.filter((a: any) => a.ownerId === parsedUser.id);
                setAuctions(my);
            } catch (err: any) {
                console.error("❌ Erro ao buscar leilões:", err);
                setError(err.message || "Erro ao carregar leilões.");
            } finally {
                setLoading(false);
            }
        };

        fetchMyAuctions();
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-gray-600 dark:text-gray-300">
                Carregando seus leilões...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    if (auctions.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">Você ainda não criou nenhum leilão.</p>
                <Link
                    href="/auctions/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Criar novo leilão
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6 text-center">Meus Leilões</h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {auctions.map((auction) => {
                        const timeRemaining = new Date(auction.endTime).getTime() - Date.now();
                        const hours = Math.floor(timeRemaining / 1000 / 60 / 60);
                        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);

                        return (
                            <Link
                                key={auction._id}
                                href={`/auctions/${auction._id}`}
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md transition"
                            >
                                <h2 className="text-lg font-semibold mb-2">{auction.title}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-3">
                                    {auction.description}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Preço atual:{" "}
                                    <span className="font-medium">${auction.currentPrice.toLocaleString()}</span>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Tempo restante:{" "}
                                    <span className="font-medium">
                    {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
                  </span>
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

