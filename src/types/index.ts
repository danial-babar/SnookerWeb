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
