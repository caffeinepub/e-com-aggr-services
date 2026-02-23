import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

/**
 * Hook to fetch the order trace (last6 hash) for a given orderId
 */
export function useOrderTrace(orderId: string | null) {
  const { actor, isFetching: actorLoading } = useActor();

  return useQuery({
    queryKey: ['orderTrace', orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      return actor.getOrderTrace(orderId);
    },
    enabled: !!actor && !actorLoading && !!orderId,
    retry: false,
  });
}
