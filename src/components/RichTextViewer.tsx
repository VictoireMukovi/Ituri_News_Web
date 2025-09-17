interface RichTextViewerProps {
  content: string;
  className?: string;
}

// Basic HTML sanitizer - removes dangerous tags and attributes
function sanitizeHtml(html: string): string {
  const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'br', 'ul', 'ol', 'li', 'blockquote', 'a'];
  const allowedAttrs = ['href', 'alt', 'title'];
  
  // This is a simplified sanitizer for demo purposes
  // In production, use DOMPurify or similar library
  let sanitized = html;
  
  // Remove script tags
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  return sanitized;
}

export function RichTextViewer({ content, className = '' }: RichTextViewerProps) {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = sanitizeHtml(content);

  return (
    <div 
      className={`prose prose-gray max-w-none dark:prose-invert prose-headings:font-medium prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}