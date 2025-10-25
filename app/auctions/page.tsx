"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/server/api";

interface Auction {
    id: string;
    title: string;
    description: string;
    currentPrice: number;
    endTime: string;
    status: string;
}

export default function AuctionsPage() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log("📡 Fetching: /auctions");
                const data = await api.auctions.list();
                setAuctions(data);
            } catch (err: any) {
                console.error("❌ Erro ao carregar leilões:", err);
                setError(err.message || "Erro ao carregar leilões");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
                <p className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
                    Carregando leilões...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
                <div className="text-center">
                    <p className="text-red-500 font-medium">{error}</p>
                    <button
                        onClick={() => location.reload()}
                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    if (auctions.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
                <p className="text-gray-600 dark:text-gray-400">
                    Nenhum leilão disponível.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 mt-20">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6 text-center">
                    Leilões Ativos
                </h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {auctions.map((auction) => {
                        const timeRemaining =
                            new Date(auction.endTime).getTime() - Date.now();
                        const hours = Math.floor(timeRemaining / 1000 / 60 / 60);
                        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);

                        return (
                            <Link
                                href={`/auctions/${auction.id}`}
                                key={auction.id || auction.title}
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-medium mb-2">{auction.title}</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                                        {auction.description}
                                    </p>
                                </div>

                                <div className="mt-4 space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Preço atual:
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                         {auction.currentPrice.toLocaleString("pt-AO")} Kz
                                    </p>




                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Tempo restante:{" "}
                                        <span className="font-medium">
                      {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
                    </span>
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}







