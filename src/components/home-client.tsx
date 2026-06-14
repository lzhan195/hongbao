"use client";

import { useEffect, useMemo, useState } from "react";
import { CreateHongbaoForm } from "@/components/create-hongbao-form";
import { FundPacketCard } from "@/components/fund-packet-card";
import { PacketGrid } from "@/components/packet-grid";

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
  depositAddress?: string;
};

type Props = {
  initialPackets: Packet[];
};

const highlights = [
  "ENS names every creator and claimer",
  "World ID blocks bots and duplicate claims",
  "Arc + Gateway keeps settlement stablecoin-native",
];

export function HomeClient({ initialPackets }: Props) {
  const [packets, setPackets] = useState(initialPackets);

  useEffect(() => {
    fetch("/api/packets")
      .then((response) => response.json())
      .then((data: Packet[]) => setPackets(data))
      .catch(() => undefined);
  }, []);

  const viewPackets = useMemo(
    () =>
      packets.map((packet) => ({
        packetId: packet.packetId,
        creatorEns: packet.creatorEns,
        creatorAddress: packet.creatorAddress ?? packet.depositAddress,
        remainingClaims: packet.remainingClaims,
        totalValue: packet.totalValue,
        perClaimAmount: packet.perClaimAmount,
        chain: packet.chain,
        worldGate: packet.worldGate,
        message: packet.message,
      })),
    [packets],
  );

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-8 sm:px-10 lg:px-12">
      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div className="space-y-5">
          <span className="inline-flex w-fit rounded-full border border-red-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-red-700 shadow-sm">
            Cross-chain lucky money
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-serif text-5xl leading-tight text-stone-950 sm:text-6xl">
              Send a Hongbao. Let verified humans share the joy.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
              A premium, bot-proof red packet flow with ENS identity, World ID verification, and chain-abstracted USDC claims across testnets.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 bg-white/75 px-4 py-4 text-sm font-medium text-stone-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <CreateHongbaoForm
          onCreated={(packet) => {
            setPackets((current) => [{ ...packet, funded: false, creatorAddress: packet.depositAddress, message: "A little red envelope for the group chat." }, ...current]);
          }}
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl text-stone-950">Active packets</h2>
              <p className="text-sm text-stone-500">Shareable links, live funding status, and remaining claims.</p>
            </div>
            <div className="text-sm text-stone-500">Powered by World ID · ENS · Arc</div>
          </div>
          <PacketGrid packets={viewPackets} />
        </div>
        <div className="space-y-4">
          {packets.slice(0, 1).map((packet) => (
            <FundPacketCard
              key={packet.packetId}
              packetId={packet.packetId}
              depositAddress={packet.depositAddress ?? packet.creatorAddress ?? "0x000000000000000000000000000000000000aRc"}
              funded={Boolean(packet.funded)}
              onFunded={(packetId) => {
                setPackets((current) => current.map((item) => (item.packetId === packetId ? { ...item, funded: true } : item)));
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
