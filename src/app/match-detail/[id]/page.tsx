"use client";
import { getSingleMatchPublic } from "@/api/APIs";
import { Loader } from "@/components/Loader";
import { getContrastTextColor } from "@/utils/GetContrastColor";
import { getDifferenceInHours } from "@/utils/GetHoursDiff";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MatchDetailResponse, MatchDataItem, PlayerWithScore } from "@/types";

export default function MatchDetail() {
  const params = useParams();
  const matchId = params.id as string;
  const hasFetched = useRef(false);
  const [matchData, setMatchData] = useState<MatchDetailResponse["data"] | null>(null);
  const [teamA, setTeamA] = useState<MatchDataItem[]>([]);
  const [teamB, setTeamB] = useState<MatchDataItem[]>([]);
  const [teamAPlayers, setTeamAPlayers] = useState<PlayerWithScore[]>([]);
  const [teamBPlayers, setTeamBPlayers] = useState<PlayerWithScore[]>([]);
  const [manMatch, setManMatch] = useState<PlayerWithScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (matchId && !hasFetched.current) {
      hasFetched.current = true;
      fetchMatchDetail(matchId);
    }
  }, [matchId]);
  useEffect(() => {
    const manOfTheMatch = (): PlayerWithScore | null => {
      if (!matchData?.winningTeam) return null;

      // Normalize team names for comparison (handle trailing spaces)
      const winningTeamNormalized = matchData.winningTeam?.trim() || "";
      const teamANameNormalized = matchData.teamAName?.trim() || "";
      
      const winningTeamPlayers =
        winningTeamNormalized === teamANameNormalized
          ? teamAPlayers
          : teamBPlayers;

      if (
        !winningTeamPlayers ||
        !Array.isArray(winningTeamPlayers) ||
        !winningTeamPlayers.length
      )
        return null;

      // Find player with max score
      return winningTeamPlayers.reduce((max, player) =>
        player.score > max.score ? player : max
      );
    };
    setManMatch(manOfTheMatch());
  }, [matchData, teamAPlayers, teamBPlayers]);
  const fetchMatchDetail = (id: string) => {
    getSingleMatchPublic(id)
      .then((response: unknown) => {
        console.log("response while fetching single match details", response);
        const matchResponse = response as MatchDetailResponse;
        const data = matchResponse?.data;
        if (!data) return;
        
        setMatchData(data);
        // Normalize team names (remove trailing spaces) for comparison
        const teamANameNormalized = data.teamAName?.trim() || "";
        const teamBNameNormalized = data.teamBName?.trim() || "";
        
        setTeamA(
          (data.dataArray || []).filter(
            (item: MatchDataItem) => item?.team?.trim() === teamANameNormalized
          )
        );
        setTeamB(
          (data.dataArray || []).filter(
            (item: MatchDataItem) => item?.team?.trim() === teamBNameNormalized
          )
        );
        setTeamAPlayers(() => {
          return (
            (data.teamA || []).map((player) => {
              let totalScore = 0;
              // Filter dataArray by team first, then match player IDs
              (data.dataArray || [])
                .filter((item: MatchDataItem) => item?.team?.trim() === teamANameNormalized)
                .forEach((item: MatchDataItem) => {
                  if (Array.isArray(item.playerScore) && item.player) {
                    // Convert both IDs to strings for comparison
                    const itemPlayerId = String(item.player.id);
                    const playerId = String(player.id);
                    if (itemPlayerId === playerId) {
                      item.playerScore.forEach((ps) => {
                        totalScore += ps.score || 0;
                      });
                    }
                  }
                });

              return {
                ...player,
                score: totalScore,
              };
            })
          );
        });
        setTeamBPlayers(() => {
          return (
            (data.teamB || []).map((player) => {
              let totalScore = 0;
              // Filter dataArray by team first, then match player IDs
              (data.dataArray || [])
                .filter((item: MatchDataItem) => item?.team?.trim() === teamBNameNormalized)
                .forEach((item: MatchDataItem) => {
                  if (Array.isArray(item.playerScore) && item.player) {
                    // Convert both IDs to strings for comparison
                    const itemPlayerId = String(item.player.id);
                    const playerId = String(player.id);
                    if (itemPlayerId === playerId) {
                      item.playerScore.forEach((ps) => {
                        totalScore += ps.score || 0;
                      });
                    }
                  }
                });

              return {
                ...player,
                score: totalScore,
              };
            })
          );
        });
      })
      .catch((error: unknown) => {
        console.error("Error fetching match details", error);
      })
      .finally(() => setLoading(false));
  };

  // Reusable score box
  const ScoreBox = ({ item }: { item: MatchDataItem }) => {
    const score =
      item.playerScore?.reduce(
        (sum: number, scoreItem) => sum + (scoreItem?.score || 0),
        0
      ) || 0;
    const playerColor = item?.player?.color || "#000000";
    return (
      <div
        className="flex items-center justify-center rounded-md m-1 w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10"
        style={{ backgroundColor: playerColor }}
      >
        <p
          className="text-xs sm:text-sm md:text-base font-medium"
          style={{ color: getContrastTextColor(playerColor) }}
        >
          {score}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 bg-white lg:px-8 py-3 sm:py-5 lg:py-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Team A */}
          <div>
            <div className="w-full flex flex-wrap items-center">
              <p className="text-black font-bold text-lg sm:text-xl md:text-2xl">
                {matchData?.teamAName}
              </p>
              <p className="ml-3 sm:ml-5 text-gray-700 text-base sm:text-lg md:text-xl">
                {matchData?.teamATotal}
              </p>
            </div>
            <div className="flex flex-wrap mt-2 sm:mt-3">
              {teamA?.map((item, idx) => (
                <ScoreBox key={idx} item={item} />
              ))}
            </div>
          </div>

          {/* Team B */}
          <div className="mt-6">
            <div className="w-full flex flex-wrap items-center">
              <p className="text-black font-bold text-lg sm:text-xl md:text-2xl">
                {matchData?.teamBName}
              </p>
              <p className="ml-3 sm:ml-5 text-gray-700 text-base sm:text-lg md:text-xl">
                {matchData?.teamBTotal}
              </p>
            </div>
            <div className="flex flex-wrap mt-2 sm:mt-3">
              {teamB?.map((item, idx) => (
                <ScoreBox key={idx} item={item} />
              ))}
            </div>
          </div>
          <div className="flex mt-5 justify-between px-2 items-start">
            <div className="w-[40%]">
              <p className="text-[#1e910c] text-[20px] font-bold">
                {matchData?.teamAName}
              </p>
              {teamAPlayers?.map((player) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={player?.id}
                  >
                    <div className="flex items-center text-black font-semibold text-[14px]">
                      <p>{player?.name}</p>
                      <div
                        className="w-3 h-3 ml-1 rounded-sm"
                        style={{ backgroundColor: player?.color }}
                      />
                    </div>
                   <p className="text-black font-medium text-[14px]">{player?.score}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-[40%]">
              <p className="text-[#1e910c] text-[20px] font-bold">
                {matchData?.teamBName}
              </p>
              {teamBPlayers?.map((player) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={player?.id}
                  >
                    <div className="flex items-center text-black font-semibold text-[14px]">
                      <p>{player?.name}</p>
                      <div
                        className="w-3 h-3 ml-1 rounded-sm"
                        style={{ backgroundColor: player?.color }}
                      />
                    </div>
                    <p className="text-black font-medium text-[14px]">{player?.score}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center mt-6">
            {matchData?.winningTeam && (
              <p className="text-[#1e910c] text-[24px] font-bold">{`${matchData?.winningTeam} Wins!`}</p>
            )}
            <p className="text-[#000] text-[16px] font-medium">
              {`Target Score: `}
              <span className="text-[#6c6c6c]">{matchData?.targetScore}</span>
            </p>
            <p className="text-[#000] text-[16px] font-medium">
              {`Man of the match: `}
              {manMatch ? (
                <span className="text-[#6c6c6c]">
                  {manMatch.name} ({manMatch.score} Score)
                </span>
              ) : (
                <span className="text-[#6c6c6c]">N/A</span>
              )}
            </p>
            <p className="text-[#000] text-[16px] font-medium">
              {`Match duration: `}
              <span className="text-[#6c6c6c]">
                {getDifferenceInHours(
                  matchData?.matchStartTime,
                  matchData?.matchEndTime
                )}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
