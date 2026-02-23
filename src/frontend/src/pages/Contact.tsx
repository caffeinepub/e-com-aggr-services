import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Phone, Building2, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';

export default function Contact() {
  const { actor, isFetching: actorLoading } = useActor();

  const { data: contactData, isLoading, error } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      if (!actor) return null;
      const [info, iframeUrl] = await actor.getContactInfo();
      return { info, iframeUrl };
    },
    enabled: !!actor && !actorLoading,
  });

  if (isLoading || actorLoading) {
    return (
      <div className="container py-12 space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load contact information: {error instanceof Error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Phone className="h-10 w-10 text-primary" />
          Contact Us
        </h1>
        <p className="text-muted-foreground text-lg">
          Get in touch with our team for support, partnerships, or inquiries
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>Version-controlled contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-foreground/90 leading-relaxed">{contactData?.info}</p>
            </div>
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@caffeine.xyz</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>admin@caffeine.xyz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* E-Contract Iframe */}
        <Card>
          <CardHeader>
            <CardTitle>E-Contract Portal</CardTitle>
            <CardDescription>Legal and contractual documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                TODO: Implement real CORS validation for iframe security in Stage 2
              </AlertDescription>
            </Alert>
            {contactData?.iframeUrl && (
              <div className="border rounded-lg overflow-hidden bg-muted/20">
                <iframe
                  src={contactData.iframeUrl}
                  title="E-Contract Portal"
                  className="w-full h-96"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
