import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Loader2, MessageSquare, Calendar, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Inquiries = () => {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchInquiries = async () => {
      try {
        const q = query(
          collection(db, 'inquiries'), 
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setInquiries(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [user]);

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
        <h1 className="text-4xl font-display font-bold text-white mb-2">My <span className="text-mountain-accent italic">Inquiries</span></h1>
        <p className="text-white/40">Track your conversations and bookings.</p>
      </header>

      {inquiries.length === 0 ? (
        <div className="text-center py-32 glass border border-white/5 rounded-[3rem]">
          <MessageSquare size={48} className="text-white/10 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white/40 mb-8">No active inquiries.</h3>
          <Link to="/destinations">
            <button className="px-8 py-4 bg-mountain-accent text-mountain-950 font-bold rounded-full">Explore Expeditions</button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inq, idx) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 rounded-[2rem] glass border border-white/5 group hover:border-mountain-accent/20 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-start md:items-center space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                    <Calendar size={28} className="text-mountain-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{inq.trekTitle}</h3>
                    <div className="flex items-center space-x-4 text-white/30 text-xs">
                       <span className="flex items-center">
                         <Clock size={12} className="mr-1.5" />
                         Submitted {new Date(inq.createdAt?.toDate()).toLocaleDateString()}
                       </span>
                       <span>•</span>
                       <span>ID: {inq.id.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/30 mb-2">Current Status</p>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      inq.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                      inq.status === 'contacted' ? 'bg-blue-500/10 text-blue-500' :
                      inq.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <Link to={`/treks/${inq.trekId}`}>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-mountain-accent group-hover:text-mountain-950 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
