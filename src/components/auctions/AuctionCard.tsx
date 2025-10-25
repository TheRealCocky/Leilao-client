// components/auctions/AuctionCard.tsx
"use client";
import Link from "next/link";

export default function AuctionCard({ auction }: { auction: any }) {
    const timeRemaining = new Date(auction.endTime).getTime() - Date.now();
    const minutes = Math.max(0, Math.floor((timeRemaining / 1000 / 60) % 60));
    const hours = Math.max(0, Math.floor(timeRemaining / 1000 / 60 / 60));
    return (
        <Link
            href={`/auctions/${auction.id ?? auction._id}`}
            className="block p-4 border rounded-lg hover:shadow"
        >
            <h3 className="font-semibold">{auction.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{auction.description}</p>
            <div className="mt-2 flex justify-between items-center">
                <div>
                    <span className="text-xs text-gray-500">Current</span>
                    <div className="font-bold">${auction.currentPrice}</div>
                </div>
                <div className="text-sm text-gray-600">
                    {hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}
                </div>
            </div>
        </Link>
    );
}
