import Link from "next/link";
import { getDemoPackets } from "@/lib/hongbao-data";
import { CreateHongbaoForm } from "@/components/create-hongbao-form";
import { PacketGrid } from "@/components/packet-grid";

const highlights = [
  "ENS names every creator and claimer",
  "World ID blocks bots and duplicate claims",
  "Arc + Gateway keeps settlement stablecoin-native",
];

export default function Home() {
  const packets = getDemoPackets();
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
              A premium, bot-proof red packet flow with ENS identity, World ID
              verification, and chain-abstracted USDC claims across testnets.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-gradient-to-r from-red-600 to-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:scale-[1.01]">
              Create Hongbao
            </button>
            <Link
              href="#active-packets"
              className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
            >
              View active packets
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-200 bg-white/75 px-4 py-4 text-sm font-medium text-stone-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <CreateHongbaoForm onCreated={() => {}} />
      </section>

      <section id="active-packets" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-950">Active packets</h2>
            <p className="text-sm text-stone-500">Shareable links, live funding status, and remaining claims.</p>
          </div>
          <div className="text-sm text-stone-500">Powered by World ID · ENS · Arc</div>
        </div>

        <PacketGrid
          packets={packets.map((packet) => ({
            packetId: packet.packetId,
            creatorEns: packet.creatorEns,
            creatorAddress: packet.depositAddress,
            remainingClaims: packet.remainingClaims,
            totalValue: packet.totalValue,
            perClaimAmount: packet.perClaimAmount,
            chain: packet.chain,
            worldGate: packet.worldGate,
            message: packet.claims.length > 0 ? `Claimed ${packet.claims.length} times` : "A little red envelope for the group chat.",
          }))}
        />
      </section>
    </main>
  );
}
