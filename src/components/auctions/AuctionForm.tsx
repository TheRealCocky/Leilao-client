// components/auctions/AuctionForm.tsx
"use client";
import { useState } from "react";

type Props = {
    onSubmit: (payload: {
        title: string;
        description?: string;
        startingPrice: number;
        endTime: string;
    }) => Promise<void>;
    initial?: {
        title?: string;
        description?: string;
        startingPrice?: number;
        endTime?: string;
    };
};

export default function AuctionForm({ onSubmit, initial }: Props) {
    const [title, setTitle] = useState(initial?.title ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [startingPrice, setStartingPrice] = useState(
        initial?.startingPrice ?? 0
    );
    const [endTime, setEndTime] = useState(
        initial?.endTime ??
        new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            await onSubmit({
                title,
                description,
                startingPrice: Number(startingPrice),
                endTime: new Date(endTime).toISOString(),
            });
        } catch (err: any) {
            setError(err.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border p-2 rounded bg-white dark:bg-gray-900"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded bg-white dark:bg-gray-900"
                    rows={4}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Starting Price</label>
                    <input
                        required
                        type="number"
                        min={0}
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(Number(e.target.value))}
                        className="w-full border p-2 rounded bg-white dark:bg-gray-900"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">End Time</label>
                    <input
                        required
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full border p-2 rounded bg-white dark:bg-gray-900"
                    />
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60"
            >
                {loading ? "Creating..." : "Create Auction"}
            </button>
        </form>
    );
}
