"use client";

import { useState } from "react";

type Props = {
  packetId: string;
  depositAddress: string;
  funded: boolean;
  onFunded: (packetId: string) => void;
};

export function FundPacketCard({ packetId, depositAddress, funded, onFunded }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleFund() {
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`/api/check-deposit?packetId=${packetId}`);
      const result = (await response.json()) as { funded: boolean };
      if (result.funded) {
        onFunded(packetId);
        setStatus("Packet marked as funded on Arc.");
      } else {
        setStatus("Deposit not detected yet. Try again after sending funds.");
      }
    } catch {
      setStatus("Could not verify the deposit right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-stone-500">Settlement status</p>
      <p className="mt-1 text-lg font-semibold text-stone-950">{funded ? "Funded" : "Waiting for Arc deposit"}</p>
      <p className="mt-2 break-all font-mono text-xs text-stone-500">{depositAddress}</p>
      <button
        onClick={handleFund}
        disabled={loading || funded}
        className="mt-4 w-full rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Checking deposit..." : funded ? "Already funded" : "Check funding on Arc"}
      </button>
      {status ? <p className="mt-3 text-sm text-stone-600">{status}</p> : null}
    </div>
  );
}
