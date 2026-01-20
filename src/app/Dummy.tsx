"use client";

import { useState, useEffect } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/ui/Pagination";
import MatchTableSkeleton from "@/components/ui/MatchTableSkeleton";

type SortField =
  | "date"
  | "teamAName"
  | "teamBName"
  | "teamATotal"
  | "teamBTotal"
  | "winningTeam";
type SortDirection = "desc" | "asc";

export default function PlayerStats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  interface MatchItem {
    matchId: string;
    teamAName?: string;
    teamBName?: string;
    teamATotal?: number;
    teamBTotal?: number;
    winningTeam?: string;
    matchStartTime?: string | number | Date;
    matchEndTime?: string | number | Date;
  }

  const [allMatches] = useState<MatchItem[]>([]);
  const [totalMatches] = useState(0);
  const itemsPerPage = 10;

  // Calculate total pages based on server-side totalMatches
  const totalPages = Math.ceil(totalMatches / itemsPerPage);

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
    setCurrentPage(1);
  };

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        /* Mobile Table Optimizations - All in one file */
        @media (max-width: 480px) {
          .ultra-compact th,
          .ultra-compact td {
            padding: 0.125rem 0.25rem !important;
            font-size: 0.6rem !important;
            line-height: 1.2 !important;
          }
          .ultra-compact .team-name {
            max-width: 60px !important;
          }
          .ultra-compact .hide-tiny {
            display: none !important;
          }
          .ultra-compact .date-cell div {
            font-size: 0.5rem !important;
            line-height: 0.7rem !important;
          }
        }

        @media (min-width: 481px) and (max-width: 640px) {
          .ultra-compact th,
          .ultra-compact td {
            padding: 0.25rem 0.375rem !important;
            font-size: 0.75rem !important;
          }
          .ultra-compact .team-name {
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

        .data-viz-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .stat-card {
          background: white;
          border-radius: 0.375rem;
          padding: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #10b981;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-4 lg:px-8 py-2 sm:py-4 lg:py-8">
        {/* Header */}
        <div className="mb-2 sm:mb-4 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                All matches
              </h1>
              <p className="mt-0.5 sm:mt-1 lg:mt-2 text-xs sm:text-sm lg:text-base text-gray-600">
                Comprehensive statistics from all professional snooker matches
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-2 sm:mb-4 lg:mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
              <Search className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-6 sm:pl-8 lg:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 text-xs sm:text-sm lg:text-base"
              placeholder="Search match..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-2 sm:mt-4 lg:mt-10">
            <div className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 lg:py-4 border-b border-gray-200">
              <h3 className="text-sm sm:text-base lg:text-lg font-medium text-gray-900">
                Matches ({totalMatches} total)
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
                        <th
                          className="text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
                          onClick={() => handleSort("date")}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Date</span>
                            {getSortIcon("date")}
                          </div>
                        </th>

                        <th
                          className="text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("teamAName")}
                        >
                          <div className="flex items-center space-x-1">
                            <span className="truncate">Team</span>
                            {getSortIcon("teamAName")}
                          </div>
                        </th>

                        <th
                          className="text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("teamATotal")}
                        >
                          <div className="flex items-center space-x-1 justify-center">
                            <span>Team A</span>
                            {getSortIcon("teamATotal")}
                          </div>
                        </th>

                        <th
                          className="text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("teamBTotal")}
                        >
                          <div className="flex items-center space-x-1 justify-center">
                            <span>Team B</span>
                            {getSortIcon("teamBTotal")}
                          </div>
                        </th>

                        <th
                          className="text-left text-xs font-medium text-gray-500 tracking-wider cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort("winningTeam")}
                        >
                          <div className="flex items-center space-x-1 justify-center">
                            <span>winningTeam</span>
                            {getSortIcon("winningTeam")}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allMatches.map((match) => (
                        <tr key={match.matchId} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap text-gray-500 date-cell">
                            {match.matchStartTime
                              ? new Date(match.matchStartTime).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "N/A"}
                          </td>
                          <td className="whitespace-nowrap font-medium text-green-700 underline">
                            <Link
                              href={`/match-details/${match.matchId}`}
                              className="team-name text-green-700 font-bold hover:underline truncate block"
                              title={`${match?.teamAName} vs ${match?.teamBName}`}
                            >
                              {`${match?.teamAName} vs ${match?.teamBName}`}
                            </Link>
                          </td>

                          <td className="whitespace-nowrap text-gray-900 text-center">
                            {match?.teamATotal}
                          </td>

                          <td className="whitespace-nowrap font-normal text-gray-900 text-center">
                            {match?.teamBTotal}
                          </td>

                          <td className="whitespace-nowrap font-normal text-gray-900 text-center">
                            {match?.winningTeam}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalMatches > itemsPerPage && (
                  <div className="px-2 sm:px-4 lg:px-6">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={totalMatches}
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

