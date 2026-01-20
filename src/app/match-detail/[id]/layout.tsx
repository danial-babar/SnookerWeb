// Generate static params for all match IDs
// Layout files can export generateStaticParams even when pages are client components
// Since matches come from an API, we generate a range of IDs to cover all possible matches
export function generateStaticParams() {
  // Generate match IDs from 1 to 300 to cover most matches
  // Adjust this number based on your actual maximum match ID
  // You can increase it if you have more matches, or decrease it to speed up builds
  const matchIds = [];
  const maxMatchId = 300; // Reduced from 1000 to speed up builds
  for (let i = 1; i <= maxMatchId; i++) {
    matchIds.push({ id: i.toString() });
  }
  return matchIds;
}

export default function MatchDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

