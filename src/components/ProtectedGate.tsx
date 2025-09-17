import { ReactNode, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './LoginModal';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Lock, LogIn } from 'lucide-react';

interface ProtectedGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  showPreview?: boolean;
  previewHeight?: string;
}

export function ProtectedGate({ 
  children, 
  fallback, 
  showPreview = true, 
  previewHeight = '200px' 
}: ProtectedGateProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative">
      {/* Blurred preview */}
      {showPreview && (
        <div 
          className="overflow-hidden"
          style={{ height: previewHeight }}
        >
          <div className="filter blur-sm pointer-events-none">
            {children}
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Connexion requise</CardTitle>
            <CardDescription>
              Vous devez être connecté pour lire l'article complet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowLoginModal(true)} 
              className="w-full"
              size="lg"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Se connecter avec Google
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
}