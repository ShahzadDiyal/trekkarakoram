import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Shield, Sparkles, Heart, Trophy } from 'lucide-react';

const features = [
  {
    icon: <Shield className="text-mountain-accent" size={32} />,
    title: "Safety First",
    description: "Multi-redundant communication kits, professional high-altitude doctors, and certified logistical support."
  },
  {
    icon: <Sparkles className="text-mountain-accent" size={32} />,
    title: "Eco-Luxury",
    description: "Premium basecamp setups with a strict zero-waste policy. We preserve the mountains we love."
  },
  {
    icon: <Trophy className="text-mountain-accent" size={32} />,
    title: "Expert Curation",
    description: "Decades of experience in Northern Pakistan. Our routes are proprietary and crafted for the elite explorer."
  },
  {
    icon: <Heart className="text-mountain-accent" size={32} />,
    title: "Personal Service",
    description: "1-on-1 attention from your first query to your final descent. Every detail of your journey is bespoke."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 md:py-32 bg-mountain-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-mountain-accent font-semibold uppercase tracking-widest text-xs mb-4 block">The Gold Standard</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Why We Are <br />
              <span className="text-white/40 italic">Beyond Ordinary</span>
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed font-light">
              Trekking in Pakistan is a spiritual experience. We provide the vessel that ensures your safety, comfort, and ultimate connection with the Karakoram's raw majesty.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex flex-col space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group hover:border-mountain-accent/30 transition-colors">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{feature.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden cinematic-shadow">
              <img 
                src="https://images.unsplash.com/photo-1549413248-15a995726715?auto=format&fit=crop&q=80&w=2670" 
                alt="Why Choose Us" 
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Absolute Decorative Elements */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 glass p-8 rounded-3xl border border-white/10 hidden md:block"
            >
              <p className="text-4xl font-bold text-mountain-accent mb-1">100%</p>
              <p className="text-xs uppercase tracking-widest text-white/60">Safety Record</p>
            </motion.div>

            <div className="absolute -top-10 -left-10 w-40 h-40 bg-mountain-accent/10 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
