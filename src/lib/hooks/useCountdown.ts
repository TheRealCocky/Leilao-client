import { useEffect, useState } from "react";

export function useCountdown(targetDate: string) {
    const [timeLeft, setTimeLeft] = useState<number>(
        new Date(targetDate).getTime() - Date.now()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(new Date(targetDate).getTime() - Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const hours = Math.floor(timeLeft / 1000 / 60 / 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return { hours, minutes, seconds, expired: timeLeft <= 0 };
}
