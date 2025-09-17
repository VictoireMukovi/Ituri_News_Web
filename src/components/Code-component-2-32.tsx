import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Domain, Author, PostFilters } from '../types';

interface FiltersBarProps {
  domains: Domain[];
  authors: Author[];
  filters: PostFilters;
  onFiltersChange: (filters: PostFilters) => void;
  isLoading?: boolean;
}

export function FiltersBar({ 
  domains, 
  authors, 
  filters, 
  onFiltersChange, 
  isLoading 
}: FiltersBarProps) {
  const [searchQuery, setSearchQuery] = useState(filters.q || '');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, q: searchQuery || undefined, page: 1 });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDomainChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      domain: value === 'all' ? undefined : value,
      page: 1 
    });
  };

  const handleAuthorChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      author: value === 'all' ? undefined : value,
      page: 1 
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    onFiltersChange({ page: 1 });
  };

  const activeFiltersCount = [filters.domain, filters.author, filters.q].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and Selects */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher des articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            disabled={isLoading}
          />
        </div>

        {/* Domain Filter */}
        <Select 
          value={filters.domain || 'all'} 
          onValueChange={handleDomainChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tous les domaines" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les domaines</SelectItem>
            {domains.map((domain) => (
              <SelectItem key={domain.id} value={domain.slug}>
                {domain.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Author Filter */}
        <Select 
          value={filters.author || 'all'} 
          onValueChange={handleAuthorChange}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tous les journalistes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les journalistes</SelectItem>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearFilters}
            disabled={isLoading}
          >
            <X className="mr-2 h-4 w-4" />
            Effacer ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.q && (
            <Badge variant="secondary" className="gap-1">
              Recherche: "{filters.q}"
              <button
                onClick={() => {
                  setSearchQuery('');
                  onFiltersChange({ ...filters, q: undefined, page: 1 });
                }}
                className="ml-1 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.domain && (
            <Badge variant="secondary" className="gap-1">
              Domaine: {domains.find(d => d.slug === filters.domain)?.name}
              <button
                onClick={() => handleDomainChange('all')}
                className="ml-1 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.author && (
            <Badge variant="secondary" className="gap-1">
              Journaliste: {authors.find(a => a.id === filters.author)?.fullName}
              <button
                onClick={() => handleAuthorChange('all')}
                className="ml-1 rounded-full hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}