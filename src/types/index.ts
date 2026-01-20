export interface Player {
  id: string;
  name: string;
  ranking: number;
  matchesPlayed: number;
  lifetimeScore: number;
  averageScore: number;
  centuries: number;
  fifties: number;
  color: string;
}

export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  player1Score: number;
  player2Score: number;
  date: Date;
  tournament: string;
  venue: string;
  winnerId: string | null;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  prizePool: number;
  participants: Player[];
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

// API Response Types
export interface MatchDataItem {
  team: string;
  player?: {
    id: string;
    name: string;
    color: string;
  };
  playerScore?: Array<{
    score: number;
  }>;
}

export interface MatchDetailResponse {
  data: {
    matchId: string;
    teamAName: string;
    teamBName: string;
    teamATotal: number;
    teamBTotal: number;
    winningTeam: string;
    targetScore: number;
    matchStartTime?: string;
    matchEndTime?: string;
    dataArray?: MatchDataItem[];
    teamA?: Array<{
      id: string;
      name: string;
      color: string;
    }>;
    teamB?: Array<{
      id: string;
      name: string;
      color: string;
    }>;
  };
}

export interface PlayerWithScore {
  id: string;
  name: string;
  color: string;
  score: number;
}

export interface PublicMatch {
  matchId: string;
  teamAName: string;
  teamBName: string;
  teamATotal: number;
  teamBTotal: number;
  winningTeam: string;
  matchStartTime: string;
  matchEndTime: string;
}