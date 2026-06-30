import React from 'react';
import ContactForm from '../components/ContactForm';
import SEO, { generateContactPageSchema, generateBreadcrumbSchema } from '../components/SEO';

export default function ContactPage({ siteContent }) {
  return (
    <div className="pt-20 animate-fade-in">
      <SEO
        title="Contact & Bookings"
        description="Get in touch with Midhun Saji Ram for scores, bookings, collaborations, and professional inquiries. Reach out for film scoring, live performances, and music direction."
        keywords="Contact Midhun Saji Ram, Music Director Booking, Film Scoring Inquiry, Live Performance Booking, Collaboration, Kerala Musician"
        canonical="/contact"
        schemas={[
          generateContactPageSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Contact', url: '/contact' },
          ]),
        ]}
      />
      <ContactForm profile={siteContent?.profile} siteContent={siteContent} />
    </div>
  );
}
