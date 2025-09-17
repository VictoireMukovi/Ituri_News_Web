import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockUsers } from '../lib/mock-data';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleSignIn = async () => {
    if (!selectedUser) return;
    
    setIsLoading(true);
    try {
      // In a real app, this would trigger Google OAuth
      // For demo, we're simulating with different mock Google tokens
      await signIn(selectedUser);
      onClose();
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connexion à Ituri News</DialogTitle>
          <DialogDescription>
            Choisissez un utilisateur pour simuler la connexion Google OAuth
          </DialogDescription>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mode Démonstration</CardTitle>
            <CardDescription>
              Sélectionnez un profil utilisateur pour tester les différents rôles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un utilisateur..." />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map((user) => (
                  <SelectItem key={user.googleId} value={user.googleId!}>
                    <div className="flex items-center justify-between w-full">
                      <span>{user.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({user.role === 'superadmin' ? 'Admin' : 
                          user.role === 'journalist' ? 'Journaliste' : 'Lecteur'})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleSignIn} 
              disabled={!selectedUser || isLoading}
              className="w-full"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Dans une vraie application, ceci utiliserait Google OAuth 2.0
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}