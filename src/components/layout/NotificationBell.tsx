"use client";
import { useNotifications } from "@/lib/hooks/useNotifications";

export function NotificationBell({ userId }: { userId: string }) {
    const { notifications } = useNotifications(userId);
    return (
        <button className="relative">
            🔔
            {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
          {notifications.length}
        </span>
            )}
        </button>
    );
}
