"use client";

import { useState } from "react";
import { api } from "@/server/api";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "BUYER",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.auth.register(form);
            window.location.href = "/login";
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Erro ao registrar usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-900">
                    Criar Conta
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    required
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                >
                    <option value="BUYER">Comprador (Buyer)</option>
                    <option value="SELLER">Vendedor (Seller)</option>
                </select>

                {error && (
                    <p className="text-red-600 text-sm text-center bg-red-50 border border-red-200 p-2 rounded-lg">
                        ⚠️ {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" /> Registrando...
                        </>
                    ) : (
                        "Registrar"
                    )}
                </button>
            </form>
        </div>
    );
}




