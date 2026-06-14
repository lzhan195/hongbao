"use client";

import { useMemo, useState } from "react";

type CreatePacketResponse = {
  packetId: string;
  creatorEns: string;
  chain: string;
  depositAddress: string;
  totalValue: number;
  claimCount: number;
  remainingClaims: number;
  perClaimAmount: number;
  worldGate: string;
  funded: boolean;
  claims: Array<unknown>;
};

type Props = {
  onCreated: (packet: CreatePacketResponse) => void;
};

export function CreateHongbaoForm({ onCreated }: Props) {
  const [creatorEns, setCreatorEns] = useState("sakura.eth");
  const [totalValue, setTotalValue] = useState("10");
  const [claimCount, setClaimCount] = useState("5");
  const [message, setMessage] = useState("Happy Hackathon!");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => creatorEns.trim().length > 0 && Number(totalValue) > 0 && Number(claimCount) > 0, [creatorEns, totalValue, claimCount]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/create-packet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorEns,
          totalValue: Number(totalValue),
          claimCount: Number(claimCount),
          chain: "Arc testnet",
          message,
        }),
      });

      const packet = (await response.json()) as CreatePacketResponse;
      onCreated(packet);
      setStatus(`Deposit address ready: ${packet.depositAddress}`);
    } catch {
      setStatus("Could not create the packet right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="rounded-[2rem] border border-amber-100 bg-white/80 p-6 shadow-[0_20px_80px_rgba(120,53,15,0.08)] backdrop-blur">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-stone-500">Ready to create</p>
          <p className="text-xl font-semibold text-stone-950">New Hongbao</p>
        </div>
        <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          Sepolia → Arc
        </div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Your ENS name</span>
          <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" value={creatorEns} onChange={(e) => setCreatorEns(e.target.value)} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Total USDC</span>
          <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" value={totalValue} onChange={(e) => setTotalValue(e.target.value)} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Number of claims</span>
          <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" value={claimCount} onChange={(e) => setClaimCount(e.target.value)} />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">World ID gate</span>
          <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" value="verified humans only" readOnly />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-stone-700">Message</span>
          <textarea className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button disabled={!canSubmit || loading} className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Generating deposit address..." : "Generate deposit address"}
        </button>
      </form>
      {status ? <p className="mt-4 text-sm text-stone-600">{status}</p> : null}
    </aside>
  );
}
