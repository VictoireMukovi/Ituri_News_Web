import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { Moon, Sun, LogOut, User, Settings, PenTool, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (path: string) => {
    onNavigate?.(path);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300';
      case 'journalist':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => handleNavigation('/')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold">
            I
          </div>
          <span className="font-bold text-xl">Ituri News</span>
        </button>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Basculer le thème</span>
          </Button>

          {/* Auth Section */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`w-fit text-xs ${getRoleBadgeColor(user.role)}`}
                    >
                      {user.role === 'superadmin' ? 'Super Admin' : 
                       user.role === 'journalist' ? 'Journaliste' : 'Lecteur'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator />
                
                {/* Navigation Items */}
                {(user.role === 'journalist' || user.role === 'superadmin') && (
                  <DropdownMenuItem onClick={() => handleNavigation('/dashboard')}>
                    <PenTool className="mr-2 h-4 w-4" />
                    <span>Tableau de bord</span>
                  </DropdownMenuItem>
                )}
                
                {user.role === 'superadmin' && (
                  <DropdownMenuItem onClick={() => handleNavigation('/admin')}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Administration</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn()}>
              Se connecter
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}