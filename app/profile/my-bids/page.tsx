"use client";

import { useEffect, useState } from "react";
import { api } from "@/server/api";
import Link from "next/link";

type Bid = {
    id: string;
    amount: number;
    createdAt: string;
    auction: {
        id: string;
        title: string;
        status: string;
    };
};

export default function MyBidsPage() {
    const [bids, setBids] = useState<Bid[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                // garante que só executa no client
                if (typeof window === "undefined") return;

                const token = localStorage.getItem("token");
                const storedUser = localStorage.getItem("user");

                if (!token || !storedUser) {
                    setError("Usuário não autenticado.");
                    setLoading(false);
                    return;
                }

                const user = JSON.parse(storedUser);
                const data = await api.bids.byUser(user.id, token);

                if (Array.isArray(data)) {
                    setBids(data);
                } else {
                    setError("Não foi possível carregar seus lances.");
                }
            } catch (err: any) {
                console.error("Erro ao buscar lances:", err);
                setError("Erro ao carregar seus lances.");
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Carregando seus lances...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!bids.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3">
                <p className="text-gray-500">Você ainda não fez nenhum lance.</p>
                <Link href="/auctions" className="text-blue-600 hover:underline">
                    Explorar leilões
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 mt-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Meus Lances</h1>

                <div className="space-y-4">
                    {bids.map((bid) => (
                        <Link
                            key={bid.id}
                            href={`/auctions/${bid.auction.id}`}
                            className="block border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-medium">{bid.auction.title}</h2>
                                    <p className="text-sm text-gray-500">
                                        {new Date(bid.createdAt).toLocaleString("pt-BR")}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">
                                        Kz{" "}
                                        {Number(bid.amount).toLocaleString("pt-PT", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </p>


                                    <p
                                        className={`text-sm ${
                                            bid.auction.status === "OPEN"
                                                ? "text-green-500"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {bid.auction.status === "OPEN" ? "Ativo" : "Encerrado"}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

