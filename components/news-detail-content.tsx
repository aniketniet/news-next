import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  category: string;
  publishedAt: string;
  author: string;
  readTime: string;
  tags: string[];
}

interface NewsDetailContentProps {
  article: Article;
}

export function NewsDetailContent({ article }: NewsDetailContentProps) {
  const socialLinks = [
    { name: "Facebook", href: "#", bgColor: "bg-blue-600", icon: "facebook" },
    { name: "Twitter", href: "#", bgColor: "bg-sky-500", icon: "twitter" },
    { name: "LinkedIn", href: "#", bgColor: "bg-blue-700", icon: "linkedin" },
    { name: "WhatsApp", href: "#", bgColor: "bg-green-500", icon: "whatsapp" },
    { name: "Share", href: "#", bgColor: "bg-gray-600", icon: "share" },
  ];

  return (
    <article className="space-y-6">
      {/* Category and Meta Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{article.publishedAt}</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {article.subtitle}
        </p>
        
        {/* Author and Read Time */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-200 pb-4">
          <div>
            <span>By {article.author}</span>
          </div>
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
        />
      </div>

      {/* Social Share Buttons */}
      <div className="flex items-center gap-2 py-4 border-y border-gray-200">
        <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>
        {socialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            className={`${social.bgColor} p-2 rounded hover:opacity-80 transition-opacity duration-200`}
            aria-label={`Share on ${social.name}`}
          >
            {social.icon === "facebook" && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )}
            {social.icon === "twitter" && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            )}
            {social.icon === "linkedin" && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            )}
            {social.icon === "whatsapp" && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
              </svg>
            )}
            {social.icon === "share" && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            )}
          </Link>
        ))}
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Tags:</span>
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase()}`}
              className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
