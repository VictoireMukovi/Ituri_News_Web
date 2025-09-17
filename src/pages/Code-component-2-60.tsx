import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Calendar, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedGate } from '../components/ProtectedGate';
import { RichTextViewer } from '../components/RichTextViewer';
import { DomainBadge } from '../components/DomainBadge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ArticleSkeleton, ErrorState } from '../components/LoadingStates';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { mockApi } from '../lib/mock-api';
import { Post } from '../types';

interface ArticlePageProps {
  slug: string;
  onNavigateBack: () => void;
  onNavigateToAuthor?: (authorId: string) => void;
}

export function ArticlePage({ slug, onNavigateBack, onNavigateToAuthor }: ArticlePageProps) {
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const postData = await mockApi.getPost(slug);
        if (!postData) {
          setError('Article non trouvé');
        } else {
          setPost(postData);
        }
      } catch (err) {
        console.error('Failed to load post:', err);
        setError('Impossible de charger l\'article');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onNavigateBack} className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Button>
        </div>
        <ArticleSkeleton />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={onNavigateBack} className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Button>
        </div>
        <ErrorState 
          title={error || 'Article non trouvé'}
          description="L'article que vous recherchez n'existe pas ou a été supprimé."
          action={
            <Button onClick={onNavigateBack}>
              Retour aux articles
            </Button>
          }
        />
      </div>
    );
  }

  const articleHeader = (
    <div className="mx-auto max-w-4xl">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onNavigateBack} className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux articles
        </Button>
      </div>

      {/* Article Header */}
      <div className="space-y-6">
        {/* Meta */}
        <div className="flex items-center justify-between">
          <DomainBadge domain={post.domain} />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.createdAt)}
            </div>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold leading-tight lg:text-4xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author.avatarUrl} alt={post.author.fullName} />
            <AvatarFallback>
              {post.author.fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <button 
              onClick={() => onNavigateToAuthor?.(post.author.id)}
              className="font-medium hover:text-primary transition-colors"
            >
              {post.author.fullName}
            </button>
            {post.author.bio && (
              <p className="text-sm text-muted-foreground">{post.author.bio}</p>
            )}
          </div>
        </div>

        <Separator />
      </div>

      {/* Cover Image */}
      {post.coverImageUrl && (
        <div className="my-8">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <ImageWithFallback
              src={post.coverImageUrl}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );

  const articleContent = (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardContent className="pt-8">
          <RichTextViewer content={post.htmlContent} />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {articleHeader}
      
      <ProtectedGate showPreview={true} previewHeight="300px">
        {articleContent}
      </ProtectedGate>

      {/* Related Articles Section - Mock for now */}
      {isAuthenticated && (
        <div className="mx-auto max-w-4xl mt-12">
          <Separator className="mb-8" />
          <h2 className="mb-6">Articles similaires</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* This would be populated with related articles */}
            <div className="text-center text-muted-foreground py-8">
              <p>Fonctionnalité à venir</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}