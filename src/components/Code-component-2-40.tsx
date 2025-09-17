import DOMPurify from 'dompurify';

interface RichTextViewerProps {
  content: string;
  className?: string;
}

export function RichTextViewer({ content, className = '' }: RichTextViewerProps) {
  // Sanitize HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'em', 'u', 'br', 'ul', 'ol', 'li',
      'blockquote', 'a', 'img'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target'],
    ALLOW_DATA_ATTR: false,
  });

  return (
    <div 
      className={`prose prose-gray max-w-none dark:prose-invert prose-headings:font-medium prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}