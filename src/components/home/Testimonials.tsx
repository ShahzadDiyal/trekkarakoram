import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "James Wilson",
    role: "Adventure Photographer",
    content: "The attention to detail and level of comfort provided at the base of K2 was beyond my expectations. Truly a world-class operation.",
    avatar: "https://i.pravatar.cc/150?u=james"
  },
  {
    name: "Elena Ross",
    role: "Peak Climber",
    content: "Pakistan's mountains are demanding, but with this team, every challenge felt like a shared victory. Professional, kind, and incredibly skilled.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    name: "Mark Thompson",
    role: "CEO, Tech Horizon",
    content: "A transformative journey. The luxury Logistics meant I could focus entirely on the experience. The guides are the best in the business.",
    avatar: "https://i.pravatar.cc/150?u=mark"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-mountain-950">
      <Container>
        <div className="flex flex-col items-center text-center mb-20">
          <Quote className="text-mountain-accent mb-8 opacity-40" size={48} />
          <h2 className="text-4xl md:text-6xl font-display font-bold max-w-4xl leading-tight">
            Loved By The World's <br /> 
            <span className="text-white/40 italic">Elite Explorers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
            >
              <p className="text-white/70 text-lg leading-relaxed mb-10 italic font-light">
                "{t.content}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-mountain-accent/30 p-0.5">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold tracking-tight">{t.name}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
