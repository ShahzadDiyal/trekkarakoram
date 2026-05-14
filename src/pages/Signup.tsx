import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Mail, Lock, User, UserPlus, Chrome, AlertCircle, Loader2 } from 'lucide-react';

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background with mountain feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-mountain-950/80 backdrop-blur-sm z-10" />
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2670" 
          className="w-full h-full object-cover" 
          alt="Mountain Background"
          referrerPolicy="no-referrer"
        />
      </div>

      <Container className="relative z-20 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 md:p-12 glass rounded-[2.5rem] border border-white/10 cinematic-shadow"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-display font-bold text-white mb-3">Join the Venture</h1>
            <p className="text-white/50 font-light">Create your account to start exploring</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-mountain-accent transition-colors">
                  <User size={18} />
                </div>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-mountain-accent transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-4">Secure Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-mountain-accent transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <Button 
              disabled={loading}
              className="w-full py-8 rounded-2xl font-bold text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? <Loader2 size={20} className="animate-spin mr-2" /> : 'Create Account'}
                {!loading && <UserPlus size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />}
              </span>
            </Button>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center space-x-3 text-red-500"
            >
              <AlertCircle size={18} className="shrink-0" />
              <span className="text-xs font-bold">{error}</span>
            </motion.div>
          )}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="px-4 bg-transparent text-white/20">Or join with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button 
              variant="outline" 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 rounded-2xl border-white/10 hover:bg-white/5 transition-all text-white/80"
            >
              <Chrome size={20} className="mr-3" />
              Sign up with Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            Already have an account? {' '}
            <Link to="/login" className="text-mountain-accent font-bold hover:underline">Log in here</Link>
          </p>
        </motion.div>
      </Container>
    </div>
  );
};
