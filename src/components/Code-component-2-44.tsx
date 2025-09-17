import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';

export function NewsCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <Skeleton className="aspect-video w-full rounded-t-lg" />
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="mb-3 h-6 w-full" />
          <Skeleton className="mb-1 h-6 w-3/4" />
          <div className="mb-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-8 w-3/4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Cover image */}
      <Skeleton className="aspect-video w-full rounded-lg" />

      {/* Content */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function EmptyState({ 
  title = "Aucun article trouvé",
  description = "Essayez de modifier vos filtres de recherche.",
  action 
}: { 
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
        📰
      </div>
      <h3 className="mb-2 font-medium">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action}
    </div>
  );
}

export function ErrorState({ 
  title = "Une erreur s'est produite",
  description = "Impossible de charger les articles. Veuillez réessayer.",
  action 
}: { 
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
        ⚠️
      </div>
      <h3 className="mb-2 font-medium text-destructive">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action}
    </div>
  );
}