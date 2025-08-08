"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
  Users,
  Play,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Player } from "@/types";
import { sampleMatches, samplePlayers } from "@/constant/DummyData";
import { useEffect, useState } from "react";
import Pagination from "@/components/ui/Pagination";
import MatchTableSkeleton from "@/components/ui/MatchTableSkeleton";

type SortField =
  | "date"
  | "tournament"
  | "player1Score"
  | "player2Score"
  | "winnerId";
type SortDirection = "asc" | "desc";
// Sample data (you can move this to a shared file later)

export default function PlayerDetail() {
  const params = useParams();
  const router = useRouter();
  const playerId = params.id as string;
  const player = samplePlayers.find((p) => p.id === playerId);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  if (!player) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Player Not Found</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  // const handleSort = (field: SortField) => {
  //   if (sortField === field) {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortDirection("asc");
  //   }
  // };
  const sortedMatches = [...sampleMatches].sort((a: any, b: any) => {
    let aValue: any, bValue: any;

    switch (sortField) {
      case "date":
        aValue = a.date.getTime();
        bValue = b.date.getTime();
        break;
      case "tournament":
        aValue = a.tournament.toLowerCase();
        bValue = b.tournament.toLowerCase();
        break;
      case "player1Score":
        aValue = a.player1Score;
        bValue = b.player1Score;
        break;
      case "player2Score":
        aValue = a.player2Score;
        bValue = b.player2Score;
        break;
      case "winnerId":
        aValue = a.winnerId || "";
        bValue = b.winnerId || "";
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Add this function to simulate loading
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation
  };

  // Add this useEffect to trigger loading when page changes
  useEffect(() => {
    if (currentPage > 1) {
      simulateLoading();
    }
  }, [currentPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(sortedMatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMatches = sortedMatches.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when sorting changes
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    // setCurrentPage(1); // Reset to first page when sorting
    // simulateLoading();
  };
  const getSortIcon = (field: SortField) => {
    if (sortField !== field)
      return (
        <ArrowUpDown className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3" />
      );
    return sortDirection === "asc" ? (
      <ArrowUp
        className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3"
        color="red"
      />
    ) : (
      <ArrowDown
        className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3"
        color="red"
      />
    );
  };
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    fromClr = "#020123",
    toClr = "#1a4998",
  }: {
    icon: any;
    title: string;
    value: string | number;
    subtitle?: string;
    fromClr?: string;
    toClr?: string;
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(to bottom right, ${fromClr}, ${toClr})`,
    };

    return (
      <div
        style={gradientStyle}
        className="p-4 rounded-lg shadow-lg text-white relative"
      >
        <div className="flex items-center ">
          <div className="absolute right-0 bottom-0 bg-[#00000030] p-1 rounded-br-lg rounded-tl-lg">
            <Icon className="h-6 w-6 lg:w-10 lg:h-10 text-blue-200" />
          </div>
          <div className="ml-1">
            <p className="text-sm font-medium text-blue-200">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {subtitle && <p className="text-sm text-blue-200">{subtitle}</p>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        /* Mobile Table Optimizations - All in one file */
        @media (max-width: 480px) {
          .ultra-compact th,
          .ultra-compact td {
            padding: 0.125rem 0.25rem !important;
            font-size: 0.60rem !important;
            line-height: 1.2 !important;
          }

          .ultra-compact .player-name {
            max-width: 60px !important;
          }

          .ultra-compact .hide-tiny {
            display: none !important;
          }

          .ultra-compact .date-cell div {
            font-size: 0.5rem !important;
            line-height: 0.70rem !important;
          }
        }

        @media (min-width: 481px) and (max-width: 640px) {
          .ultra-compact th,
          .ultra-compact td {
            padding: 0.25rem 0.375rem !important;
            font-size: 0.75rem !important;
          }

          .ultra-compact .player-name {
            max-width: 80px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .ultra-compact th,
          .ultra-compact td {
            padding: 0.375rem 0.5rem !important;
            font-size: 0.875rem !important;
          }
        }

        @media (min-width: 1025px) {
          .ultra-compact th,
          .ultra-compact td {
            padding: 0.75rem 1rem !important;
            font-size: 0.875rem !important;
          }
        }

        .responsive-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
        }

        .responsive-table-wrapper::-webkit-scrollbar {
          height: 4px;
        }

        .responsive-table-wrapper::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .responsive-table-wrapper::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{player.name}</h1>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="space-y-4">
          <StatCard
            icon={Play}
            title="Matches Played"
            value={player.matchesPlayed}
          />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Target}
              title="Life time score"
              value={player.lifetimeScore}
              fromClr={"#4b0082"}
              toClr={"#663399"}
            />
            <StatCard
              icon={TrendingUp}
              title="Average score"
              value={player.averageScore}
              fromClr={"#003301"}
              toClr={"#004d02"}
            />
            <StatCard
              icon={Trophy}
              title={player?.centuries > 1 ? "Centuries" : "Century"}
              value={player.centuries}
              fromClr="#98841f"
              toClr="#cbb02a"
            />
            <StatCard
              icon={Users}
              title={player?.fifties > 1 ? "Fifties" : "Fifty"}
              value={player.fifties}
              fromClr="#872852"
              toClr="#b4366e"
            />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-2 sm:mt-4 lg:mt-10">
            <div className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 border-b border-gray-200">
              <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900">
                Players ({sortedMatches.length} total)
              </h3>
            </div>
            {isLoading ? (
              <MatchTableSkeleton />
            ) : (
              <>
                <div className="responsive-table-wrapper">
                  <table className="ultra-compact min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {/* Index column */}
                        <th
                          className="text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                          onClick={() => handleSort("date")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            {getSortIcon("date")}
                          </div>
                        </th>

                        {/* Player Name */}
                        <th
                          className="text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("tournament")}
                        >
                          <div className="flex items-center space-x-1">
                            <span className="truncate">Team</span>
                            {getSortIcon("tournament")}
                          </div>
                        </th>

                        {/* Matches */}
                        <th
                          className="text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("player1Score")}
                        >
                          <div className="flex items-center space-x-1 justify-center">
                            <span>Tiger</span>
                            {getSortIcon("player1Score")}
                          </div>
                        </th>

                        {/* 100s */}
                        <th
                          className="text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("player2Score")}
                        >
                          <div className="flex items-center space-x-1 justify-center">
                            <span>Lion</span>
                            {getSortIcon("player2Score")}
                          </div>
                        </th>

                        {/* 50s */}
                        <th
                          className="text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("winnerId")}
                        >
                          <div className="flex items-center space-x-1 justify-center">
                            <span>Winner</span>
                            {getSortIcon("winnerId")}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentMatches.map((match, index) => (
                        <tr key={match.id} className="hover:bg-gray-50">
                          {/* Player Name */}
                          <td className="whitespace-nowrap text-gray-500 date-cell">
                            <div>
                              <div className="text-xs text-gray-400">
                                {match.date
                                  .toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                  .toUpperCase()}
                              </div>
                              <div className="text-xs text-gray-400">
                                {match.date.getFullYear()}
                              </div>
                            </div>
                          </td>

                          {/* Matches */}
                          <td className="whitespace-nowrap text-gray-900 font-medium">
                            {match.tournament}
                          </td>

                          {/* 100s */}
                          <td className="whitespace-nowrap font-normal text-gray-900 text-center">
                            {match.player1Score}
                          </td>

                          {/* 50s */}
                          <td className="whitespace-nowrap font-normal text-gray-900 text-center">
                            {match.player2Score}
                          </td>

                          {/* Average */}
                          <td className="whitespace-nowrap font-normal text-gray-900 text-center">
                            {match.winnerId ? (
                              <span className="text-green-600 font-medium">
                                {match.winnerId === match.player1.id
                                  ? match.player1.name.split(" ")[0]
                                  : match.player2.name.split(" ")[0]}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {sortedMatches.length > itemsPerPage && (
                  <div className="px-2 sm:px-4 lg:px-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={sortedMatches.length}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
