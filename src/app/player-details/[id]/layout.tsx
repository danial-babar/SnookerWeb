import { samplePlayers } from "@/constant/DummyData";

// Generate static params for all player IDs
// Layout files can export generateStaticParams even when pages are client components
export function generateStaticParams() {
  return samplePlayers.map((player) => ({
    id: player.id,
  }));
}

export default function PlayerDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}




