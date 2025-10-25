"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/server/api";
import Link from "next/link";

export default function CreateAuctionPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
        startingPrice: "",
        endTime: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
            if (!raw) {
                router.push("/login");
                return;
            }
            const parsed = JSON.parse(raw);
            setUserRole(parsed?.role ?? null);
        } catch (err) {
            setUserRole(null);
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.title.trim()) return "Title is required";
        if (!form.startingPrice || Number(form.startingPrice) <= 0) return "Starting price must be positive";
        if (!form.endTime) return "End time is required";
        const end = new Date(form.endTime);
        if (Number.isNaN(end.getTime()) || end.getTime() <= Date.now()) return "End time must be in the future";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (userRole !== "SELLER") {
            setError("Only sellers can create auctions.");
            return;
        }

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated.");
                setLoading(false);
                return;
            }

            const payload = {
                title: form.title.trim(),
                description: form.description.trim(),
                startingPrice: Number(form.startingPrice),
                endTime: new Date(form.endTime).toISOString(),
            };

            const created = await api.auctions.create(payload, token);
            const id = created?.id || created?._id;

            if (id) {
                router.push(`/auctions/${id}`);
            } else {
                router.push("/auctions");
            }
        } catch (err: any) {
            console.error("Error creating auction:", err);
            setError(err.message || "Failed to create auction");
        } finally {
            setLoading(false);
        }
    };

    if (userRole === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950 p-6">
                <div className="text-gray-600 dark:text-gray-300 animate-pulse">Checking user...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Create new auction</h1>
                    <Link href="/auctions" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
                        Back to list
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                    {userRole !== "SELLER" ? (
                        <div className="text-center py-10">
                            <p className="text-red-500 font-medium mb-4">
                                You don't have permission to create auctions.
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Only users with the SELLER role can create auctions.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-950"
                                    placeholder="Ex: Tesla Model 3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-950"
                                    placeholder="Optional details about the item"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Starting price (AOA)</label>
                                    <input
                                        name="startingPrice"
                                        value={form.startingPrice}
                                        onChange={handleChange}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-950"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">End time</label>
                                    <input
                                        name="endTime"
                                        value={form.endTime}
                                        onChange={handleChange}
                                        type="datetime-local"
                                        className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-950"
                                        required
                                    />
                                </div>
                            </div>

                            {error && <div className="text-sm text-red-500">{error}</div>}

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:opacity-95 disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        <>Create auction</>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded text-sm"
                                    onClick={() => setForm({ title: "", description: "", startingPrice: "", endTime: "" })}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}



