import React from 'react';
import BlogSection from '../components/BlogSection';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';

export default function BlogPage({ blogs, loading, navigate }) {
  return (
    <div className="pt-20 animate-fade-in">
      <SEO
        title="Blog — Reflections"
        description="Read personal stories, reflections, behind-the-scenes moments, and articles by Midhun Saji Ram on music, legacy, and creative life."
        keywords="Midhun Saji Ram Blog, Music Reflections, Behind the Scenes, Artist Stories, Malayalam Music Blog"
        canonical="/blog"
        schemas={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Reflections — Midhun Saji Ram',
            description: 'Personal stories, reflections, and articles by Midhun Saji Ram.',
            url: 'https://midhunsajiram.in/blog',
            author: { '@type': 'Person', name: 'Midhun Saji Ram' },
          },
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
          ]),
        ]}
      />
      <BlogSection 
        blogs={blogs} 
        loading={loading} 
        onBlogClick={(blog) => navigate(`/blog-detail?id=${blog._id}`)} 
      />
    </div>
  );
}
