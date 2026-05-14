import { motion } from 'framer-motion';
import { Container } from '../layout/Container';

const images = [
  "https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1589308454676-474020a59e19?auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1627443195230-e5959145625c?auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1549413248-15a995726715?auto=format&fit=crop&q=80&w=1470",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1470"
];

export const Gallery = () => {
  return (
    <section className="py-24 md:py-32 bg-mountain-900/50">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-mountain-accent font-semibold uppercase tracking-widest text-xs mb-4 block">Through The Lens</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold">Unfiltered <br /> Majesty</h2>
          </div>
          <p className="text-white/40 max-w-sm mb-2">Each frame is a moment of pure connection with the landscape.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`relative overflow-hidden group rounded-2xl md:rounded-[2rem] cinematic-shadow ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              } ${index === 3 ? 'col-span-2' : ''}`}
            >
              <img 
                src={src} 
                alt="Adventure" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-mountain-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
