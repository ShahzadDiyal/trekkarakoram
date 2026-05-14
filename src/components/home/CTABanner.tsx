import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { MessageSquare, Calendar } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants';

export const CTABanner = () => {
  return (
    <section className="py-24 md:py-32 bg-mountain-950 px-4">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-[3rem] overflow-hidden cinematic-shadow min-h-[500px] flex items-center justify-center text-center p-8 md:p-20"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1549413248-15a995726715?auto=format&fit=crop&q=80&w=2670" 
              alt="Call to action" 
              className="w-full h-full object-cover grayscale-[0.5] brightness-[0.3]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mountain-950 via-mountain-950/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight"
            >
              Ready To Rewrite <br />
              <span className="text-gradient italic">Your Definition</span> of Adventure?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light"
            >
              Our expedition consultants are ready to help you craft the perfect high-altitude journey. Limited slots available for the 2026 season.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button size="lg" className="w-full sm:w-auto px-10 py-6 rounded-full group">
                <Calendar size={18} className="mr-2" />
                Book Consulation
              </Button>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-6 rounded-full border-white/10 glass">
                  <MessageSquare size={18} className="mr-2 text-mountain-accent" />
                  Chat on WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
