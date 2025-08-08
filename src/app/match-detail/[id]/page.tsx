"use client";
import { getSingleMatchPublic } from "@/api/APIs";
import { Loader } from "@/components/Loader";
import { getContrastTextColor } from "@/utils/GetContrastColor";
import { getDifferenceInHours } from "@/utils/GetHoursDiff";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MatchDetail() {
  const params = useParams();
  const matchId = params.id as string;
  const hasFetched = useRef(false);
  const [matchData, setMatchData] = useState<any>({});
  const [teamA, setTeamA] = useState<any>([]);
  const [teamB, setTeamB] = useState<any>([]);
  const [teamAPlayers, setTeamAPlayers] = useState<any>([]);
  const [teamBPlayers, setTeamBPlayers] = useState<any>([]);
  const [manMatch, setManMatch] = useState<any>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (matchId && !hasFetched.current) {
      hasFetched.current = true;
      fetchMatchDetail(matchId);
    }
  }, [matchId]);
  useEffect(() => {
    const manOfTheMatch = () => {
      if (!matchData?.winningTeam) return null;

      const winningTeamPlayers =
        matchData.winningTeam === matchData.teamAName
          ? teamAPlayers
          : teamBPlayers;

      if (!winningTeamPlayers.length) return null;

      // Find player with max score
      return winningTeamPlayers.reduce((max: any, player: any) =>
        player.score > max.score ? player : max
      );
    };
    setManMatch(manOfTheMatch);
  }, [teamBPlayers]);
  const fetchMatchDetail = (id: string) => {
    getSingleMatchPublic(id)
      .then((response: any) => {
        console.log("response while fetching single match details", response);
        setMatchData(response?.data);
        setTeamA(
          response?.data?.dataArray?.filter(
            (item: any) => item?.team === response?.data?.teamAName
          )
        );
        setTeamB(
          response?.data?.dataArray?.filter(
            (item: any) => item?.team === response?.data?.teamBName
          )
        );
        setTeamAPlayers(() => {
          return response?.data?.teamA?.map((player: any) => {
            let totalScore = 0;
            response?.data?.dataArray?.forEach((item: any) => {
              if (Array.isArray(item.playerScore)) {
                item.playerScore.forEach((ps: any) => {
                  if (item?.player && item.player.id == player.id) {
                    totalScore += ps.score;
                  }
                });
              }
            });

            return {
              ...player,
              score: totalScore,
            };
          });
        });
        setTeamBPlayers(() => {
          return response?.data?.teamB?.map((player: any) => {
            let totalScore = 0;
            response?.data?.dataArray?.forEach((item: any) => {
              if (Array.isArray(item.playerScore)) {
                item.playerScore.forEach((ps: any) => {
                  if (item?.player && item.player.id == player.id) {
                    totalScore += ps.score;
                  }
                });
              }
            });

            return {
              ...player,
              score: totalScore,
            };
          });
        });
      })
      .catch((error: any) => {
        console.error("Error fetching match details", error);
      })
      .finally(() => setLoading(false));
  };
  console.log("team A players", teamAPlayers);
  console.log("team B players", teamBPlayers);

  // Reusable score box
  const ScoreBox = ({ item }: { item: any }) => {
    const score =
      item.playerScore?.reduce(
        (sum: number, scoreItem: any) => sum + (scoreItem?.score || 0),
        0
      ) || 0;
    return (
      <div
        className="flex items-center justify-center rounded-md m-1 w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10"
        style={{ backgroundColor: item?.player?.color }}
      >
        <p
          className="text-xs sm:text-sm md:text-base font-medium"
          style={{ color: getContrastTextColor(item?.player?.color) }}
        >
          {score}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-5 lg:py-8">
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
              {teamA?.map((item: any, idx: number) => (
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
              {teamB?.map((item: any, idx: number) => (
                <ScoreBox key={idx} item={item} />
              ))}
            </div>
          </div>
          <div className="flex mt-5 justify-between px-2 items-start">
            <div className="w-[40%]">
              <p className="text-[#1e910c] text-[20px] font-bold">
                {matchData?.teamAName}
              </p>
              {teamAPlayers?.map((player: any) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={player?.id}
                  >
                    <div className="flex items-center">
                      <p>{player?.name}</p>
                      <div
                        className="w-3 h-3 ml-1 rounded-sm"
                        style={{ backgroundColor: player?.color }}
                      />
                    </div>
                    <p>{player?.score}</p>
                  </div>
                );
              })}
            </div>
            <div className="w-[40%]">
              <p className="text-[#1e910c] text-[20px] font-bold">
                {matchData?.teamBName}
              </p>
              {teamBPlayers?.map((player: any) => {
                return (
                  <div
                    className="flex items-center justify-between"
                    key={player?.id}
                  >
                    <div className="flex items-center">
                      <p>{player?.name}</p>
                      <div
                        className="w-3 h-3 ml-1 rounded-sm"
                        style={{ backgroundColor: player?.color }}
                      />
                    </div>
                    <p>{player?.score}</p>
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
