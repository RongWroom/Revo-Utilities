// Comprehensive SEO utilities
import { StructuredDataManager } from './structuredData';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  breadcrumbs?: Array<{ name: string; url: string }>;
  structuredDataType?: 'organization' | 'service' | 'blog' | 'blogPost';
  blogPostData?: {
    title: string;
    description: string;
    author: { name: string };
    date: string;
    imageUrl?: string;
    url: string;
    tags?: string[];
  };
  robots?: string;
}

export class SEOManager {
  private static baseUrl = 'https://www.revo-utilities.com';

  public static setupPageSEO(config: PageSEOConfig, pathname: string) {
    // Update document title
    document.title = config.title;

    // Update meta tags
    this.updateMetaTags(config, pathname);

    // Add structured data based on type
    this.addStructuredData(config);

    // Add breadcrumb structured data if provided
    if (config.breadcrumbs) {
      StructuredDataManager.addBreadcrumbStructuredData(config.breadcrumbs);
    }
  }

  private static updateMetaTags(config: PageSEOConfig, pathname: string) {
    const fullUrl = `${this.baseUrl}${pathname}`;
    const defaultImage = '/logos/Revo/revo-utilities-meta-card.webp';

    // Helper function to update meta tags
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
    updateMetaTag('description', config.description);
    if (config.keywords) updateMetaTag('keywords', config.keywords);
    if (config.robots) updateMetaTag('robots', config.robots);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Open Graph tags
    updateMetaTag('og:title', config.title, true);
    updateMetaTag('og:description', config.description, true);
    updateMetaTag('og:image', `${this.baseUrl}${config.image || defaultImage}`, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', config.type || 'website', true);

    // Twitter tags
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    updateMetaTag('twitter:image', `${this.baseUrl}${config.image || defaultImage}`);
    updateMetaTag('twitter:url', fullUrl);
  }

  private static addStructuredData(config: PageSEOConfig) {
    switch (config.structuredDataType) {
      case 'organization':
        StructuredDataManager.addOrganizationStructuredData();
        break;
      case 'service':
        StructuredDataManager.addServiceStructuredData();
        break;
      case 'blog':
        StructuredDataManager.addBlogListingStructuredData();
        break;
      case 'blogPost':
        if (config.blogPostData) {
          StructuredDataManager.addBlogPostStructuredData(config.blogPostData);
        }
        break;
    }
  }

  public static cleanup() {
    StructuredDataManager.cleanup();
  }

  // Generate breadcrumbs from pathname
  public static generateBreadcrumbs(pathname: string): Array<{ name: string; url: string }> {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', url: this.baseUrl }];

    let currentPath = '';
    segments.forEach(segment => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        name,
        url: `${this.baseUrl}${currentPath}`
      });
    });

    return breadcrumbs;
  }
}

// Pre-configured SEO settings for different pages
export const pageSEOConfigs = {
  home: {
    title: 'Business Utility Broker UK | Revo Utilities',
    description: 'Revo Utilities helps UK businesses save up to 50% on gas, electricity, and water rates. Get independent advice, competitive quotes, and flexible billing from trusted experts.',
    keywords: 'business utilities, gas, electricity, water, UK, energy savings, commercial utilities, flexible billing, Revo Utilities',
    structuredDataType: 'organization' as const
  },
  services: {
    title: 'Business Utility Services | Gas, Electricity & Water | Revo Utilities',
    description: 'Comprehensive utility services for UK businesses. Expert advice on gas, electricity, water, and telecoms with competitive rates and flexible billing options.',
    keywords: 'business utility services, commercial gas, business electricity, water services, telecom services, UK utilities',
    structuredDataType: 'service' as const
  },
  comparison: {
    title: 'Utility Price Comparison | Compare Business Energy Rates | Revo Utilities',
    description: 'Compare business utility prices and find the best deals on gas, electricity, and water. Free comparison service with expert advice from Revo Utilities.',
    keywords: 'utility comparison, business energy comparison, gas prices, electricity rates, water costs, price comparison',
    structuredDataType: 'service' as const
  },
  blog: {
    title: 'Energy & Utility Blog | Business Tips & Insights | Revo Utilities',
    description: 'Expert insights on business energy, utility cost-saving tips, and industry news. Stay informed with the latest from Revo Utilities.',
    keywords: 'energy blog, utility tips, business energy advice, cost saving, sustainability, energy efficiency',
    structuredDataType: 'blog' as const
  },
  team: {
    title: 'Our Team | Expert Utility Consultants | Revo Utilities',
    description: 'Meet the expert team at Revo Utilities. Experienced utility consultants dedicated to helping UK businesses save on energy and water costs.',
    keywords: 'utility consultants, energy experts, business advisors, Revo Utilities team',
    structuredDataType: 'organization' as const
  },
  partnerships: {
    title: 'Our Partnerships | Energy, Water, Telecoms & Payments | Revo Utilities',
    description: 'Explore Revo Utilities\' trusted partner network across energy, water, telecoms and payments that helps us deliver market-leading value and service.',
    keywords: 'utility partners, energy partners, water partners, telecoms partners, merchant services partners, business utilities partners',
    image: '/logos/Revo/revo-utilities-meta-card.webp',
    structuredDataType: 'organization' as const
  }
};
