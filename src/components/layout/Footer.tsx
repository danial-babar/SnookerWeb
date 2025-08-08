import Link from "next/link";

const footerNavigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "New Game", href: "/new-game" },
    { name: "Player Stats", href: "/player-stats" },
    { name: "All Matches", href: "/all-matches" },
    { name: "Statictics", href: "/statistics" },
  ],
  social: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#020123]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-2 xl:col-span-1">
            <div className="text-2xl font-bold text-white">Snooker Game</div>
            <p className="text-sm text-gray-300">
              Your comprehensive source for professional snooker game, player
              rankings, and tournament results.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white">Navigation</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Support</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.social.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Snooker Stats. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
