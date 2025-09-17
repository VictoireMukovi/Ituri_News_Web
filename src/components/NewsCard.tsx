import { Post } from '../types';
import { DomainBadge } from './DomainBadge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye, MessageCircle } from 'lucide-react';

interface NewsCardProps {
  post: Post;
  onClick?: (post: Post) => void;
  className?: string;
}

export function NewsCard({ post, onClick, className }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClick = () => {
    onClick?.(post);
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-1 hover:ring-primary/20 ${className}`}
      onClick={handleClick}
    >
      <CardContent className="p-0">
        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg">
            <ImageWithFallback
              src={post.coverImageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          {/* Domain Badge and Date */}
          <div className="mb-3 flex items-center justify-between">
            <DomainBadge domain={post.domain} />
            <time className="text-sm text-muted-foreground">
              {formatDate(post.createdAt)}
            </time>
          </div>
          
          {/* Title */}
          <h3 className="mb-3 line-clamp-2 font-medium leading-tight group-hover:text-primary">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="mb-4 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          {/* Author and Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.fullName} />
                <AvatarFallback>
                  {post.author.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {post.author.fullName}
              </span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.commentCount}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}