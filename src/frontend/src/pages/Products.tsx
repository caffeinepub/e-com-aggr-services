import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Package, ShoppingCart, Hash } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { useOrderTrace } from '@/hooks/useQueries';
import { useState } from 'react';
import type { CreateOrderRequest } from '@/backend';
import { get_arbitrage } from '@/lib/arbitrage';

export default function Products() {
  const { actor, isFetching: actorLoading } = useActor();
  const [orderStatus, setOrderStatus] = useState<{ type: 'success' | 'error'; message: string; orderId?: string } | null>(null);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  // Fetch order trace for the most recent order
  const { data: last6Hash, isLoading: traceLoading } = useOrderTrace(orderStatus?.orderId || null);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
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

  const handleMockOrder = async (productId: string, price: { amount: number; currency: string }) => {
    if (!actor) return;

    // Read clientId from localStorage
    const clientId = localStorage.getItem('clientId');
    
    if (!clientId) {
      setOrderStatus({
        type: 'error',
        message: 'Please complete onboarding first to get your Client ID.',
      });
      setTimeout(() => {
        setOrderStatus(null);
      }, 5000);
      return;
    }

    setLoadingProductId(productId);
    setOrderStatus(null);

    try {
      const orderRequest: CreateOrderRequest = {
        clientId,
        items: [
          {
            itemId: productId,
            quantity: BigInt(1),
            price: {
              amount: price.amount,
              currency: price.currency,
            },
          },
        ],
      };

      // Compute total (in this case, just the single item price)
      const total = price.amount;
      
      // Calculate mock wholesale price (80% of retail)
      const mockWholesalePrice = total * 0.8;
      
      // Call arbitrage computation (logs to console, no real payout)
      get_arbitrage(total, mockWholesalePrice);

      const orderId = await actor.createOrder(orderRequest);
      setOrderStatus({
        type: 'success',
        message: `Order created successfully! Order ID: ${orderId}`,
        orderId,
      });

      // Clear success message after 10 seconds to allow viewing the hash
      setTimeout(() => {
        setOrderStatus(null);
      }, 10000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setOrderStatus({
        type: 'error',
        message: `Failed to create order: ${errorMessage}`,
      });

      // Clear error message after 5 seconds
      setTimeout(() => {
        setOrderStatus(null);
      }, 5000);
    } finally {
      setLoadingProductId(null);
    }
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
            Failed to load products: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Package className="h-10 w-10 text-primary" />
          Products
        </h1>
        <p className="text-muted-foreground text-lg">
          Browse our aggregated product catalog from multiple e-commerce sources
        </p>
      </div>

      {orderStatus && (
        <Alert variant={orderStatus.type === 'error' ? 'destructive' : 'default'}>
          <AlertDescription className={orderStatus.type === 'success' ? 'text-green-600 dark:text-green-400' : ''}>
            <div className="space-y-2">
              <p>{orderStatus.message}</p>
              {orderStatus.type === 'success' && orderStatus.orderId && (
                <div className="flex items-center gap-2 mt-2 p-3 bg-muted/50 rounded-md">
                  <Hash className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Transaction Hash (last 6):</span>
                  {traceLoading ? (
                    <Skeleton className="h-5 w-16" />
                  ) : last6Hash ? (
                    <code className="text-sm font-mono bg-background px-2 py-1 rounded border">
                      {last6Hash}
                    </code>
                  ) : (
                    <span className="text-xs text-muted-foreground">Loading...</span>
                  )}
                </div>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {products && products.length === 0 ? (
        <Alert>
          <AlertDescription>No products available at the moment.</AlertDescription>
        </Alert>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <Badge variant="secondary">{product.id}</Badge>
                </div>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <ExternalLink className="h-3 w-3" />
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                  >
                    {new URL(product.sourceUrl).hostname}
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price.amount, product.price.currency)}
                  </span>
                  <Badge variant="outline">{product.price.currency}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    View Details
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleMockOrder(product.id, product.price)}
                    disabled={loadingProductId === product.id}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {loadingProductId === product.id ? 'Ordering...' : 'Mock Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
