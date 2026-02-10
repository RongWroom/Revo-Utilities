// Structured data utilities for SEO
export interface BlogPostStructuredData {
  title: string;
  description: string;
  author: { name: string };
  date: string;
  imageUrl?: string;
  url: string;
  tags?: string[];
}

export class StructuredDataManager {
  private static createBlogPostSchema(data: BlogPostStructuredData) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": data.title,
      "description": data.description,
      "author": {
        "@type": "Person",
        "name": data.author.name
      },
      "datePublished": new Date(data.date).toISOString(),
      "dateModified": new Date(data.date).toISOString(),
      "publisher": {
        "@type": "Organization",
        "name": "Revo Utilities",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logos/Revo/revo-utilities-meta-card.webp`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.url
      },
      ...(data.imageUrl && {
        "image": {
          "@type": "ImageObject",
          "url": data.imageUrl,
          "width": 1200,
          "height": 630
        }
      }),
      ...(data.tags && {
        "keywords": data.tags.join(", ")
      }),
      "url": data.url,
      "isPartOf": {
        "@type": "Blog",
        "@id": `${window.location.origin}/insights`,
        "name": "Revo Utilities Blog"
      }
    };
  }

  private static createBlogSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Revo Utilities Blog",
      "description": "Energy industry insights, cost-saving tips, and sustainability advice for UK businesses",
      "url": `${window.location.origin}/insights`,
      "publisher": {
        "@type": "Organization",
        "name": "Revo Utilities",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/logos/Revo/revo-utilities-meta-card.webp`
        }
      }
    };
  }

  public static addBlogPostStructuredData(data: BlogPostStructuredData) {
    const schema = this.createBlogPostSchema(data);
    this.addStructuredData('blog-post-schema', schema);
  }

  public static addBlogListingStructuredData() {
    const schema = this.createBlogSchema();
    this.addStructuredData('blog-schema', schema);
  }

  // Add FAQPage structured data
  public static addFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    this.addStructuredData('faq-schema', schema);
  }

  private static addStructuredData(id: string, schema: object) {
    // Remove existing schema with same ID
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  public static removeStructuredData(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  }

  // Add organization structured data for service pages
  public static addOrganizationStructuredData() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Revo Utilities",
      "description": "UK business utility broker specializing in gas, electricity, and water services",
      "url": `${window.location.origin}`,
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logos/Revo/revo-utilities-meta-card.webp`
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "serviceType": ["Business Gas", "Business Electricity", "Business Water", "Utility Consulting"],
      "sameAs": [
        "https://www.facebook.com/revoutilities",
        "https://x.com/RevoUtilities/",
        "https://www.linkedin.com/company/revo-utilities/",
        "https://www.instagram.com/revoutilities/"
      ]
    };
    this.addStructuredData('organization-schema', schema);
  }

  // Add service structured data
  public static addServiceStructuredData() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Business Utility Services",
      "description": "Comprehensive utility brokerage services for UK businesses including gas, electricity, and water",
      "provider": {
        "@type": "Organization",
        "name": "Revo Utilities"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "serviceType": "Utility Brokerage",
      "offers": {
        "@type": "Offer",
        "description": "Free utility comparison and switching service for businesses"
      }
    };
    this.addStructuredData('service-schema', schema);
  }

  // Add breadcrumb structured data
  public static addBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
    this.addStructuredData('breadcrumb-schema', schema);
  }

  public static cleanup() {
    this.removeStructuredData('blog-post-schema');
    this.removeStructuredData('blog-schema');
    this.removeStructuredData('organization-schema');
    this.removeStructuredData('service-schema');
    this.removeStructuredData('breadcrumb-schema');
    this.removeStructuredData('faq-schema');
  }
}
