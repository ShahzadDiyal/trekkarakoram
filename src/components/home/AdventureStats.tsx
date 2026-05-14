import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '../layout/Container';

const stats = [
  { value: "4,500+", label: "Kilometers Trekked" },
  { value: "8,000m", label: "Peak Altitude" },
  { value: "100%", label: "Satisfaction" },
  { value: "24/7", label: "Ground Support" }
];

export const AdventureStats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);

  return (
    <section ref={ref} className="relative py-24 bg-mountain-900 overflow-hidden border-y border-white/5">
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 opacity-10"
      >
        <img 
          src="https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=2670" 
          alt="Background" 
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-2 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-mountain-accent uppercase tracking-[0.2em] text-[10px] font-bold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
