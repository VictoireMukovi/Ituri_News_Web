import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';

type Page = 
  | { type: 'home' }
  | { type: 'article'; slug: string }
  | { type: 'dashboard' }
  | { type: 'admin' };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });

  const handleNavigation = (path: string) => {
    if (path === '/') {
      setCurrentPage({ type: 'home' });
    } else if (path === '/dashboard') {
      setCurrentPage({ type: 'dashboard' });
    } else if (path === '/admin') {
      setCurrentPage({ type: 'admin' });
    } else if (path.startsWith('/article/')) {
      const slug = path.replace('/article/', '');
      setCurrentPage({ type: 'article', slug });
    }
  };

  const handleNavigateToArticle = (slug: string) => {
    setCurrentPage({ type: 'article', slug });
  };

  const handleNavigateBack = () => {
    setCurrentPage({ type: 'home' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header onNavigate={handleNavigation} />
        
        <main>
          {currentPage.type === 'home' && (
            <HomePage onNavigateToArticle={handleNavigateToArticle} />
          )}
          
          {currentPage.type === 'article' && (
            <ArticlePage 
              slug={currentPage.slug} 
              onNavigateBack={handleNavigateBack}
            />
          )}
          
          {currentPage.type === 'dashboard' && (
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1>Tableau de bord journaliste</h1>
                <p className="text-muted-foreground mt-2">À implémenter</p>
              </div>
            </div>
          )}
          
          {currentPage.type === 'admin' && (
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <h1>Panneau d'administration</h1>
                <p className="text-muted-foreground mt-2">À implémenter</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </AuthProvider>
  );
}