import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ packetId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { packetId } = await params;

  return {
    title: `Hongbao ${packetId}`,
    description: `Claim packet ${packetId} with verified human proof on Hongbao.`,
    openGraph: {
      title: `Hongbao ${packetId}`,
      description: "Happy hackathon, humans only.",
    },
    twitter: {
      card: "summary_large_image",
      title: `Hongbao ${packetId}`,
      description: "Happy hackathon, humans only.",
    },
  };
}

export default async function ClaimPage({ params }: Props) {
  const { packetId } = await params;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8 sm:px-10 lg:px-12">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-semibold text-stone-950">
          🧧 Hongbao
        </Link>
        <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-medium text-amber-800 shadow-sm">
          Claim page preview
        </span>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="rounded-[2rem] border border-red-100 bg-white p-8 shadow-[0_24px_90px_rgba(220,38,38,0.08)]">
          <div className="mx-auto flex aspect-[4/5] max-w-sm items-center justify-center rounded-[2rem] bg-gradient-to-b from-red-700 via-red-600 to-rose-500 p-6 shadow-inner">
            <div className="relative h-full w-full rounded-[1.5rem] border border-white/20 bg-gradient-to-b from-red-600 to-red-700">
              <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_60%)]" />
              <div className="absolute inset-x-0 top-[42%] mx-auto h-28 w-28 rotate-45 rounded-2xl border-b border-l border-amber-200/80 bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-500 shadow-lg" />
              <div className="absolute inset-x-0 top-[58%] mx-auto h-24 w-44 rounded-b-[2rem] border border-amber-100/70 bg-red-800/70" />
              <div className="absolute inset-x-8 top-8 h-16 rounded-full border border-white/20 bg-white/10 blur-xl" />
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Packet</p>
            <p className="mt-2 font-mono text-sm font-semibold text-stone-800">{packetId}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-red-700">Verified human claim</p>
            <h1 className="font-serif text-5xl leading-tight text-stone-950 sm:text-6xl">
              sakura.eth sent a Hongbao!
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              Happy hackathon, humans only. Claiming proves uniqueness with World ID, resolves identities with ENS, and settles on Arc.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-stone-50 p-4">
                <dt className="text-sm text-stone-500">Claimer ENS</dt>
                <dd className="mt-1 text-lg font-semibold text-stone-950">lina.eth</dd>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <dt className="text-sm text-stone-500">Packet status</dt>
                <dd className="mt-1 text-lg font-semibold text-stone-950">Awaiting proof</dd>
              </div>
            </div>
            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-4">
                <dt className="text-sm text-stone-500">Remaining claims</dt>
                <dd className="mt-1 text-2xl font-semibold text-stone-950">3</dd>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <dt className="text-sm text-stone-500">Per claim</dt>
                <dd className="mt-1 text-2xl font-semibold text-stone-950">5 USDC</dd>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <dt className="text-sm text-stone-500">Network</dt>
                <dd className="mt-1 text-2xl font-semibold text-stone-950">Arc</dd>
              </div>
            </dl>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="rounded-full bg-gradient-to-r from-red-600 to-amber-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
                Claim with World ID
              </button>
              <button className="rounded-full border border-stone-300 bg-white px-6 py-4 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50">
                Verify ENS ownership
              </button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-dashed border-amber-200 bg-amber-50/70 p-6 text-sm leading-7 text-stone-700">
            A receipt will be written to <span className="font-mono">hongbao.claim.{packetId}</span> after the claim settles, and the claimer’s ENS text record can be updated with proof-of-claim metadata.
          </div>
        </div>
      </section>
    </main>
  );
}
