import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  structuredData?: object;
}

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  structuredData
}: SEOHeadProps) => {
  const location = useLocation();

  const defaultTitle = 'Business Utility Broker UK | Revo Utilities';
  const defaultDescription = 'Revo Utilities helps UK businesses save up to 50% on gas, electricity, and water rates. Get independent advice, competitive quotes, and flexible billing from trusted experts.';
  const defaultImage = '/logos/Revo/revo-utilities-meta-card.webp';
  const baseUrl = 'https://www.revo-utilities.com';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    if (keywords) updateMetaTag('keywords', keywords);
    if (author) updateMetaTag('author', author);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = finalUrl;

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:url', finalUrl, true);
    updateMetaTag('og:type', type, true);

    if (publishedTime) updateMetaTag('article:published_time', publishedTime, true);
    if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime, true);
    if (author) updateMetaTag('article:author', author, true);

    // Twitter tags
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:url', finalUrl);

    // Add structured data if provided
    if (structuredData) {
      const existingScript = document.getElementById('page-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'page-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      const script = document.getElementById('page-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [finalTitle, finalDescription, finalImage, finalUrl, type, publishedTime, modifiedTime, author, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;
