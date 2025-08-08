# Snooker Stats - Professional Snooker Statistics

A modern Next.js application for tracking and analyzing professional snooker player statistics, rankings, and match results.

## Features

- **Player Statistics**: Comprehensive stats for professional snooker players including rankings, win rates, and break records
- **Interactive Search**: Search players by name or country
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   ├── player-stats/      # Player statistics page
│   │   └── page.tsx
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   │   ├── Header.tsx    # Navigation header
│   │   └── Footer.tsx    # Site footer
│   └── ui/               # UI components (future)
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
├── types/                # TypeScript type definitions
│   └── index.ts          # Application types
└── hooks/                # Custom React hooks (future)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technology Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **UI Components**: Custom components with Tailwind

## Pages and Routes

- `/` - Home page with overview and navigation
- `/player-stats` - Player statistics with search and detailed views
- `/rankings` - World rankings (placeholder)
- `/tournaments` - Tournament results (placeholder)
- `/matches` - Match analysis (placeholder)

## Key Components

### Header Component
- Responsive navigation with mobile menu
- Active route highlighting
- Professional branding

### Footer Component
- Site links and information
- Responsive grid layout
- Copyright information

### PlayerStats Page
- Interactive player list with search
- Detailed player statistics panel
- Sample data for demonstration

## Future Enhancements

- Real API integration for live data
- Additional pages (Rankings, Tournaments, Matches)
- User authentication and favorites
- Advanced filtering and sorting
- Data visualization charts
- Player comparison features

## Development Notes

- Uses Next.js App Router for modern routing
- Fully responsive design with mobile-first approach
- TypeScript for type safety
- Modular component architecture
- Proper folder structure for scalability

## License

This project is for demonstration purposes.

# SnookerWeb
