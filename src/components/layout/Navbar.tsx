"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Home,
    Gavel,
    Bell,
    User,
    LogOut,
    Menu,
    X,
    PlusCircle,
    Coins,
} from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");
            setToken(savedToken);
            setUser(savedUser ? JSON.parse(savedUser) : null);
        }
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        setToken(null);
        setUser(null);
        router.push("/login");
    };

    const publicLinks = [
        { href: "/", label: "Início", icon: <Home size={18} /> },
        { href: "/auctions", label: "Leilões", icon: <Gavel size={18} /> },
    ];

    const privateLinks = [
        { href: "/profile", label: "Perfil", icon: <User size={18} /> },
        { href: "/notifications", label: "Notificações", icon: <Bell size={18} /> },
    ];

    const sellerLinks =
        user?.role === "SELLER"
            ? [
                { href: "/profile/my-auctions", label: "Meus Leilões", icon: <Gavel size={18} /> },
                { href: "/auctions/new", label: "Criar Leilão", icon: <PlusCircle size={18} /> },
            ]
            : [];

    const buyerLinks =
        user?.role === "BUYER"
            ? [{ href: "/profile/my-bids", label: "Meus Lances", icon: <Coins size={18} /> }]
            : [];

    const allLinks = [...publicLinks, ...(token ? privateLinks : []), ...sellerLinks, ...buyerLinks];

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* LOGO */}
                <Link href="/" className="font-bold text-xl tracking-wide flex items-center gap-2 text-blue-400">
                    <Gavel className="w-6 h-6 text-blue-400" />
                    <span>LeilãoApp</span>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden md:flex items-center gap-6">
                    {allLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition ${
                                pathname === link.href ? "text-blue-400" : "text-gray-200"
                            }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* LOGIN / LOGOUT */}
                <div className="hidden md:flex">
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                        >
                            <LogOut size={18} />
                            <span>Sair</span>
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                        >
                            <User size={18} />
                            <span>Entrar</span>
                        </Link>
                    )}
                </div>

                {/* MENU MOBILE */}
                <button
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-800 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700 py-4 px-6 flex flex-col gap-4 animate-fadeIn">
                    {allLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={`flex items-center gap-3 text-base font-medium hover:text-blue-400 transition ${
                                pathname === link.href ? "text-blue-400" : "text-gray-300"
                            }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}

                    <hr className="border-gray-700 my-3" />

                    {token ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setMenuOpen(false);
                            }}
                            className="flex items-center gap-3 text-base text-red-400 hover:text-red-500 transition"
                        >
                            <LogOut size={18} />
                            Sair
                        </button>
                    ) : (
                        <Link
                            href="/auth/login"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-3 text-base text-blue-400 hover:text-blue-500 transition"
                        >
                            <User size={18} />
                            Entrar
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}


