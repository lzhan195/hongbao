"use client";

import { useState } from "react";

type Props = {
  packetId: string;
  depositAddress: string;
  funded: boolean;
  onFunded: () => void;
};

export function FundPacketCard({ packetId, depositAddress, funded, onFunded }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleFund() {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/fund-packet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packetId }),
      });
      const data = (await response.json()) as { success: boolean; error?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Unable to fund packet");
      }

      onFunded();
      setStatus("Packet funded on Arc and ready to claim.");
    } catch {
      setStatus("Could not mark the packet funded.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-stone-500">Funding</p>
          <h3 className="text-lg font-semibold text-stone-950">Arc deposit address</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${funded ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
          {funded ? "Funded" : "Waiting for deposit"}
        </span>
      </div>
      <p className="mt-4 break-all rounded-2xl bg-stone-50 px-4 py-3 font-mono text-sm text-stone-700">{depositAddress}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleFund}
          disabled={loading || funded}
          className="rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Marking funded..." : funded ? "Already funded" : "Mark as funded"}
        </button>
        <span className="self-center text-sm text-stone-500">Packet {packetId}</span>
      </div>
      {status ? <p className="mt-4 text-sm text-stone-600">{status}</p> : null}
    </div>
  );
}
