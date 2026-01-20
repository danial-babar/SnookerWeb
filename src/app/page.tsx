import Link from "next/link";
import { Trophy, Users, Calendar, BarChart3 } from "lucide-react";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const features = [
    {
      name: "Player Statistics",
      description: "Comprehensive stats for professional snooker players including rankings, win rates, and break records.",
      icon: Users,
      href: "/player-stats",
    },
    {
      name: "Tournament Results",
      description: "Latest tournament results, schedules, and historical data from major snooker competitions.",
      icon: Trophy,
      href: "/tournaments",
    },
    {
      name: "Match Analysis",
      description: "Detailed match breakdowns, head-to-head records, and performance analytics.",
      icon: BarChart3,
      href: "/matches",
    },
    {
      name: "World Rankings",
      description: "Current world rankings and ranking history for all professional players.",
      icon: Calendar,
      href: "/rankings",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-10 sm:py-18 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Snooker Game
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your comprehensive source for snooker player statistics, tournament results, 
              and match analysis. Track the performance of your favorite players and stay 
              updated with the latest rankings.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/player-stats"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                View Player Stats
              </Link>
              <Link
                href="/new-game"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600"
              >
                Start New Game <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

   
      {/* <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-green-600">Everything Snooker</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Snooker Data
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access detailed statistics, rankings, and analysis for professional snooker. 
              From player performance to tournament results, we have it all.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <Link href={feature.href} className="hover:text-green-600">
                      {feature.name}
                    </Link>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div> */}
    </div>
  );
}
