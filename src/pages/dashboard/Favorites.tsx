import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Heart, Trash2, ChevronRight, Loader2, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const q = query(collection(db, 'favoriteTreks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        setFavorites(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'favoriteTreks', id));
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="text-mountain-accent animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-display font-bold text-white mb-2">My <span className="text-mountain-accent italic">Favorites</span></h1>
        <p className="text-white/40">Expeditions that captured your soul.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="text-center py-32 glass border border-white/5 rounded-[3rem]">
          <Wind size={48} className="text-white/10 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white/40 mb-8">No favorited expeditions yet.</h3>
          <Link to="/destinations">
            <Button className="px-8 py-4 rounded-full">Explore Destinations</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {favorites.map((fav, idx) => (
              <motion.div
                layout
                key={fav.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cinematic-shadow border border-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-950 via-mountain-950/20 to-transparent z-10" />
                <img 
                  src={fav.trekImage} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={fav.trekTitle}
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-6 right-6 z-20">
                  <button 
                    onClick={() => removeFavorite(fav.id)}
                    className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 transition-all hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-mountain-accent transition-colors">{fav.trekTitle}</h3>
                  <Link to={`/treks/${fav.trekId}`}>
                    <Button variant="outline" className="w-full rounded-2xl border-white/10 hover:border-mountain-accent">
                      Details <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
