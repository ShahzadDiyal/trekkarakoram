import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { 
  Clock, MapPin, Wind, Star, Check, HelpCircle, 
  ChevronRight, ArrowLeft, Calendar, User, Mountain, 
  MessageSquare, Shield, Activity, Loader2
} from 'lucide-react';
import { treks } from '../data/treks';
import { WHATSAPP_NUMBER } from '../constants';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const TrekDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isInquiring, setIsInquiring] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const trek = treks.find(t => t.slug === slug) || treks[0];
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const handleInquiry = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsInquiring(true);
    try {
      await addDoc(collection(db, 'inquiries'), {
        userId: user.uid,
        trekId: trek.slug,
        trekTitle: trek.title,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setInquirySent(true);
    } catch (error) {
      console.error('Error sending inquiry:', error);
    } finally {
      setIsInquiring(false);
    }
  };
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.2]);

  return (
    <div className="min-h-screen bg-mountain-950 pb-24 overflow-x-hidden" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-mountain-950/20 via-mountain-950/40 to-mountain-950 z-10" />
          <img 
            src={trek.image} 
            alt={trek.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <Container className="relative z-20 mt-20">
          <Link to="/destinations" className="inline-flex items-center text-white/60 hover:text-mountain-accent mb-8 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Back to Destinations
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 text-mountain-accent font-bold uppercase tracking-widest text-xs mb-4">
              <span className="px-3 py-1 rounded-full glass border border-mountain-accent/20">
                {trek.difficulty} Expedition
              </span>
              <span>•</span>
              <span>{trek.season} 2026</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight text-white mb-8 max-w-5xl">
              {trek.title}
            </h1>
          </motion.div>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Overview */}
            <section className="mb-20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-[2rem] glass border border-white/5 mb-16">
                {trek.stats.map(stat => (
                  <div key={stat.label}>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              <h2 className="text-3xl font-display font-bold mb-6">The Journey Overview</h2>
              <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
                {trek.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {trek.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-mountain-accent/10 flex items-center justify-center flex-shrink-0">
                      <Star size={16} className="text-mountain-accent" />
                    </div>
                    <p className="text-white/80 font-medium text-sm leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="mb-20">
              <h2 className="text-3xl font-display font-bold mb-10">Itinerary Timeline</h2>
              <div className="space-y-12 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {trek.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-mountain-950 border-2 border-mountain-accent flex items-center justify-center z-10 font-display font-bold text-xs">
                      {item.day}
                    </div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section className="mb-20">
               <h2 className="text-3xl font-display font-bold mb-10">What's Included</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {trek.included.map((item, idx) => (
                   <div key={idx} className="flex items-center space-x-3 text-white/70">
                     <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                       <Check size={14} className="text-emerald-500" />
                     </div>
                     <span className="text-sm">{item}</span>
                   </div>
                 ))}
               </div>
            </section>

            {/* FAQ */}
            <section className="mb-20">
              <h2 className="text-3xl font-display font-bold mb-10">Frequent Questions</h2>
              <div className="space-y-4">
                {trek.faqs.map((faq, idx) => (
                  <details key={idx} className="group glass rounded-2xl border border-white/5 overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <div className="flex items-center space-x-4">
                        <HelpCircle size={20} className="text-mountain-accent" />
                        <span className="font-bold text-white/90">{faq.question}</span>
                      </div>
                      <ChevronRight size={20} className="transition-transform group-open:rotate-90 text-white/40" />
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-white/60 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="mb-20">
              <h2 className="text-3xl font-display font-bold mb-10">Guest Reviews</h2>
              <div className="space-y-6">
                {trek.reviews.map(review => (
                  <div key={review.id} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-mountain-accent">
                          {review.author[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white">{review.author}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(review.rating) ? "#CBA36D" : "none"} className={i < Math.floor(review.rating) ? "text-mountain-accent" : "text-white/10"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/70 italic font-light leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="glass p-8 rounded-[2.5rem] border border-white/10 cinematic-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mountain-accent/10 blur-[60px] -z-10" />
                
                <div className="mb-8">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 leading-none">Starting from</p>
                  <div className="flex items-end space-x-2">
                    <span className="text-5xl font-bold text-white tracking-tighter">${trek.price}</span>
                    <span className="text-white/40 text-sm mb-1.5 italic">/ per person</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.05] border border-white/5">
                    <div className="flex items-center space-x-3">
                      <Calendar size={18} className="text-mountain-accent" />
                      <span className="text-sm font-bold">Next Date</span>
                    </div>
                    <span className="text-sm text-white/60">June 15, 2026</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.05] border border-white/5">
                    <div className="flex items-center space-x-3">
                      <User size={18} className="text-mountain-accent" />
                      <span className="text-sm font-bold">Availability</span>
                    </div>
                    <span className="text-sm text-mountain-accent">4 Seats Left</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    disabled={isInquiring || inquirySent}
                    onClick={handleInquiry}
                    className={`w-full py-6 rounded-2xl font-bold shadow-xl ${inquirySent ? 'bg-emerald-500 hover:bg-emerald-600' : 'shadow-mountain-accent/20'}`}
                  >
                    {isInquiring ? <Loader2 className="animate-spin mr-2" /> : null}
                    {inquirySent ? 'Inquiry Sent!' : 'Reserve My Spot'}
                  </Button>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I am interested in the ${trek.title} expedition.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full py-6 rounded-2xl border-emerald-500/20 hover:bg-emerald-500/5 group">
                      <MessageSquare size={18} className="mr-2 text-emerald-500 group-hover:scale-110 transition-transform" />
                      WhatsApp Consultant
                    </Button>
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex items-center space-x-3 text-white/40">
                    <Shield size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Guaranteed Safety Gear</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/40">
                    <Activity size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">24/7 Medical Support</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/40">
                    <Mountain size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Liaison Officer Included</span>
                  </div>
                </div>
              </div>

              {/* Promo Card below sidebar */}
              <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-mountain-accent/20 to-transparent border border-white/5">
                <p className="text-xs font-bold text-mountain-accent mb-2 tracking-widest uppercase">Groups & Private</p>
                <h4 className="text-lg font-bold mb-4">Planning for a group?</h4>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">Get special discounts and customized itineraries for groups of 6 or more.</p>
                <Button variant="ghost" className="text-mountain-accent p-0 hover:translate-x-2 transition-transform">
                  Request Private Tour <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
