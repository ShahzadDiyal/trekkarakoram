import { MainLayout } from './components/layout/MainLayout';
import { Container } from './components/layout/Container';
import { Button } from './components/ui/Button';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export default function App() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-mountain-950/20 via-mountain-950/60 to-mountain-950 z-10" />
          <img
            src="https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=2670"
            alt="Karakoram Mountains"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        <Container className="relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-widest uppercase mb-6 text-mountain-accent">
              The Crown of the World
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight mb-8 text-gradient">
              EXPLORE THE <br />
              <span className="italic">MAJESTIC NORTH</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-10 font-light leading-relaxed">
              Curating high-altitude expeditions and luxury trekking adventures in the heart of Pakistan's Karakoram and Himalayan ranges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" className="group">
                Start Your Journey
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                View Expeditions
              </Button>
            </div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-widest mb-2 opacity-50">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-mountain-accent to-transparent" />
        </motion.div>
      </section>

      {/* Intro Section - Just for verification */}
      <section className="py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-mountain-accent font-semibold uppercase tracking-widest text-sm mb-4 block">A Legacy of Adventure</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight text-gradient">
                Where Luxury Meets <br />
                The Wild.
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed text-lg">
                We specialize in private, bespoke expeditions that prioritize comfort without compromising the raw, untamed spirit of exploration. Discover the hidden gems of Skardu, Hunza, and beyond with world-class guides and premium logistics.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">15+</h4>
                  <p className="text-white/40 text-sm">Expert Guides</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">500+</h4>
                  <p className="text-white/40 text-sm">Summits Braved</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden cinematic-shadow group"
            >
              <img 
                src="https://images.unsplash.com/photo-1549413248-15a995726715?auto=format&fit=crop&q=80&w=1587" 
                alt="Mountaineer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mountain-950 via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
