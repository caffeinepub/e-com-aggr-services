import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { ShoppingBag, Package, Phone, Map, UserPlus } from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { path: '/', label: 'Home', icon: ShoppingBag },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/services', label: 'Services', icon: Package },
    { path: '/contact', label: 'Contact', icon: Phone },
    { path: '/sitemap', label: 'Sitemap', icon: Map },
    { path: '/onboarding', label: 'Register', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              e-Com Aggr. Services
            </span>
          </Link>
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} e-Com Aggr. Services. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'e-com-aggr-services'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground/60 text-center max-w-2xl">
              Real-time ONDC-superior e-commerce aggregator powered by distributed scraping and leaderboard-driven arbitrage.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
