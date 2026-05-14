import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Search, Filter, MapPin, Wind, Calendar, ChevronRight } from 'lucide-react';
import { destinations } from '../data/destinations';
import { Link } from 'react-router-dom';

export const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [activeSeason, setActiveSeason] = useState<string | null>(null);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           dest.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = !activeDifficulty || dest.difficulty === activeDifficulty;
      const matchesSeason = !activeSeason || dest.season === activeSeason;
      
      return matchesSearch && matchesDifficulty && matchesSeason;
    });
  }, [searchQuery, activeDifficulty, activeSeason]);

  const difficulties = ['Easy', 'Moderate', 'Hard', 'Extreme'];
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-mountain-950">
      {/* Hero Section */}
      <Container className="mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-bold mb-8 text-gradient"
          >
            Choose Your <br />
            <span className="italic">Frontier</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl font-light mb-12"
          >
            From the emerald valleys of Swat to the granite cathedrals of the Baltoro, 
            discover the diverse landscapes of Northern Pakistan.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/40 group-focus-within:text-mountain-accent transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search by region or name..." 
              className="w-full bg-white/[0.03] border border-white/10 rounded-full py-5 pl-16 pr-8 text-white focus:outline-none focus:border-mountain-accent/50 focus:bg-white/[0.05] transition-all backdrop-blur-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </Container>

      {/* Filters */}
      <Container className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-y border-white/5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold flex items-center">
              <Filter size={14} className="mr-2" /> Difficulty:
            </span>
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeDifficulty === diff 
                  ? 'bg-mountain-accent text-mountain-950' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold flex items-center">
              <Calendar size={14} className="mr-2" /> Season:
            </span>
            {seasons.map(s => (
              <button
                key={s}
                onClick={() => setActiveSeason(activeSeason === s ? null : s)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeSeason === s 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Grid */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden cinematic-shadow cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-950 via-mountain-950/20 to-transparent z-10" />
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
                  
                  <h3 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-mountain-accent transition-colors">
                    {dest.name}
                  </h3>
                  
                  <p className="text-white/50 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {dest.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {dest.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white/80 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to={`/treks/${dest.name.toLowerCase().replace(/\s+/g, '-')}`} className="w-full">
                    <Button variant="outline" className="w-full rounded-2xl border-white/10 group/btn">
                      Explore Expeditions
                      <ChevronRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-32">
            <Wind size={48} className="text-white/10 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white/40">No journeys found matching your search.</h3>
            <Button variant="ghost" onClick={() => {setSearchQuery(''); setActiveDifficulty(null); setActiveSeason(null);}} className="mt-4 text-mountain-accent">
              Clear all filters
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};
