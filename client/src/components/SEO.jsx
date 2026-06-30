import { useEffect } from 'react';

/**
 * SEO Component — Enterprise-level dynamic metadata, Open Graph, Twitter Cards,
 * and JSON-LD structured data injection for every page.
 *
 * Usage:
 *   <SEO
 *     title="Page Title"
 *     description="Meta description"
 *     keywords="keyword1, keyword2"
 *     canonical="/about"
 *     ogImage="/midhunhero1.png"
 *     ogType="website"
 *     schemas={[{ "@context": "https://schema.org", ... }]}
 *   />
 */

const SITE_NAME = 'Midhun Saji Ram';
const SITE_URL = 'https://midhunsajiram.in'; // Replace with production URL
const DEFAULT_IMAGE = '/midhunhero1.png';
const TWITTER_HANDLE = '@midhunsajiram';
const LOCALE = 'en_IN';
const THEME_COLOR = '#060608';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeSchemas() {
  document.querySelectorAll('script[data-seo-schema]').forEach(el => el.remove());
}

function injectSchemas(schemas) {
  if (!schemas || schemas.length === 0) return;
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  schemas = [],
  robots = 'index, follow',
  author = 'Midhun Saji Ram',
}) {
  useEffect(() => {
    // --- Page Title ---
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Music Director, Singer & Performer`;
    document.title = fullTitle;

    // --- Standard Meta ---
    setMeta('description', description || 'Discover the cinematic, emotional, and luxurious musical world of Midhun Saji Ram. Explore compositions, journey timeline, blog reflections, and visual gallery.');
    if (keywords) setMeta('keywords', keywords);
    setMeta('author', author);
    setMeta('robots', robots);
    setMeta('theme-color', THEME_COLOR);
    setMeta('copyright', `© ${new Date().getFullYear()} ${SITE_NAME}. All Rights Reserved.`);
    setMeta('publisher', SITE_NAME);

    // --- Canonical URL ---
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : `${SITE_URL}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // --- Open Graph ---
    const ogImageUrl = ogImage
      ? (ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`)
      : `${SITE_URL}${DEFAULT_IMAGE}`;

    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description || 'Discover the cinematic musical world of Midhun Saji Ram.', 'property');
    setMeta('og:image', ogImageUrl, 'property');
    setMeta('og:url', canonicalUrl, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', LOCALE, 'property');

    // --- Twitter Cards ---
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description || 'Discover the cinematic musical world of Midhun Saji Ram.');
    setMeta('twitter:image', ogImageUrl);
    setMeta('twitter:creator', TWITTER_HANDLE);
    setMeta('twitter:site', TWITTER_HANDLE);

    // --- JSON-LD Structured Data ---
    removeSchemas();
    injectSchemas(schemas);

    // Cleanup on unmount
    return () => {
      removeSchemas();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schemas, robots, author]);

  return null; // This component renders nothing to the DOM
}

// ─────────────────────────────────────────────────
// Pre-built Schema Generators
// ─────────────────────────────────────────────────

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Midhun Saji Ram',
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_IMAGE}`,
    sameAs: [
      'https://instagram.com/midhunsajiram',
      'https://youtube.com/@midhunsajiram',
      'https://spotify.com/artist/midhunsajiram',
    ],
    jobTitle: 'Music Director & Composer',
    description: 'Midhun Saji Ram is a music director, singer, and performer known for cinematic compositions and emotional storytelling through sound.',
    knowsAbout: ['Music Direction', 'Singing', 'Composition', 'Malayalam Cinema', 'Film Scoring'],
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Official portfolio and digital presence of Midhun Saji Ram — Music Director, Singer & Performer.',
    publisher: {
      '@type': 'Person',
      name: 'Midhun Saji Ram',
    },
    inLanguage: 'en',
  };
}

export function generateBreadcrumbSchema(items) {
  // items: [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, ...]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateMusicRecordingSchema(song) {
  if (!song) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: song.title,
    byArtist: {
      '@type': 'Person',
      name: 'Midhun Saji Ram',
    },
    url: `${SITE_URL}/work-detail?id=${song._id}`,
    image: song.coverUrl || `${SITE_URL}${DEFAULT_IMAGE}`,
    datePublished: song.releaseDate ? new Date(song.releaseDate).toISOString().split('T')[0] : undefined,
    description: song.description || `${song.title} — a composition by Midhun Saji Ram.`,
    genre: 'Malayalam Film Music',
  };
}

export function generateArticleSchema(blog) {
  if (!blog) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverUrl || `${SITE_URL}${DEFAULT_IMAGE}`,
    author: {
      '@type': 'Person',
      name: 'Midhun Saji Ram',
    },
    publisher: {
      '@type': 'Person',
      name: 'Midhun Saji Ram',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${DEFAULT_IMAGE}`,
      },
    },
    url: `${SITE_URL}/blog-detail?id=${blog._id}`,
    datePublished: blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
    dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog-detail?id=${blog._id}`,
    },
    articleSection: blog.category || 'Reflection',
  };
}

export function generateImageGallerySchema(galleryItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Visual Gallery — Midhun Saji Ram',
    description: 'A curated visual gallery of studio sessions, live performances, events, and behind-the-scenes moments.',
    url: `${SITE_URL}/gallery`,
    image: galleryItems && galleryItems.length > 0
      ? galleryItems.filter(g => g.type === 'image').slice(0, 10).map(g => g.url)
      : [`${SITE_URL}${DEFAULT_IMAGE}`],
  };
}

export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Midhun Saji Ram',
    description: 'Get in touch with Midhun Saji Ram for scores, bookings, collaborations, and professional inquiries.',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Midhun Saji Ram',
      email: 'bookings@midhunsajiram.in',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kochi',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
  };
}

export function generateCollectionPageSchema(itemCount) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Works & Compositions — Midhun Saji Ram',
    description: 'Explore the complete portfolio of songs, short films, web series, TV programs, feature films, and independent works by Midhun Saji Ram.',
    url: `${SITE_URL}/works`,
    numberOfItems: itemCount || 0,
    author: {
      '@type': 'Person',
      name: 'Midhun Saji Ram',
    },
  };
}

export function generateFAQSchema(faqItems) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
