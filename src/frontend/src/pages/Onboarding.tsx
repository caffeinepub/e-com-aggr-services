import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { UserPlus, QrCode, AlertCircle, CheckCircle2, Copy } from 'lucide-react';

export default function Onboarding() {
  const [mobile, setMobile] = useState('');
  const [clientId, setClientId] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsGenerating(true);

    try {
      // Validate mobile10 is exactly 10 digits
      if (!/^\d{10}$/.test(mobile)) {
        throw new Error('Invalid mobile');
      }

      // Generate clientId: unixTimestamp + mobile10
      const unixTimestamp = Math.floor(Date.now() / 1000);
      const generatedClientId = String(unixTimestamp) + mobile;

      // Generate QR code URL using a public API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(generatedClientId)}`;

      // Store clientId in localStorage
      localStorage.setItem('clientId', generatedClientId);

      // Update state
      setClientId(generatedClientId);
      setQrCodeUrl(qrUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate client ID');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyClientId = () => {
    if (clientId) {
      navigator.clipboard.writeText(clientId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
                  disabled={isGenerating}
                />
                <p className="text-xs text-muted-foreground">
                  Your client ID will be generated as: unixTimestamp + mobile10
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={mobile.length !== 10 || isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Client ID'}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {clientId && qrCodeUrl && (
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
                    <Badge variant="secondary" className="text-sm font-mono px-4 py-2 flex-1 justify-center">
                      {clientId}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyClientId}
                      title="Copy Client ID"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-success">Copied to clipboard!</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    This Client ID is required for placing orders.
                  </p>
                </div>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      QR Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-background rounded-lg border-2 flex items-center justify-center p-4">
                      <img
                        src={qrCodeUrl}
                        alt="Client ID QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Scan this QR code to retrieve your Client ID
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-accent/5">
            <CardHeader>
              <CardTitle className="text-sm">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <p>• Enter your 10-digit mobile number</p>
              <p>• System generates unique Client ID</p>
              <p>• QR code created for easy access</p>
              <p>• ID stored locally for future orders</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-1">
              <p>• Save your Client ID securely</p>
              <p>• Use it when placing orders</p>
              <p>• Track your order history</p>
              <p>• Access arbitrage opportunities</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
