import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, TrendingUp, Shield, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Zap className="h-4 w-4" />
          <span>Real-Time E-Commerce Aggregation</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
          e-Com Aggr. Services
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The next-generation e-commerce aggregator that scrapes unlimited sources, powers drop-shipping, and extracts profit via leaderboard-driven arbitrage.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link to="/products">
            <Button size="lg" className="gap-2">
              <Package className="h-5 w-5" />
              Browse Products
            </Button>
          </Link>
          <Link to="/services">
            <Button size="lg" variant="outline" className="gap-2">
              <ShoppingBag className="h-5 w-5" />
              View Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Platform Features</h2>
          <p className="text-muted-foreground">Modular, scalable, resilient, and decentralized</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Unlimited Scraping</CardTitle>
              <CardDescription>
                Real-time distributed scraping engine that aggregates products and services from unlimited external sources.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Arbitrage Engine</CardTitle>
              <CardDescription>
                Leaderboard-driven profit extraction with automated routing to top-ranking providers for optimal margins.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Merkle Tracing</CardTitle>
              <CardDescription>
                Cryptographic order tracing with Merkle Root + Nonce for complete transaction integrity and auditability.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Implementation Stages */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Development Roadmap</h2>
          <p className="text-muted-foreground">Staged implementation for robust delivery</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-primary/5 border-primary">
            <CardHeader>
              <CardTitle className="text-primary">Stage 1: Foundation</CardTitle>
              <CardDescription className="text-foreground/80">
                ✅ App shell with routing
                <br />
                ✅ Product & Service models
                <br />
                ✅ Mock scraper with sample data
                <br />
                ✅ Basic order API
                <br />
                ✅ Contact & Sitemap pages
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-accent/5 border-accent">
            <CardHeader>
              <CardTitle className="text-accent-foreground">Stage 2: Identity & Arbitrage</CardTitle>
              <CardDescription className="text-foreground/80">
                🔄 QRC onboarding flow
                <br />
                🔄 Client ID generation
                <br />
                🔄 Arbitrage functions (stubbed)
                <br />
                🔄 Session management
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-muted/50 border-muted">
            <CardHeader>
              <CardTitle className="text-muted-foreground">Stage 3: Production</CardTitle>
              <CardDescription className="text-foreground/60">
                📋 Real HTTP scraping
                <br />
                📋 Merkle Root tracing
                <br />
                📋 Leaderboard integration
                <br />
                📋 Payout routing
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Register as a client to access our aggregated marketplace and start placing orders.
        </p>
        <Link to="/onboarding">
          <Button size="lg" className="gap-2">
            <ShoppingBag className="h-5 w-5" />
            Register Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
