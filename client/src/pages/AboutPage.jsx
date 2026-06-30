import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AboutSection from '../components/AboutSection';
import FatherLegacy from '../components/FatherLegacy';
import TimelineSection from '../components/TimelineSection';
import SEO, { generatePersonSchema, generateBreadcrumbSchema } from '../components/SEO';

export default function AboutPage({ timelineData, onStoryClick, onExploreClick, loading, siteContent = {} }) {
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  return (
    <div className="pt-20 animate-fade-in relative">
      <SEO
        title="About & Journey"
        description="Learn about Midhun Saji Ram's musical journey, his father Saji Ram's legacy, career timeline, and the passion behind cinematic compositions."
        keywords="Midhun Saji Ram About, Saji Ram Legacy, Music Journey, Malayalam Music Director Biography, Career Timeline"
        canonical="/about"
        schemas={[
          generatePersonSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'About & Journey', url: '/about' },
          ]),
        ]}
      />
      
      {/* Lightbox Modal for Spotlight Image */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button className="absolute top-6 right-6 text-white hover:text-gold-500 transition-colors cursor-pointer">
              <X size={24} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={activeLightboxImage}
              className="max-h-[90vh] max-w-full object-contain rounded border border-white/10 shadow-2xl"
              alt="Spotlight"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AboutSection onActionClick={onExploreClick} content={siteContent.about} />
      <FatherLegacy 
        onStoryClick={onStoryClick} 
        onImageClick={setActiveLightboxImage} 
        content={siteContent.father_legacy} 
      />
      <TimelineSection timelineData={timelineData} onActionClick={onStoryClick} loading={loading} />
    </div>
  );
}
