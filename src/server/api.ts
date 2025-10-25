console.log("🌍 NEXT_PUBLIC_API_URL =", process.env.NEXT_PUBLIC_API_URL);

const isDev = process.env.NODE_ENV === "development";

const API_URL =
    (isDev
        ? "http://localhost:3001"
        : process.env.NEXT_PUBLIC_API_URL
            ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
            : undefined) ||
    "https://leilao-server.onrender.com";

if (isDev) console.log("🌍 Using API base URL:", API_URL);

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers instanceof Headers
            ? Object.fromEntries(options.headers.entries())
            : (options.headers as Record<string, string> | undefined) || {}),
    };

    if (token && !headers.Authorization) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (isDev) console.log("📡 Fetching:", url);

    const res = await fetch(url, { ...options, headers });
    const contentType = res.headers.get("content-type");
    const data = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

    if (!res.ok) {
        console.error("❌ API Error:", data);
        if (res.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        throw new Error(
            typeof data === "string" ? data : data.message || "API Error"
        );
    }

    return data;
}

interface AuctionDTO {
    title: string;
    description?: string;
    startingPrice: number;
    currentPrice?: number;
    endTime: string;
    status?: string;
    ownerId: string;
}

export const api = {
    auth: {
        register: (data: { name: string; email: string; password: string; role?: string }) =>
            apiFetch("/auth/register", { method: "POST", body: JSON.stringify(data) }),

        login: (email: string, password: string) =>
            apiFetch("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

        me: (token: string) =>
            apiFetch("/auth/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }),
    },

    users: {
        getAll: (token: string) =>
            apiFetch("/users", { headers: { Authorization: `Bearer ${token}` } }),

        getById: (id: string, token: string) =>
            apiFetch(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } }),

        create: (data: any, token: string) =>
            apiFetch("/users", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            }),
    },

    auctions: {
        list: () => apiFetch("/auctions"),

        get: (id: string) => {
            if (!id) throw new Error("Auction ID is required");
            return apiFetch(`/auctions/${id}`);
        },

        create: (data: { title: string; description: string; startingPrice: number; endTime: string }, token: string) =>
            apiFetch("/auctions", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            }),

        update: (data: AuctionDTO & { id: string }, token: string) =>
            apiFetch(`/auctions/${data.id}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            }),

        delete: (id: string, token: string) =>
            apiFetch(`/auctions/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }),
    },

    bids: {
        create: (data: any, token: string) =>
            apiFetch("/bids", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            }),

        byAuction: (auctionId: string) => apiFetch(`/bids/auction/${auctionId}`),

        byUser: (userId: string, token: string) =>
            apiFetch(`/bids/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    },


    notifications: {
        create: (data: { message: string; userId: string }, token: string) =>
            apiFetch("/notifications", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: JSON.stringify(data),
            }),

        listByUser: (userId: string, token: string) =>
            apiFetch(`/notifications/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),

        markAsRead: (id: string, token: string) =>
            apiFetch(`/notifications/${id}/read`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            }),
    },
};

