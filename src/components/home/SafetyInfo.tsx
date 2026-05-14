import { motion } from 'framer-motion';
import { Container } from '../layout/Container';
import { Plane, AlertTriangle, Cloud, Phone } from 'lucide-react';

const safetyFeatures = [
  {
    icon: <Plane size={24} />,
    title: "Emergency Evacuation",
    desc: "Priority air-evac protocols with Army Aviation for safe extraction."
  },
  {
    icon: <Cloud size={24} />,
    title: "Micro-Weather Analysis",
    desc: "Proprietary weather stations for real-time mountain forecasting."
  },
  {
    icon: <AlertTriangle size={24} />,
    title: "Risk Mitigation",
    desc: "Pre-screened routes and rigorous equipment certification."
  },
  {
    icon: <Phone size={24} />,
    title: "Global Comms",
    desc: "Satellite phones and Garmin reach devices for every group."
  }
];

export const SafetyInfo = () => {
  return (
    <section className="py-24 bg-mountain-950">
      <Container>
        <div className="glass p-12 md:p-20 rounded-[3rem] border border-white/5 bg-mountain-accent/5 backdrop-blur-xl relative overflow-hidden">
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-mountain-accent/10 blur-[150px] -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1">
              <span className="text-mountain-accent font-semibold uppercase tracking-widest text-xs mb-4 block">Safety Standards</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Zero Risk <br /> Is Our Mission</h2>
              <p className="text-white/50 leading-relaxed font-light mb-8">
                The Himalayas don't forgive. We don't take chances. Our safety protocols are industry-leading and rigorously enforced.
              </p>
              <div className="flex items-center space-x-2 text-white/80 font-bold">
                <span className="w-8 h-[1px] bg-mountain-accent" />
                <span className="text-sm uppercase tracking-widest">ISO 9001 Certified</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {safetyFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <div className="text-mountain-accent mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-white font-bold mb-2 tracking-tight">{feature.title}</h4>
                  <p className="text-white/40 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
