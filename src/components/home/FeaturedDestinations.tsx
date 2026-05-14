import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const destinations = [
  {
    name: "Skardu",
    region: "Gilgit-Baltistan",
    image: "https://images.unsplash.com/photo-1549413248-15a995726715?auto=format&fit=crop&q=80&w=2670",
    depth: "Gateway to 4 of Earth's 14 absolute peaks above 8,000m.",
    color: "from-blue-500/20",
    slug: "skardu"
  },
  {
    name: "Hunza Valley",
    region: "Karakoram",
    image: "https://images.unsplash.com/photo-1589308454676-474020a59e19?auto=format&fit=crop&q=80&w=2672",
    depth: "A place of timeless culture and high-altitude luxury.",
    color: "from-orange-500/20",
    slug: "hunza-valley"
  },
  {
    name: "Deosai Plains",
    region: "Himalayas",
    image: "https://images.unsplash.com/photo-1627443195230-e5959145625c?auto=format&fit=crop&q=80&w=2574",
    depth: "The roof of the world. A silent, expansive alpine plateau.",
    color: "from-emerald-500/20",
    slug: "deosai-plains"
  }
];

export const FeaturedDestinations = () => {
  return (
    <section className="py-24 md:py-32 bg-mountain-950 overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-mountain-accent font-semibold uppercase tracking-widest text-xs mb-4 block"
            >
              Curated Experience
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
            >
              Majestic Regions <br />
              <span className="text-white/40">Waiting To Be Discovered</span>
            </motion.h2 >
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start md:items-end"
          >
            <p className="text-white/50 max-w-sm mb-6 md:text-right">
              We've hand-selected the most breathtaking locations in Northern Pakistan for an unparalleled adventure.
            </p>
            <Link to="/destinations">
              <Button variant="outline" className="rounded-full px-8 border-white/10 text-white/60 hover:text-white">
                View All Destinations
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <Link to={`/treks/${dest.slug}`} key={dest.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-t from-mountain-950 via-mountain-950/20 to-transparent z-10`} />
                <div className={`absolute inset-0 bg-gradient-to-tr ${dest.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10`} />
                
                <img 
                  src={dest.image} 
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <div className="flex items-center space-x-2 text-white/60 mb-2">
                    <MapPin size={14} className="text-mountain-accent" />
                    <span className="text-[10px] uppercase tracking-widest">{dest.region}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-mountain-accent transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {dest.depth}
                  </p>
                  <div className="flex items-center text-white/80 font-semibold text-sm group-hover:text-white transition-colors">
                    <span>Explore Region</span>
                    <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
