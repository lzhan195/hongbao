"use client";

import Link from "next/link";

type Packet = {
  packetId: string;
  creatorEns: string;
  creatorAddress?: string;
  remainingClaims: number;
  totalValue: number;
  perClaimAmount: number;
  chain: string;
  worldGate: string;
  message?: string;
  funded?: boolean;
  claims?: Array<{ claimerEns: string; claimedAt: string }>;
};

type Props = {
  packets: Packet[];
};

export function PacketGrid({ packets }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {packets.map((packet) => (
        <article key={packet.packetId} className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-stone-500">Creator</p>
              <h3 className="text-lg font-semibold text-stone-950">{packet.creatorEns}</h3>
              {packet.creatorAddress ? <p className="mt-1 text-xs text-stone-500">{packet.creatorAddress}</p> : null}
            </div>
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
              {packet.remainingClaims} left
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-stone-600">{packet.message ?? "A little red envelope for the group chat."}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-stone-600">
            <span className="rounded-full bg-stone-100 px-3 py-1">{packet.chain}</span>
            <span className="rounded-full bg-stone-100 px-3 py-1">{packet.worldGate}</span>
            {packet.funded ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Funded</span> : <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">Awaiting funding</span>}
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-2xl bg-stone-50 p-3">
              <dt className="text-stone-500">Total</dt>
              <dd className="mt-1 font-semibold text-stone-950">{packet.totalValue} USDC</dd>
            </div>
            <div className="rounded-2xl bg-stone-50 p-3">
              <dt className="text-stone-500">Per claim</dt>
              <dd className="mt-1 font-semibold text-stone-950">{packet.perClaimAmount} USDC</dd>
            </div>
            <div className="rounded-2xl bg-stone-50 p-3">
              <dt className="text-stone-500">Packet</dt>
              <dd className="mt-1 font-mono text-xs font-semibold text-stone-950">{packet.packetId}</dd>
            </div>
          </dl>
          <Link href={`/claim/${packet.packetId}`} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm">
            Open claim page
          </Link>
        </article>
      ))}
    </div>
  );
}
