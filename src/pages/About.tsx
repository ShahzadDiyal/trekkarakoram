import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Shield, Users, Map, Heart, Compass, Mountain, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  const stats = [
    { label: 'Summits Reached', value: '142+' },
    { label: 'Happy Trekkers', value: '2.5k' },
    { label: 'Expert Guides', value: '45' },
    { label: 'Safety Rating', value: '100%' },
  ];

  const team = [
    { 
      name: 'Ishaq Ali', 
      role: 'Lead Expedition Guide', 
      image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=1470',
      description: '20 years of experience in the Karakoram range.'
    },
    { 
      name: 'Saira Bano', 
      role: 'Operations Director', 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1470',
      description: 'Logistics expert for high-altitude base camps.'
    },
    { 
      name: 'Zubair Shah', 
      role: 'Technical Climber', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1470',
      description: 'Specialist in ice climbing and rescue operations.'
    }
  ];

  return (
    <div className="min-h-screen bg-mountain-950 text-white pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-mountain-950/40 via-mountain-950/60 to-mountain-950 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1549114227-3006bbd92361?auto=format&fit=crop&q=80&w=2670" 
            className="w-full h-full object-cover" 
            alt="Mountain Range"
            referrerPolicy="no-referrer"
          />
        </div>

        <Container className="relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-[12rem] font-display font-bold leading-none tracking-tighter mb-8"
          >
            OUR <br />
            <span className="text-mountain-accent italic">STORY</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl font-light"
          >
            Founded in the shadow of K2, we are a collective of mountaineers 
            dedicated to sharing the raw beauty of Pakistan's northern frontiers.
          </motion.p>
        </Container>
      </section>

      {/* Philosophy Section */}
      <Container className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-mountain-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Adventure Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Beyond the <br /> Ordinary Path
            </h2>
            <div className="space-y-6 text-white/50 text-lg leading-relaxed font-light">
              <p>
                We believe that true adventure isn't just about reaching the summit; it's about the transformation that happens between the base camp and the peak. Our journeys are designed to challenge the body, enrich the soul, and respect the ancient lands we traverse.
              </p>
              <p>
                Every expedition we lead follows strict "Leave No Trace" principles, ensuring these pristine landscapes remain untouched for generations of climbers to come. 
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
               <div className="flex items-start space-x-4">
                 <div className="w-12 h-12 rounded-2xl bg-mountain-accent/10 border border-mountain-accent/20 flex items-center justify-center flex-shrink-0">
                   <Compass size={24} className="text-mountain-accent" />
                 </div>
                 <div>
                   <h4 className="font-bold mb-1">Authentic</h4>
                   <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Local Heritage</p>
                 </div>
               </div>
               <div className="flex items-start space-x-4">
                 <div className="w-12 h-12 rounded-2xl bg-mountain-accent/10 border border-mountain-accent/20 flex items-center justify-center flex-shrink-0">
                   <Shield size={24} className="text-mountain-accent" />
                 </div>
                 <div>
                   <h4 className="font-bold mb-1">Elite Safety</h4>
                   <p className="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Global Standards</p>
                 </div>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 cinematic-shadow">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=2670" 
                className="w-full h-full object-cover" 
                alt="Trekkers"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 glass rounded-3xl p-8 cinematic-shadow -rotate-6 hidden md:block">
              <Mountain className="text-mountain-accent mb-4" size={40} />
              <p className="text-lg font-bold mb-2">100% Local</p>
              <p className="text-sm text-white/50 leading-relaxed">Every guide we hire is born and raised in the valleys they show you.</p>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Stats Section */}
      <div className="bg-white/[0.02] border-y border-white/5 py-24 mb-32">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <h3 className="text-5xl md:text-7xl font-display font-bold text-mountain-accent mb-2">{stat.value}</h3>
                <p className="text-sm text-white/40 uppercase tracking-[0.2em] font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Team Section */}
      <Container className="mb-32">
        <div className="text-center mb-20">
          <span className="text-mountain-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Meet the Elite</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">The Faces Behind <br /> The Expeditions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[600px] rounded-[2.5rem] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-mountain-950 via-mountain-950/20 to-transparent z-10" />
              <img 
                src={member.image} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                alt={member.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-mountain-accent text-sm font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <p className="text-white/40 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* CTA Section */}
      <Container>
        <div className="relative rounded-[3rem] overflow-hidden cinematic-shadow">
          <div className="absolute inset-0 bg-mountain-accent/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2670" 
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Adventure CTA"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-20 p-12 md:p-24 text-center">
            <h2 className="text-4xl md:text-7xl font-display font-bold text-mountain-950 mb-8">
              Start Your Own <br /> Story Today
            </h2>
            <p className="text-mountain-950/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              The mountains are calling. Whether you seek the challenge of K2 or the serenity of Hunza, 
              we have the perfect expedition waiting for you.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link to="/destinations">
                <Button className="bg-mountain-950 text-white px-12 py-8 rounded-full hover:bg-mountain-950/90 transition-all">
                  Browse Expeditions
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-mountain-950/20 text-mountain-950 px-12 py-8 rounded-full hover:bg-mountain-950 hover:text-white transition-all">
                  Contact Consultant <ChevronRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
