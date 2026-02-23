import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Briefcase } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';

export default function Services() {
  const { actor, isFetching: actorLoading } = useActor();

  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !actorLoading,
  });

  const formatPrice = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
    };
    return `${symbols[currency] || currency} ${amount.toFixed(2)}`;
  };

  if (isLoading || actorLoading) {
    return (
      <div className="container py-12 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load services: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Briefcase className="h-10 w-10 text-primary" />
          Services
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore our aggregated service offerings from multiple providers
        </p>
      </div>

      {services && services.length === 0 ? (
        <Alert>
          <AlertDescription>No services available at the moment.</AlertDescription>
        </Alert>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <Badge variant="secondary">{service.id}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <ExternalLink className="h-3 w-3" />
                  <a
                    href={service.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                  >
                    {new URL(service.sourceUrl).hostname}
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(service.price.amount, service.price.currency)}
                  </span>
                  <Badge variant="outline">{service.price.currency}</Badge>
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
