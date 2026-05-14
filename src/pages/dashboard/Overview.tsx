import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { 
  Compass, Heart, MessageSquare, Tent, 
  ChevronRight, ArrowUpRight, Loader2, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    favorites: 0,
    inquiries: 0,
    completed: 0
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOverviewData = async () => {
      try {
        const [favsSnap, inqSnap] = await Promise.all([
          getDocs(query(collection(db, 'favoriteTreks'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'inquiries'), where('userId', '==', user.uid)))
        ]);

        const recentInqQuery = query(
          collection(db, 'inquiries'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const recentSnap = await getDocs(recentInqQuery);

        setStats({
          favorites: favsSnap.size,
          inquiries: inqSnap.size,
          completed: 0 // Mock for future feature
        });
        setRecentInquiries(recentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="text-mountain-accent animate-spin" size={48} />
      </div>
    );
  }

  const statCards = [
    { label: 'Favorites', value: stats.favorites, icon: Heart, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Inquiries', value: stats.inquiries, icon: MessageSquare, color: 'text-mountain-accent', bg: 'bg-mountain-accent/10' },
    { label: 'Achievements', value: 0, icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Welcome back, <span className="text-mountain-accent">{user?.displayName?.split(' ')[0]}</span>.</h1>
        <p className="text-white/40">Your next adventure in the Karakorams is waiting.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-[2.5rem] glass border border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700`} />
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-4xl font-display font-bold text-white mb-1 tracking-tight">{stat.value}</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recent Inquiries</h2>
            <Link to="/dashboard/inquiries" className="text-sm font-bold text-mountain-accent hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {recentInquiries.length === 0 ? (
              <div className="p-12 text-center glass border border-white/5 rounded-[2.5rem]">
                <Tent className="text-white/10 mx-auto mb-4" size={48} />
                <p className="text-white/40">You haven't made any inquiries yet.</p>
                <Link to="/destinations">
                  <button className="mt-4 text-mountain-accent font-bold">Start Exploring</button>
                </Link>
              </div>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="p-6 rounded-3xl glass border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Compass size={24} className="text-white/20" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{inq.trekTitle}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-white/40">{new Date(inq.createdAt?.toDate()).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      inq.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                      inq.status === 'contacted' ? 'bg-blue-500/10 text-blue-500' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {inq.status}
                    </span>
                    <Link to={`/treks/${inq.trekId}`} className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 transition-colors">
                      <ArrowUpRight size={18} className="text-white/40 group-hover:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Promo Card */}
        <div className="lg:col-span-4">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-mountain-accent/20 to-transparent border border-white/5 relative overflow-hidden h-full">
            <Mountain className="text-mountain-accent mb-8" size={48} />
            <h3 className="text-2xl font-bold mb-4">Elite Membership</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              Unlock priority booking, customized itineraries, and exclusive access to the Gondogoro La weather stations.
            </p>
            <button className="w-full py-4 rounded-xl bg-mountain-accent text-mountain-950 font-bold hover:scale-[1.02] transition-transform">
              Review Benefits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
