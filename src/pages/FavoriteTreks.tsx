import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { Heart, Trash2, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const FavoriteTreks = () => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const q = query(collection(db, 'favoriteTreks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const favs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavorites(favs);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, authLoading, navigate]);

  const removeFavorite = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'favoriteTreks', id));
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-mountain-950 flex items-center justify-center">
        <Loader2 className="text-mountain-accent animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mountain-950 pt-32 pb-24">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">My <span className="italic text-mountain-accent">Favorites</span></h1>
          <p className="text-white/40">The summits you've set your sights on.</p>
        </div>

        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass rounded-[3rem] border border-white/5"
          >
            <Heart size={64} className="text-white/10 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">No favorites yet</h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">Explore our expeditions and heart the ones that call to you.</p>
            <Link to="/destinations">
              <Button className="px-8 py-4 rounded-full">Browse Destinations</Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((fav, idx) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cinematic-shadow border border-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-950 via-mountain-950/20 to-transparent z-10" />
                <img 
                  src={fav.trekImage || 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1470'} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={fav.trekTitle}
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-6 right-6 z-20">
                  <button 
                    onClick={() => removeFavorite(fav.id)}
                    className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2">{fav.trekTitle}</h3>
                  <Link to={`/treks/${fav.trekId}`}>
                    <Button variant="outline" className="w-full py-4 rounded-xl border-white/10 text-white hover:bg-mountain-accent hover:border-mountain-accent transition-all">
                      View details <ChevronRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
