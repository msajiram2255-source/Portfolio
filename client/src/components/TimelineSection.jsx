import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import ShinyText from './ShinyText';

export default function TimelineSection({ timelineData, onActionClick, loading }) {
  const [activeEventIdx, setActiveEventIdx] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const height = useTransform(scaleY, [0, 1], ["0%", "100%"]);
  const noteOpacity = useTransform(scaleY, [0, 0.05], [0, 1]);

  if (loading) {
    return (
      <section id="timeline" className="relative py-14 bg-white overflow-hidden animate-pulse">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Static Column */}
            <div className="lg:col-span-4 text-left flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-2">
                THE JOURNEY
              </span>
              <h2 className="font-serif text-3.5xl md:text-4xl font-bold tracking-tight text-charcoal-900 mb-2 leading-tight">
                <ShinyText text="From a Home Filled with Music to a World that Listens" speed={3} />
              </h2>
              <svg className="w-16 h-3 text-gold-500/50 mb-6" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2,6 C15,2 25,10 40,6 C55,2 65,10 80,6 C90,4 95,6 98,6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </svg>
              <p className="text-charcoal-800 text-xs md:text-sm font-light leading-relaxed max-w-sm mb-6">
                Born into a home where music wasn't just heard — it was lived. From the first note I heard to the stages I dream today, every moment has been a part of a beautiful journey.
              </p>
              <div className="w-32 h-10 bg-cream-200 rounded-full" />
            </div>

            {/* Right Cards Static Grid Column */}
            <div className="lg:col-span-8 mt-6 lg:mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                
                {/* Timeline Column Skeleton */}
                <div className="lg:col-span-7 text-left relative pl-8 py-4">
                  <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-charcoal-900/10 dark:bg-white/15" />
                  {[1, 2, 3, 4].map((idx) => (
                    <div key={idx} className="relative mb-8 last:mb-0">
                      <div className="absolute left-[-22px] top-1.5 w-3.5 h-3.5 rounded-full bg-cream-200" style={{ transform: 'translateX(-50%)' }} />
                      <div className="space-y-2">
                        <div className="h-6 w-16 bg-cream-200 rounded" />
                        <div className="h-3 w-32 bg-cream-200 rounded" />
                        <div className="h-2.5 w-48 bg-cream-200 rounded" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Media Column Skeleton */}
                <div className="lg:col-span-5 flex justify-center items-center py-4">
                  <div className="w-[240px] h-[310px] bg-cream-200 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }
  const defaultEvents = [
    { 
      year: '1998', 
      title: 'Where it all began', 
      description: 'Surrounded by music, instruments and endless curiosity.',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><rect x="10" y="10" width="380" height="280" fill="none" stroke="%23ebd8be" stroke-width="1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="16" font-style="italic" fill="%23cca647">1998 Milestone</text></svg>'
    },
    { 
      year: '2008', 
      title: 'Learning. Observing. Absorbing.', 
      description: 'Learning not just music, but emotion, discipline and silence.',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><rect x="10" y="10" width="380" height="280" fill="none" stroke="%23ebd8be" stroke-width="1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="16" font-style="italic" fill="%23cca647">2008 Milestone</text></svg>'
    },
    { 
      year: '2016', 
      title: 'Finding my voice', 
      description: 'Stepping into studios, compositions and my own sound.',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><rect x="10" y="10" width="380" height="280" fill="none" stroke="%23ebd8be" stroke-width="1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="16" font-style="italic" fill="%23cca647">2016 Milestone</text></svg>'
    },
    { 
      year: '2023', 
      title: 'Creating. Performing. Inspiring.', 
      description: 'Continuing the legacy and building a new musical tomorrow.',
      image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><rect x="10" y="10" width="380" height="280" fill="none" stroke="%23ebd8be" stroke-width="1"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="16" font-style="italic" fill="%23cca647">2023 Milestone</text></svg>'
    }
  ];

  // Limit to exactly 4 events for a perfect grid layout matching the mockup design
  const events = (timelineData && timelineData.length > 0 ? timelineData : defaultEvents).slice(0, 4);

  // Music fallbacks for indexing if CMS timeline data is loaded dynamically
  const fallbacks = [
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="14" fill="%23cca647">Milestone Point</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="14" fill="%23cca647">Milestone Point</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="14" fill="%23cca647">Milestone Point</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="%23faf8f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-size="14" fill="%23cca647">Milestone Point</text></svg>'
  ];

  return (
    <section id="timeline" className="relative py-14 bg-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-4 text-left flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold block mb-2">
              THE JOURNEY
            </span>
            <h2 className="font-serif text-3.5xl md:text-4xl font-bold tracking-tight text-charcoal-900 mb-2 leading-tight">
              <ShinyText text="From a Home Filled with Music to a World that Listens" speed={3} />
            </h2>
            
            {/* Hand-drawn double squiggle underliner */}
            <svg className="w-16 h-3 text-gold-500/50 mb-6" viewBox="0 0 100 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2,6 C15,2 25,10 40,6 C55,2 65,10 80,6 C90,4 95,6 98,6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M5,9 C18,5 28,11 41,8 C54,5 64,11 77,8 C87,6 92,8 95,8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.6" />
            </svg>
            
            <p className="text-charcoal-800 text-xs md:text-sm font-light leading-relaxed max-w-sm mb-6">
              Born into a home where music wasn't just heard — it was lived. From the first note I heard to the stages I dream today, every moment has been a part of a beautiful journey.
            </p>
            
            <div>
              <button
                onClick={onActionClick}
                className="px-6 py-3 bg-charcoal-900 hover:bg-gold-500 text-white hover:text-black font-semibold text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 shadow-sm cursor-pointer inline-flex items-center gap-2 group"
              >
                <span>Read My Story</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
              </button>
            </div>
          </div>
          {/* Right Cards Static Grid Column */}
          <div className="lg:col-span-8 mt-6 lg:mt-0">
            
            {/* Desktop View (Visible on lg screens and above) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center w-full relative z-10">
              
              {/* Vertical Timeline List (Left) */}
              <div className="lg:col-span-7 text-left relative pl-8 py-4 w-full">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-charcoal-900/10 dark:bg-white/10" />

                <div className="space-y-6">
                  {events.map((event, index) => {
                    const isActive = activeEventIdx === index;
                    return (
                      <div
                        key={event._id || index}
                        onMouseEnter={() => setActiveEventIdx(index)}
                        onClick={() => setActiveEventIdx(index)}
                        className="relative cursor-pointer group text-left"
                      >
                        {/* Node Dot sitting exactly on the line */}
                        <div
                          className="absolute left-[-22px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-black border border-charcoal-900 dark:border-white/40 flex items-center justify-center transition-all duration-300 group-hover:border-gold-500 group-hover:scale-110"
                          style={{ transform: 'translateX(-50%)' }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gold-500 scale-125' : 'bg-charcoal-900 dark:bg-white/40 group-hover:bg-gold-500'}`} />
                        </div>

                        {/* Title & Description Details */}
                        <div className="flex flex-col">
                          <span className={`font-serif text-2xl md:text-3xl font-extralight tracking-tight transition-colors duration-300 ${isActive ? 'text-gold-500' : 'text-charcoal-400 dark:text-white/30 group-hover:text-charcoal-700 dark:group-hover:text-white/60'}`}>
                            {event.year}
                          </span>
                          <h3 className={`font-sans font-bold text-xs uppercase tracking-wider transition-colors duration-300 mt-0.5 ${isActive ? 'text-gold-500' : 'text-charcoal-900 dark:text-white group-hover:text-gold-500'}`}>
                            {event.title}
                          </h3>
                          <p className={`text-[10.5px] font-light leading-relaxed mt-1 transition-all duration-300 max-w-sm ${isActive ? 'text-charcoal-800 dark:text-gray-300' : 'text-gray-400/80 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}`}>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Single Slide Frame (Right) */}
              <div className="lg:col-span-5 flex justify-center items-center py-4 w-full">
                <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-[#111111] border border-cream-300/40 dark:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all duration-500 hover:scale-[1.02] group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeEventIdx}
                      src={events[activeEventIdx]?.image || events[activeEventIdx]?.coverUrl || fallbacks[activeEventIdx % fallbacks.length]}
                      alt={events[activeEventIdx]?.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.03]"
                    />
                  </AnimatePresence>

                  {/* Year badge overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-[0.2em] text-gold-500 font-bold border border-white/5 z-20">
                    {events[activeEventIdx]?.year}
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile/Tablet View (Visible below lg screens) - Inline Accordion */}
            <div className="lg:hidden relative pl-8 mt-6 w-full z-10">
              {/* Vertical Line */}
              <div className="absolute left-[15px] top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-charcoal-900/10 to-transparent dark:via-white/15 z-0" />
              
              <div className="space-y-6 relative z-10 w-full">
                {events.map((event, index) => {
                  const isActive = activeEventIdx === index;
                  const eventImg = event.image || event.coverUrl || fallbacks[index % fallbacks.length];
                  return (
                    <div key={event._id || index} className="relative mb-5 last:mb-0 text-left w-full">
                      
                      {/* Node Dot on the vertical line */}
                      <button
                        onClick={() => setActiveEventIdx(isActive ? -1 : index)}
                        className="absolute left-[-22px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-black border border-charcoal-900 dark:border-white/40 flex items-center justify-center transition-all duration-300 z-20 cursor-pointer"
                        style={{ transform: 'translateX(-50%)' }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-gold-500 scale-125' : 'bg-charcoal-900 dark:bg-white/40'}`} />
                      </button>

                      {/* Header containing Year and Title */}
                      <div 
                        onClick={() => setActiveEventIdx(isActive ? -1 : index)}
                        className="cursor-pointer select-none font-sans"
                      >
                        <div className="flex items-baseline space-x-2.5">
                          <span className={`font-serif text-2xl font-light transition-colors duration-300 ${isActive ? 'text-gold-500' : 'text-charcoal-400 dark:text-white/30'}`}>
                            {event.year}
                          </span>
                          <span className="text-[10px] tracking-widest text-charcoal-300 dark:text-white/20 uppercase font-bold">
                            &bull;
                          </span>
                          <h3 className={`font-sans font-bold text-xs uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-gold-500' : 'text-charcoal-900 dark:text-white'}`}>
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      {/* Accordion Content Block (reveals inline image + text) */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[500px] opacity-100 mt-3.5' : 'max-h-0 opacity-0 pointer-events-none'}`}
                      >
                        <div className="flex flex-col sm:flex-row gap-5 bg-cream-100/30 dark:bg-[#111111]/40 border border-cream-300/40 dark:border-white/5 p-4 rounded-xl items-center sm:items-start">
                          
                          {/* Sleek borderless image block */}
                          <div className="w-full sm:w-[160px] aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-cream-300/40 dark:border-white/10 shadow-md flex-shrink-0 relative">
                            <img 
                              src={eventImg} 
                              alt={event.title} 
                              className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.03]"
                            />
                            {/* Year badge overlay */}
                            <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider text-gold-500 font-bold border border-white/5">
                              {event.year}
                            </div>
                          </div>

                          {/* Description */}
                          <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

