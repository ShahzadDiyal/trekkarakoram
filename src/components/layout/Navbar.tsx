import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { Container } from './Container';
import { NAV_LINKS, WHATSAPP_NUMBER } from '../../constants';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'py-3 glass border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link 
          to="/" 
          className="group flex items-center space-x-3"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-mountain-accent rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tighter leading-none">
                PAKISTAN <span className="text-mountain-accent">TREK</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/40 mt-1">ADVENTURES</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all relative group ${
                  location.pathname === link.href ? 'text-mountain-accent' : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                <motion.span 
                  className={`absolute inset-0 bg-white/5 rounded-lg transition-transform ${
                    location.pathname === link.href ? 'scale-100' : 'scale-0 group-hover:scale-100'
                  }`}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors"
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-3 bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-mountain-accent hover:text-white transition-all duration-500 shadow-xl shadow-white/5"
          >
            <Phone size={16} className="group-hover:rotate-12 transition-transform" />
            <span>BOOK EXPEDITION</span>
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
           <button 
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 flex items-center justify-center rounded-full glass"
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full glass text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-4 right-4 mt-4 glass border border-white/10 rounded-3xl overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block text-2xl font-display font-medium transition-colors ${
                    location.pathname === link.href ? 'text-mountain-accent' : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="w-full flex items-center justify-center space-x-3 bg-mountain-accent text-white py-5 rounded-2xl font-bold text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone size={20} />
                <span>WHATSAPP BOOKING</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
