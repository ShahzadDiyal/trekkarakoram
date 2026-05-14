import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { ChevronRight, Play, MapPin, Wind, Mountain } from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const floatingCards = [
    { icon: <MapPin className="text-mountain-accent" size={18} />, label: "K2 Basecamp", value: "8,611m" },
    { icon: <Wind className="text-mountain-accent" size={18} />, label: "Wind Speed", value: "12km/h" },
    { icon: <Mountain className="text-mountain-accent" size={18} />, label: "Next Expedition", value: "June 2026" },
  ];

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-mountain-950/40 via-mountain-950/60 to-mountain-950 z-10" />
        <motion.div style={{ y: y1 }} className="h-full w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-110"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-mountains-range-under-blue-sky-4680-large.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      <Container className="relative z-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mountain-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mountain-accent"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/80">
                Bookings Open for Summer 2026
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8 text-gradient max-w-5xl"
          >
            Explore The <span className="italic font-serif font-light text-white">Untouched</span> <br />
            Beauty of Pakistan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed"
          >
            Luxury trekking adventures in Skardu, Hunza, Karakoram & beyond. 
            Experience the world's highest peaks with premium hospitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto group cinematic-shadow">
              Explore Treks
              <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto group bg-white/5 backdrop-blur-sm">
              <Play size={18} className="mr-2 fill-white group-hover:scale-110 transition-transform" />
              Watch Documentary
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Floating Glassmorphism Cards */}
      <div className="hidden lg:block absolute inset-0 z-15 pointer-events-none">
        {floatingCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
            className={`absolute glass p-4 rounded-2xl border border-white/10 backdrop-blur-xl cinematic-shadow pointer-events-auto hover:translate-y-[-5px] transition-transform cursor-pointer ${
              index === 0 ? 'top-[25%] left-[10%]' : 
              index === 1 ? 'top-[60%] right-[12%]' : 
              'bottom-[15%] left-[15%]'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-tighter text-white/40 leading-none mb-1">{card.label}</p>
                <p className="text-sm font-bold text-white">{card.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-[10px] uppercase tracking-widest mb-4 text-white/60">The Journey Begins Below</span>
        <div className="relative w-6 h-10 rounded-full border-2 border-white/20">
          <motion.div
            animate={{ 
              y: [0, 12, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-mountain-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};
