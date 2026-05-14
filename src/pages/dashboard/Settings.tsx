import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Camera, Shield, Bell, Save, Loader2, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Settings = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setLoading(true);
    setSuccess(false);

    try {
      // Update Firebase Auth
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL
      });

      // Update Firestore
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName,
        photoURL
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-display font-bold text-white mb-2">Account <span className="text-mountain-accent italic">Settings</span></h1>
        <p className="text-white/40">Manage your profile and travel preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <section className="p-8 md:p-12 glass border border-white/5 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <User size={20} className="mr-3 text-mountain-accent" />
              Profile Information
            </h3>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    disabled
                    value={user?.email || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white/40 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 ml-4">Profile Photo URL</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-mountain-accent/50 transition-all"
                    placeholder="https://..."
                  />
                  <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {photoURL ? (
                      <img src={photoURL} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={20} className="text-white/20" />
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                   {success && (
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 text-sm font-bold">Profile updated successfully!</motion.p>
                   )}
                </div>
                <Button 
                  disabled={loading}
                  className="px-12 py-4 rounded-xl flex items-center space-x-2"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          </section>

          <section className="p-8 md:p-12 glass border border-white/5 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-8 flex items-center">
              <Shield size={20} className="mr-3 text-mountain-accent" />
              Security & Privacy
            </h3>
            <p className="text-white/40 text-sm mb-8 leading-relaxed">
              Your security is our priority. We use industry-standard encryption for all data storage and strictly adhere to Pakistan's data protection regulations.
            </p>
            <Button variant="outline" className="border-white/10 text-white/60">
              Reset Password Via Email
            </Button>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="p-8 glass border border-white/5 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Notifications</h3>
              <Bell size={20} className="text-white/20" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">Expedition Updates</span>
                <div className="w-10 h-6 bg-mountain-accent rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-fullShadow shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/50">Newsletter</span>
                <div className="w-10 h-6 bg-white/10 rounded-full relative">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-fullShadow shadow-sm" />
                </div>
              </div>
            </div>
          </section>

          <section className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem]">
            <h4 className="text-red-500 font-bold mb-2">Danger Zone</h4>
            <p className="text-xs text-red-500/60 leading-relaxed mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="text-[10px] uppercase tracking-widest font-bold text-red-500/40 hover:text-red-500 transition-colors">
              Request Account Deletion
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
