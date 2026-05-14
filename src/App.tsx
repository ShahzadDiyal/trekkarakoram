import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, Suspense, lazy, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MainLayout } from './components/layout/MainLayout';
import { useAuth } from './hooks/useAuth';
import { Loader2 } from 'lucide-react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Destinations = lazy(() => import('./pages/Destinations').then(m => ({ default: m.Destinations })));
const TrekDetails = lazy(() => import('./pages/TrekDetails').then(m => ({ default: m.TrekDetails })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));

// Dashboard Pages
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout').then(m => ({ default: m.DashboardLayout })));
const DashboardOverview = lazy(() => import('./pages/dashboard/Overview').then(m => ({ default: m.Overview })));
const DashboardInquiries = lazy(() => import('./pages/dashboard/Inquiries').then(m => ({ default: m.Inquiries })));
const DashboardFavorites = lazy(() => import('./pages/dashboard/Favorites').then(m => ({ default: m.Favorites })));
const DashboardSettings = lazy(() => import('./pages/dashboard/Settings').then(m => ({ default: m.Settings })));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Page Transition Wrapper
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const LoadingFallback = () => (
  <div className="min-h-screen bg-mountain-950 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="text-mountain-accent" size={40} />
    </motion.div>
  </div>
);

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/destinations" element={<PageTransition><Destinations /></PageTransition>} />
              <Route path="/treks/:slug" element={<PageTransition><TrekDetails /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />

              {/* Dashboard Nesting */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardOverview />} />
                <Route path="inquiries" element={<DashboardInquiries />} />
                <Route path="favorites" element={<DashboardFavorites />} />
                <Route path="settings" element={<DashboardSettings />} />
              </Route>

              {/* Redirect legacy path */}
              <Route path="/favorite-treks" element={<Navigate to="/dashboard/favorites" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

