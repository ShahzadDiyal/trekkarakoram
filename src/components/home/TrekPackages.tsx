import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Clock, User, ArrowUpRight, Star } from 'lucide-react';

const treks = [
  {
    title: "K2 Base Camp & Gondogoro La",
    duration: "21 Days",
    difficulty: "Challenging",
    price: "$4,800",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=1470"
  },
  {
    title: "Nanga Parbat Base Camp",
    duration: "10 Days",
    difficulty: "Moderate",
    price: "$2,200",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    title: "Karakoram Highway Luxury Tour",
    duration: "14 Days",
    difficulty: "Easy",
    price: "$3,500",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1589308454676-474020a59e19?auto=format&fit=crop&q=80&w=1470"
  }
];

export const TrekPackages = () => {
  return (
    <section className="py-24 md:py-32 bg-mountain-900/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mountain-accent font-semibold uppercase tracking-widest text-xs mb-4 block"
          >
            Adventure Awaits
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Popular Trek Packages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl font-light"
          >
            From the legendary K2 to the soul-stirring Nanga Parbat, choose your path to the sky.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treks.map((trek, index) => (
            <motion.div
              key={trek.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="group glass p-4 rounded-[2rem] border border-white/5 hover:border-mountain-accent/30 transition-all duration-500 hover:translate-y-[-10px] bg-white/[0.02]"
            >
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={trek.image} 
                  alt={trek.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-mountain-950/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1 border border-white/10">
                  <Star fill="#CBA36D" className="text-mountain-accent" size={12} />
                  <span className="text-xs font-bold text-white">{trek.rating}</span>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center space-x-4 mb-4 text-xs text-white/40 uppercase tracking-widest font-semibold">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5 text-mountain-accent" />
                    {trek.duration}
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-1.5 text-mountain-accent" />
                    {trek.difficulty}
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-6 leading-tight group-hover:text-mountain-accent transition-colors">
                  {trek.title}
                </h3>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] uppercase tracking-tighter text-white/40 leading-none mb-1">Starting from</span>
                    <span className="text-2xl font-bold text-white tracking-tight">{trek.price}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="round-full w-12 h-12 p-0 bg-white/5 hover:bg-mountain-accent hover:text-mountain-950 transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="px-12 py-6 rounded-full border-white/10 hover:border-mountain-accent text-white/80">
            Discover All Expeditions
          </Button>
        </div>
      </Container>
    </section>
  );
};
