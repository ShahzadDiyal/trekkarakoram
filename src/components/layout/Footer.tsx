import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { Container } from './Container';
import { NAV_LINKS } from '../../constants';

export const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-mountain-900 border-t border-white/5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="flex items-center space-x-2 mb-6">
              <span className="font-display font-bold text-xl">
                PAKISTAN <span className="text-mountain-accent">TREK</span>
              </span>
            </a>
            <p className="text-white/50 text-sm leading-relaxed">
              Curating luxury trekking experiences across the crown of the world. From K2 base camp to the hidden valleys of Hunza.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase text-sm tracking-widest">Explore</h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-mountain-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase text-sm tracking-widest">Destinations</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-mountain-accent transition-colors text-sm">K2 Base Camp</a></li>
              <li><a href="#" className="text-white/40 hover:text-mountain-accent transition-colors text-sm">Skardu Expedition</a></li>
              <li><a href="#" className="text-white/40 hover:text-mountain-accent transition-colors text-sm">Hunza Cultural Tour</a></li>
              <li><a href="#" className="text-white/40 hover:text-mountain-accent transition-colors text-sm">Fairy Meadows</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white mb-6 uppercase text-sm tracking-widest">Follow Us</h4>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-mountain-accent hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs">
          <p>© {new Date().getFullYear()} Pakistan Trekking Adventures. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
