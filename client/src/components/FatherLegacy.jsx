import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';
import { ArrowRight } from 'lucide-react';

export default function FatherLegacy({ onStoryClick, onImageClick, content }) {
  const c = content || {};
  
  const titleLines = (c.title || "Before I found my voice,\nI heard his.").split('\n');

  return (
    <section className="relative py-14 bg-[#111a2e] overflow-hidden text-white border-t border-white/5">
      
      {/* Background radial glow */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Overlapping Collage aligned to reference */}
          <div className="lg:col-span-6 relative flex items-center justify-start min-h-[380px] md:min-h-[440px]">
            
            {/* Background frame (Older Saji Ram writing) */}
            <div className="relative w-[72%] aspect-[1.2/1] bg-[#111a2e] border border-white/10 p-2.5 shadow-2xl rounded z-10">
              <div className="w-full h-full overflow-hidden bg-black rounded">
                 <img
                  src={c.mainImage || "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"400\" viewBox=\"0 0 600 400\"><rect width=\"100%\" height=\"100%\" fill=\"%23111a2e\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"serif\" font-size=\"20\" fill=\"%23cca647\">SAJI RAM COMPOSITIONS</text></svg>"}
                  alt="Saji Ram composing at desk"
                  className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.88] opacity-90"
                />
              </div>
            </div>

            {/* Foreground Modern Portrait Card (Young Saji Ram portrait - overlapping top right) */}
            <div
              style={{ transform: 'rotate(2deg)' }}
              className="absolute top-4 right-10 w-[38%] aspect-[3/4] rounded-xl overflow-hidden bg-[#0b111e]/90 border border-white/10 hover:border-gold-500/40 shadow-[0_20px_45px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(204,166,71,0.2)] hover:scale-[1.02] transition-all duration-500 ease-out z-20 group cursor-zoom-in"
              onClick={() => onImageClick && onImageClick(c.polaroidImage || "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"800\" viewBox=\"0 0 600 800\"><rect width=\"100%\" height=\"100%\" fill=\"%23111a2e\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"serif\" font-size=\"24\" fill=\"%23cca647\">Saji Ram</text></svg>")}
            >
              <img
                src={c.polaroidImage || "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"800\" viewBox=\"0 0 600 800\"><rect width=\"100%\" height=\"100%\" fill=\"%23111a2e\"/><text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"serif\" font-size=\"24\" fill=\"%23cca647\">Saji Ram</text></svg>"}
                alt="Saji Ram portrait"
                className="w-full h-full object-cover filter sepia-[0.1] brightness-[0.93] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Sleek bottom gold text overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0b111e]/90 via-[#0b111e]/50 to-transparent pt-6 pb-3 px-3 text-center">
                <span className="font-serif text-[9px] text-gold-400 font-extrabold uppercase tracking-widest block opacity-95 group-hover:text-gold-300 transition-colors duration-300">
                  {c.polaroidCaption || 'Saji Ram'}
                </span>
              </div>
            </div>

            {/* Cursive Signature text at the bottom right */}
            <div className="absolute bottom-6 right-20 z-30 transform -rotate-6 font-script text-3.5xl text-white/95 select-none drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
              {c.cursiveText || 'A legacy that lives on'}
            </div>

          </div>

          {/* Right Column: Narrative tribute */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            
            <div className="flex flex-col items-start mb-4">
              <span className="text-[10px] uppercase tracking-[0.38em] text-gold-400 font-bold block mb-1">
                {c.subtitle || "MY FATHER'S LEGACY"}
              </span>
              <h2 className="font-serif text-3.5xl md:text-4xl font-bold tracking-tight mb-2 leading-tight text-white mt-1">
                {titleLines.map((line, i) => (
                  <React.Fragment key={i}>
                    <ShinyText text={line} color="#ffffff" shineColor="#e7d7a2" speed={3} />
                    {i < titleLines.length - 1 && <><br /></>}
                  </React.Fragment>
                ))}
              </h2>
              {/* Squiggle or thin divider */}
              <div className="h-[1px] w-10 bg-gold-500/40 mt-1 mb-3"></div>
            </div>

            <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
              {c.paragraph1 || "My father, Saji Ram, was a celebrated music director whose melodies touched countless hearts. He was the creative force behind the famous track from Kireedam, a song that still carries his signature, his soul, and his timeless musical instinct."}
            </p>
            
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
              {c.paragraph2 || "Walking through recording sessions alongside him taught me the mechanics of composition and the honor of being a musician. His legacy is the foundation upon which I explore new musical frontiers."}
            </p>

            <div className="relative z-10">
              <button
                onClick={onStoryClick}
                className="group relative text-gold-400 hover:text-gold-300 font-semibold text-[10px] uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 cursor-pointer pb-1.5"
              >
                <span>Read His Story</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500/60 group-hover:bg-gold-500 transition-colors duration-300"></span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative Golden Audio Waveform Graph in bottom-right corner to match reference */}
      <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none z-0 flex items-end space-x-1.5 px-6 pb-2.5">
        {[15, 28, 20, 35, 48, 55, 72, 60, 45, 38, 52, 68, 80, 92, 98, 85, 70, 52, 40, 25, 18, 32, 45, 58, 72, 85, 68, 50, 32, 18].map((h, i) => (
          <div 
            key={i} 
            className="w-[1.5px] bg-gold-500 rounded-t-sm"
            style={{ 
              height: `${h * 0.72}px`, 
              opacity: 0.15 + (i % 4) * 0.15 
            }}
          />
        ))}
      </div>

    </section>
  );
}
