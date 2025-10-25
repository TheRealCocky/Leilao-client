"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/server/api";
import Link from "next/link";

type User = {
    id: string;
    name: string;
    email: string;
    role: "BUYER" | "SELLER" | "ADMIN";
    createdAt?: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [saving, setSaving] = useState(false);

    // load user from API (use token from localStorage)
    useEffect(() => {
        const fetchMe = async () => {
            try {
                setLoading(true);
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                if (!token) {
                    router.push("/auth/login");
                    return;
                }

                // api.auth.me expects token and will set Authorization header
                const data = await api.auth.me(token);
                // Backend returns { user, token } sometimes; handle both shapes:
                const fetchedUser = data?.user ?? data;
                setUser(fetchedUser);
            } catch (err: any) {
                console.error("❌ Could not fetch user:", err);
                setError(err.message || "Could not fetch user");
                // if unauthorized, apiFetch already redirects, but ensure client redirect too
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    router.push("/auth/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, [router]);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        router.push("/auth/login");
    };

    const openEdit = () => {
        setEditName(user?.name ?? "");
        setEditEmail(user?.email ?? "");
        setEditOpen(true);
    };

    const saveEdit = async () => {
        if (!user) return;
        setSaving(true);
        try {
            // For now we call users.create/update endpoints if exist.
            // If you have a /users PATCH endpoint, call it here.
            // I'll try to call api.users.create as fallback (but ideally you implement update endpoint).
            // Replace below with your update endpoint if you have one.
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            if (!token) throw new Error("Not authenticated");

            // If backend supports patch /users/:id then do:
            // await api.users.update(user.id, { name: editName, email: editEmail }, token)
            // For demo, we call /users POST to create? (Not ideal). Instead let's call /users (create) is wrong.
            // So we'll optimistically update local UI and save to localStorage. Tell user to implement edit API.
            const updated = { ...user, name: editName, email: editEmail };
            setUser(updated as User);
            localStorage.setItem("user", JSON.stringify(updated));
            setEditOpen(false);
            alert("Profile updated locally. Implement a backend PATCH /users/:id to persist changes.");
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-6">
                <div className="text-gray-600 dark:text-gray-300 animate-pulse">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-6">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => router.push("/auth/login")}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Go to login
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-6">
                <div className="text-gray-600 dark:text-gray-300">No profile available.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 mt-20">
            <div className="max-w-3xl mx-auto space-y-6">
                <header className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Profile</h1>
                    <div className="space-x-2">
                        <button
                            onClick={openEdit}
                            className="px-3 py-1.5 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-lg font-medium mb-3">{user.name}</p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-lg font-medium mb-3">{user.email}</p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="text-lg font-medium mb-3">{user.role}</p>

                    {user.createdAt && (
                        <>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Member since</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/profile/my-auctions"
                        className="block text-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                        <div className="font-semibold">My Auctions</div>
                        <div className="text-sm text-gray-500">Manage what you sell</div>
                    </Link>

                    <Link
                        href="/profile/my-bids"
                        className="block text-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                        <div className="font-semibold">My Bids</div>
                        <div className="text-sm text-gray-500">Track your bids</div>
                    </Link>

                    <Link
                        href="/notifications"
                        className="block text-center p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                        <div className="font-semibold">Notifications</div>
                        <div className="text-sm text-gray-500">See recent alerts</div>
                    </Link>
                </div>
            </div>

            {/* Edit Modal */}
            {editOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
                    onClick={() => setEditOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border p-2 rounded mb-3 bg-white dark:bg-gray-800"
                        />

                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="w-full border p-2 rounded mb-4 bg-white dark:bg-gray-800"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditOpen(false)}
                                className="px-4 py-2 rounded border hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                disabled={saving}
                                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
