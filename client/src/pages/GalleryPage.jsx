import React from 'react';
import GallerySection from '../components/GallerySection';
import SEO, { generateImageGallerySchema, generateBreadcrumbSchema } from '../components/SEO';

export default function GalleryPage({ gallery, loading }) {
  return (
    <div className="pt-20 animate-fade-in">
      <SEO
        title="Visual Gallery"
        description="Browse the visual gallery of Midhun Saji Ram — studio sessions, live performances, event photographs, behind-the-scenes moments, and professional photoshoots."
        keywords="Midhun Saji Ram Gallery, Music Photos, Live Performances, Studio Sessions, Event Photography, Behind the Scenes"
        canonical="/gallery"
        schemas={[
          generateImageGallerySchema(gallery),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Visual Gallery', url: '/gallery' },
          ]),
        ]}
      />
      <GallerySection galleryItems={gallery} infiniteScroll={true} loading={loading} />
    </div>
  );
}
