import type { Metadata } from "next";
import Link from "next/link";
import { ClaimClient } from "@/components/claim-client";

type Props = {
  params: Promise<{ packetId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { packetId } = await params;
  return {
    title: `Hongbao ${packetId}`,
    description: `Claim packet ${packetId} with verified human proof on Hongbao.`,
  };
}

export default async function ClaimPage({ params }: Props) {
  const { packetId } = await params;

  return <ClaimClient packetId={packetId} />;
}
