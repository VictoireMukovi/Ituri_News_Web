import { useState, useEffect } from 'react';
import { NewsCard } from '../components/NewsCard';
import { FiltersBar } from '../components/FiltersBar';
import { Button } from '../components/ui/button';
import { NewsGridSkeleton, EmptyState, ErrorState } from '../components/LoadingStates';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../components/ui/pagination';
import { mockApi } from '../lib/mock-api';
import { Post, Domain, Author, PostFilters, PostsResponse } from '../types';

interface HomePageProps {
  onNavigateToArticle: (slug: string) => void;
}

export function HomePage({ onNavigateToArticle }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filters, setFilters] = useState<PostFilters>({ page: 1, pageSize: 12 });
  const [pagination, setPagination] = useState({ total: 0, page: 1, pageSize: 12 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [domainsData, authorsData] = await Promise.all([
          mockApi.getDomains(),
          mockApi.getAuthors()
        ]);
        setDomains(domainsData);
        setAuthors(authorsData);
      } catch (err) {
        console.error('Failed to load initial data:', err);
        setError('Impossible de charger les données initiales');
      }
    };

    loadInitialData();
  }, []);

  // Load posts when filters change
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await mockApi.getPosts(filters);
        setPosts(response.items);
        setPagination({
          total: response.total,
          page: response.page,
          pageSize: response.pageSize
        });
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Impossible de charger les articles');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [filters]);

  const handleFiltersChange = (newFilters: PostFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  if (error && !posts.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState 
          action={
            <Button onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-2">Actualités de l'Ituri</h1>
        <p className="text-muted-foreground">
          Découvrez les dernières nouvelles de la province de l'Ituri
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FiltersBar
          domains={domains}
          authors={authors}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
        />
      </div>

      {/* Results Count */}
      {!isLoading && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {pagination.total === 0 
              ? 'Aucun article trouvé'
              : `${pagination.total} article${pagination.total > 1 ? 's' : ''} trouvé${pagination.total > 1 ? 's' : ''}`
            }
          </p>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <NewsGridSkeleton count={filters.pageSize} />
      ) : posts.length === 0 ? (
        <EmptyState 
          action={
            <Button variant="outline" onClick={() => handleFiltersChange({ page: 1 })}>
              Voir tous les articles
            </Button>
          }
        />
      ) : (
        <>
          {/* News Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {posts.map((post) => (
              <NewsCard
                key={post.id}
                post={post}
                onClick={(post) => onNavigateToArticle(post.slug)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
                      className={pagination.page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (pagination.page <= 3) {
                      pageNumber = i + 1;
                    } else if (pagination.page >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = pagination.page - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={pageNumber === pagination.page}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, pagination.page + 1))}
                      className={pagination.page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}