import { Instagram, Facebook, Twitter, Mail, Send, MapPin, Phone } from 'lucide-react';
import { Container } from './Container';
import { NAV_LINKS, WHATSAPP_NUMBER } from '../../constants';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const instagramImages = [
    'https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1549413248-15a995726715?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1570116694305-6f3458cd2bc7?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1533221319206-8ae1eaecf4b1?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1532009230628-98442e3fb242?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=300',
  ];

  return (
    <footer className="pt-24 pb-12 bg-mountain-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mountain-accent/5 rounded-full blur-[120px] -z-10" />
      
      <Container>
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 pb-24 border-b border-white/5">
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">Join the Expedition</h3>
            <p className="text-white/50 max-w-md">Get exclusive updates on new trekking routes, early bird expedition discounts, and mountain guides.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-mountain-accent transition-colors"
              />
            </div>
            <Button className="whitespace-nowrap px-10">
              Subscribe <Send size={18} className="ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link to="/" className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-tighter">
                PAKISTAN <span className="text-mountain-accent">TREK</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/30">ADVENTURES</span>
            </Link>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-white/50 group cursor-pointer hover:text-white transition-colors">
                <MapPin size={18} className="text-mountain-accent mt-1 shrink-0" />
                <span className="text-sm">Main Silk Route, Hunza Valley, <br />Gilgit-Baltistan, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3 text-white/50 group cursor-pointer hover:text-white transition-colors">
                <Phone size={18} className="text-mountain-accent shrink-0" />
                <span className="text-sm">+{WHATSAPP_NUMBER}</span>
              </div>
              <div className="flex items-center space-x-3 text-white/50 group cursor-pointer hover:text-white transition-colors">
                <Mail size={18} className="text-mountain-accent shrink-0" />
                <span className="text-sm">expeditions@paktrek.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-8 uppercase text-xs tracking-[0.3em]">Quick Navigation</h4>
            <ul className="grid grid-cols-1 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-white/40 hover:text-mountain-accent hover:translate-x-1 inline-block transition-all text-sm font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-8 uppercase text-xs tracking-[0.3em]">Instagram Gallery</h4>
            <div className="grid grid-cols-3 gap-2">
              {instagramImages.map((src, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-lg overflow-hidden bg-white/5"
                >
                  <img src={src} alt="Gallery" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-8 uppercase text-xs tracking-[0.3em]">Connect With Us</h4>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">Stay updated with our latest summits and cultural journeys through the Karakoram.</p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-mountain-accent hover:text-white transition-all duration-500 hover:-translate-y-1"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/20 text-[10px] uppercase tracking-widest font-semibold">
          <p>© {new Date().getFullYear()} Pakistan Trekking Adventures. Crafted for the mountains.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Architecture</a>
            <a href="#" className="hover:text-white transition-colors">Booking Protocols</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
