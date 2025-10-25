"use client";

import { useState } from "react";
import { api } from "@/server/api";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Função auxiliar para decodificar o JWT
    const decodeToken = (token: string) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch {
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 🔐 Faz o login na API
            const data = await api.auth.login(form.email, form.password);

            // Verifica se o token está no formato esperado
            const token = data.access_token || data.token?.access_token;
            if (!token) throw new Error("Token não retornado pelo servidor.");

            // Decodifica o JWT para obter as infos do usuário
            const decoded = decodeToken(token);
            if (!decoded) throw new Error("Falha ao decodificar o token.");

            // 💾 Salva token e usuário no localStorage
            localStorage.setItem("token", token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: decoded.sub,
                    email: decoded.email,
                    role: decoded.role,
                })
            );

            // Redireciona após login
            window.location.href = "/auctions";
        } catch (err: any) {
            console.error("Erro ao fazer login:", err);
            setError(err.message || "Erro ao fazer login.");
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
                    Entrar
                </h1>

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
                            <Loader2 className="animate-spin w-5 h-5" /> Entrando...
                        </>
                    ) : (
                        "Entrar"
                    )}
                </button>

                <div className="text-center flex flex-row justify-center items-center gap-2">
                    <p className="text-gray-700">Não tens uma conta?</p>
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        cria aqui
                    </a>
                </div>
            </form>
        </div>
    );
}





