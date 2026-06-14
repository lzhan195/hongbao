import { getPacket } from "@/lib/hongbao-store";

export const demoPacketIds = ["hb_7f3a", "hb_91cd"] as const;

export function getDemoPackets() {
  return demoPacketIds
    .map((packetId) => getPacket(packetId))
    .filter((packet): packet is NonNullable<ReturnType<typeof getPacket>> => Boolean(packet));
}
