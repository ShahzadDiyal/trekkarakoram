import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  ChevronRight, Globe, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { WHATSAPP_NUMBER } from '../constants';

import { useAuth } from '../hooks/useAuth';

export const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    tripInterest: 'General Inquiry'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-fill name and email if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        userId: user?.uid || null,
        createdAt: serverTimestamp()
      });
      setSubmitStatus('success');
      // Reset form but keep name/email if logged in
      setFormData({ 
        name: user?.displayName || '', 
        email: user?.email || '', 
        message: '', 
        tripInterest: 'General Inquiry' 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      title: 'Our Headquarters',
      details: 'Satellite Town, Skardu, Gilgit-Baltistan',
      icon: MapPin,
      sub: 'Open Mon-Sat, 9am - 6pm'
    },
    {
      title: 'Direct Support',
      details: '+92 300 0000000',
      icon: Phone,
      sub: 'Emergency support 24/7'
    },
    {
      title: 'Email Us',
      details: 'expeditions@paktrek.com',
      icon: Mail,
      sub: 'Response within 24 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-mountain-950 pt-32 pb-24 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mountain-accent/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-mountain-accent/5 blur-[120px] rounded-full -z-10" />

      <Container className="mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-display font-bold mb-8 text-gradient"
          >
            Get In <span className="italic">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg md:text-xl font-light"
          >
            Whether you're planning a solo trek to K2 or a luxury tour of the Hunza Valley, 
            our expedition consultants are ready to assist you.
          </motion.p>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {contactCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl glass border border-white/5 hover:border-mountain-accent/20 transition-all group"
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-mountain-accent/10 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <card.icon size={24} className="text-mountain-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">{card.title}</p>
                      <p className="text-xl font-bold text-white mb-1">{card.details}</p>
                      <p className="text-sm text-white/50">{card.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/10">
              <MessageSquare size={32} className="text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-emerald-500">Live Chat on WhatsApp</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Connect instantly with our team for quick questions about itinerary, safety, or gear requirements.
              </p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-2xl font-bold">
                  Start WhatsApp Chat
                </Button>
              </a>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 lg:p-12 rounded-[2.5rem] glass border border-white/10 cinematic-shadow relative overflow-hidden"
            >
              <h2 className="text-3xl font-display font-bold mb-10">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">What's capture your interest?</label>
                  <select 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all appearance-none cursor-pointer"
                    value={formData.tripInterest}
                    onChange={(e) => setFormData({...formData, tripInterest: e.target.value})}
                  >
                    <option value="General Inquiry" className="bg-mountain-900">General Inquiry</option>
                    <option value="K2 Base Camp" className="bg-mountain-900">K2 Base Camp Expedition</option>
                    <option value="Hunza Valley" className="bg-mountain-900">Hunza & Skardu Tour</option>
                    <option value="Fairy Meadows" className="bg-mountain-900">Nanga Parbat Trek</option>
                    <option value="Custom Group Tour" className="bg-mountain-900">Custom Group Tour</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Message</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="How can we help you plan your journey?"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <Button 
                  disabled={isSubmitting}
                  className="w-full py-8 rounded-2xl font-bold text-lg group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? 'Sending Journey Details...' : 'Send Message'}
                    {!isSubmitting && <Send size={20} className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                </Button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center space-x-3 text-emerald-500"
                    >
                      <CheckCircle2 size={18} />
                      <span className="text-sm font-bold">Message sent! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-3 text-red-500"
                    >
                      <AlertCircle size={18} />
                      <span className="text-sm font-bold">Failed to send message. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Map Section */}
      <Container className="mt-32">
        <div className="rounded-[3rem] overflow-hidden h-[500px] border border-white/5 relative glass group">
          <div className="absolute inset-0 bg-white/[0.02] flex items-center justify-center">
             <div className="text-center group-hover:scale-105 transition-transform duration-700">
               <Globe size={64} className="text-mountain-accent/20 mx-auto mb-6" />
               <p className="text-white/40 uppercase tracking-widest font-bold">Interactive Explorer Map Coming Soon</p>
               <p className="text-xs text-white/20 mt-2">Serving adventure from the heart of the Karakoram</p>
             </div>
          </div>
          {/* Iframe fallback for a real map look */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104514.88788487739!2d75.56837881023778!3d35.31133342371911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e4630303ced427%3A0x6e2544284b3f8864!2sSkardu!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="opacity-40"
          />
        </div>
      </Container>
    </div>
  );
};
