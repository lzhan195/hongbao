import Link from "next/link";
import { getDemoPackets } from "@/lib/hongbao-data";

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
          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">Your ENS name</span>
              <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" placeholder="sakura.eth" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">Total USDC</span>
              <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" defaultValue="10" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">Number of claims</span>
              <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" defaultValue="5" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">World ID gate</span>
              <input className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" defaultValue="verified humans only" />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-stone-700">Message</span>
              <textarea className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 outline-none transition focus:border-red-400" defaultValue="Happy Hackathon!" />
            </label>
            <button className="w-full rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-800">
              Generate deposit address
            </button>
          </form>
        </aside>
      </section>

      <section id="active-packets" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-950">Active packets</h2>
            <p className="text-sm text-stone-500">Shareable links, live funding status, and remaining claims.</p>
          </div>
          <div className="text-sm text-stone-500">Powered by World ID · ENS · Arc</div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {packets.map((packet) => (
            <article key={packet.id} className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-stone-500">Creator</p>
                  <h3 className="text-lg font-semibold text-stone-950">{packet.creatorEns}</h3>
                  <p className="mt-1 text-xs text-stone-500">{packet.creatorAddress}</p>
                </div>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                  {packet.remainingClaims} left
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-600">{packet.message}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-stone-600">
                <span className="rounded-full bg-stone-100 px-3 py-1">{packet.chain}</span>
                <span className="rounded-full bg-stone-100 px-3 py-1">{packet.worldGate}</span>
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
                  <dd className="mt-1 font-mono text-xs font-semibold text-stone-950">{packet.id}</dd>
                </div>
              </dl>
              <Link href={`/claim/${packet.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-sm">
                Open claim page
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
