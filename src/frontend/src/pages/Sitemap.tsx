import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Map, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';

export default function Sitemap() {
  const { actor, isFetching: actorLoading } = useActor();

  const { data: sitemapData, isLoading, error } = useQuery({
    queryKey: ['sitemap'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSitemap();
    },
    enabled: !!actor && !actorLoading,
  });

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'owner':
        return 'destructive';
      case 'admin':
        return 'default';
      case 'client':
        return 'secondary';
      case 'global':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getPriorityLabel = (priority: bigint) => {
    const p = Number(priority);
    if (p === 1) return 'Critical';
    if (p === 2) return 'High';
    if (p === 3) return 'Medium';
    if (p === 4) return 'Normal';
    return 'Low';
  };

  if (isLoading || actorLoading) {
    return (
      <div className="container py-12 space-y-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load sitemap: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Group by role for better organization
  const groupedByRole = sitemapData?.reduce((acc, [path, priority, role]) => {
    if (!acc[role]) acc[role] = [];
    acc[role].push({ path, priority, role });
    return acc;
  }, {} as Record<string, Array<{ path: string; priority: bigint; role: string }>>);

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Map className="h-10 w-10 text-primary" />
          Sitemap
        </h1>
        <p className="text-muted-foreground text-lg">
          Complete directory of application routes with priority and access control
        </p>
      </div>

      <Alert>
        <FileText className="h-4 w-4" />
        <AlertDescription>
          Machine-readable sitemap available at <code className="font-mono text-xs">/sitemap.xml</code> for search engines
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {groupedByRole && Object.entries(groupedByRole).map(([role, pages]) => (
          <Card key={role}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {role} Routes
                    <Badge variant={getRoleColor(role)}>{pages.length}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Pages accessible to {role.toLowerCase()} users
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Access Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page, idx) => (
                    <TableRow key={`${page.path}-${idx}`}>
                      <TableCell className="font-mono text-sm">{page.path}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getPriorityLabel(page.priority)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleColor(page.role)}>{page.role}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
