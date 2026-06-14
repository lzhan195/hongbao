import { getDemoPackets } from "@/lib/hongbao-data";
import { HomeClient } from "@/components/home-client";

export default function Home() {
  const packets = getDemoPackets();
  return <HomeClient initialPackets={packets} />;
}
