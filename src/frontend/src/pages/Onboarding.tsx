import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { UserPlus, QrCode, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';

export default function Onboarding() {
  const { actor } = useActor();
  const [mobile, setMobile] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);

  const generateClientIdMutation = useMutation({
    mutationFn: async (mobileNumber: string) => {
      if (!actor) throw new Error('Actor not initialized');
      
      // Validate 10-digit mobile number
      if (!/^\d{10}$/.test(mobileNumber)) {
        throw new Error('Mobile number must be exactly 10 digits');
      }

      // Generate unix timestamp
      const unixTimestamp = Math.floor(Date.now() / 1000).toString();
      
      // Call backend to generate clientId
      const id = await actor.generateClientId(mobileNumber, unixTimestamp);
      
      // TODO: Store clientId in sessionStorage for use in order flows (Stage 2)
      // sessionStorage.setItem('clientId', id);
      
      return id;
    },
    onSuccess: (id) => {
      setClientId(id);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateClientIdMutation.mutate(mobile);
  };

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <UserPlus className="h-10 w-10 text-primary" />
          Client Registration
        </h1>
        <p className="text-muted-foreground text-lg">
          Register as a client using QRC onboarding flow
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Stage 2 Implementation:</strong> QRC onboarding with clientId = unixTimestamp + mobile10
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Generate Client ID</CardTitle>
            <CardDescription>
              Enter your 10-digit mobile number to generate a unique client identifier
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number (10 digits)</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="1234567890"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Your client ID will be generated as: unixTimestamp + mobile10
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={mobile.length !== 10 || generateClientIdMutation.isPending}
              >
                {generateClientIdMutation.isPending ? 'Generating...' : 'Generate Client ID'}
              </Button>
            </form>

            {generateClientIdMutation.isError && (
              <Alert variant="destructive">
                <AlertDescription>
                  {generateClientIdMutation.error instanceof Error
                    ? generateClientIdMutation.error.message
                    : 'Failed to generate client ID'}
                </AlertDescription>
              </Alert>
            )}

            {clientId && (
              <div className="space-y-4 pt-4 border-t">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Client ID generated successfully!</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label>Your Client ID</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm font-mono px-4 py-2">
                      {clientId}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Save this ID for placing orders. TODO: Implement persistent local storage in Stage 2.
                  </p>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      QR Code (Coming Soon)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-background rounded-lg border-2 border-dashed flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <QrCode className="h-16 w-16 mx-auto text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">
                          TODO: Integrate QR code generation library
                          <br />
                          (e.g., qrcode.react) to display QR code
                          <br />
                          for clientId in Stage 2
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stage 2 & 3 Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-accent/5">
            <CardHeader>
              <CardTitle className="text-sm">Stage 2: Session Management</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <p>• QR code scanning instructions</p>
              <p>• Persistent local storage strategy</p>
              <p>• Session management UI</p>
              <p>• Client authentication flow</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">Stage 3: Advanced Features</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <p>• Merkle Root order tracing</p>
              <p>• Transaction hash tracking</p>
              <p>• Leaderboard integration</p>
              <p>• Automated payout routing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
