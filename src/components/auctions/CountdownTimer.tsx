import { useCountdown } from "@/lib/hooks/useCountdown";

export function CountdownTimer({ endTime }: { endTime: string }) {
    const { hours, minutes, seconds, expired } = useCountdown(endTime);
    if (expired) return <span className="text-red-500">Encerrado</span>;
    return <span>{hours}h {minutes}m {seconds}s</span>;
}
