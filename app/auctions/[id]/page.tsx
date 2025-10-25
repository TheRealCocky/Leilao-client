"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/server/api";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { useSocket } from "@/lib/hooks/useSocket";
import { Button } from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/use-toast";

export default function AuctionDetailPage() {
    const { id } = useParams();
    const [auction, setAuction] = useState<any>(null);
    const [bids, setBids] = useState<any[]>([]);
    const [bidAmount, setBidAmount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const { hours, minutes, seconds, expired } = useCountdown(auction?.endTime);
    const socket = useSocket();

    // ✅ Carregar leilão e lances iniciais
    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const data = await api.auctions.get(id as string);
                setAuction(data);
                const bidsList = await api.bids.byAuction(id as string);
                setBids(bidsList);
            } catch (err) {
                console.error(err);
                toast({
                    title: "Erro ao carregar leilão",
                    description: "Tenta atualizar a página.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    // ✅ WebSocket listeners
    useEffect(() => {
        if (!socket || !auction?.id) return;

        const handleAuctionUpdated = (updated: any) => {
            if (updated.id === auction.id) {
                setAuction((prev: any) => ({ ...prev, ...updated }));
            }
        };

        const handleNewBid = (payload: any) => {
            if (payload.auctionId === auction.id) {
                setBids((prev) => [payload.bid, ...prev]);
            }
        };

        const handleNotification = (data: any) => {
            toast({
                title: "📢 Notificação",
                description: data.message,
            });
        };

        socket.on("auctionUpdated", handleAuctionUpdated);
        socket.on("newBid", handleNewBid);
        socket.on("notification", handleNotification);

        // Cleanup
        return () => {
            socket.off("auctionUpdated", handleAuctionUpdated);
            socket.off("newBid", handleNewBid);
            socket.off("notification", handleNotification);
        };
    }, [socket, auction]);

    // ✅ Função para enviar lance
    const handleBid = async () => {
        try {
            if (!bidAmount || bidAmount <= auction.currentPrice) {
                toast({
                    title: "Lance inválido",
                    description: "O valor deve ser maior que o preço atual.",
                    variant: "destructive",
                });
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                toast({
                    title: "Sessão expirada",
                    description: "Faz login novamente para continuar.",
                    variant: "destructive",
                });
                return;
            }

            await api.bids.create({ auctionId: auction.id, amount: bidAmount }, token);

            toast({
                title: "Lance enviado!",
                description: `Você deu um lance de ${bidAmount.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                })}.`,
                variant: "success",
            });

            setBidAmount(0);
            setIsDialogOpen(false);
        } catch (err: any) {
            toast({
                title: "Erro ao dar lance",
                description: err.message || "Tente novamente.",
                variant: "destructive",
            });
        }
    };

    if (loading) return <div>Carregando detalhes do leilão...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto mt-10">
            <h1 className="text-3xl font-bold">{auction.title}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{auction.description}</p>

            <div className="mt-4 space-y-2">
                <p>
                    Preço atual:{" "}
                    <strong>
                        {auction.currentPrice.toLocaleString("pt-AO", {
                            style: "currency",
                            currency: "AOA",
                        })}
                    </strong>
                </p>
                {!expired ? (
                    <p>
                        Tempo restante: {hours}h {minutes}m {seconds}s
                    </p>
                ) : (
                    <p className="text-red-500 font-bold">Leilão encerrado</p>
                )}
            </div>

            {/* 🏆 Mostra o vencedor quando o leilão termina */}
            {expired && bids.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg">
                    {(() => {
                        const topBid = [...bids].sort((a, b) => b.amount - a.amount)[0];
                        return (
                            <p className="font-semibold text-green-700 dark:text-green-300">
                                🏆 Leilão encerrado — vencedor:{" "}
                                {topBid?.user?.name || "Desconhecido"} com{" "}
                                {topBid?.amount.toLocaleString("pt-AO", {
                                    style: "currency",
                                    currency: "AOA",
                                })}
                            </p>
                        );
                    })()}
                </div>
            )}


            {!expired && (
                <div className="mt-6">
                    <Button onClick={() => setIsDialogOpen(true)}>Dar Lance</Button>
                </div>
            )}

            {/* ✅ Modal funcional */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Dar um Lance</DialogTitle>
                        <DialogDescription>
                            Insira o valor do lance (deve ser maior que o preço atual).
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-3">
                        <Input
                            type="number"
                            min={auction.currentPrice + 1}
                            placeholder={`Mínimo: ${auction.currentPrice + 1}`}
                            value={bidAmount || ""}
                            onChange={(e) => setBidAmount(Number(e.target.value))}
                        />
                    </div>

                    <DialogFooter className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleBid}>Confirmar Lance</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Lances recentes</h2>
                {bids.length > 0 ? (
                    <ul className="divide-y">
                        {bids.map((b) => (
                            <li key={b.id || b._id} className="py-2 flex justify-between">
                <span>
                  {b.user?.name || "Anônimo"} —{" "}
                    {b.amount.toLocaleString("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                    })}
                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(b.createdAt).toLocaleString("pt-AO")}
                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                        Nenhum lance ainda.
                    </p>
                )}
            </div>
        </div>
    );
}















