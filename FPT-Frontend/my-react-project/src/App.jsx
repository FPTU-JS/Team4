import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
// Layouts & Main Handlers
import MainLayout from './layouts/MainLayout.jsx'
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler.jsx'
import AnimatedPage from './components/AnimatedPage.jsx'

// Lazy-loaded Pages
const Login = lazy(() => import('./pages/login.jsx'))
const Register = lazy(() => import('./pages/register.jsx'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const Preferences = lazy(() => import('./pages/onboarding/Preferences.jsx'))
const RecipeDetail = lazy(() => import('./pages/ai/RecipeDetail.jsx'))
const Recipes = lazy(() => import('./pages/Recipes.jsx'))
const HealthyPlanSetup = lazy(() => import('./pages/HealthyPlanSetup.jsx'))
const HealthyPlanDashboard = lazy(() => import('./pages/HealthyPlanDashboard.jsx'))
const Map = lazy(() => import('./pages/Map.jsx'))
const CameraCapture = lazy(() => import('./pages/CameraCapture.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const AIAssistant = lazy(() => import('./pages/ai/AIAssistant.jsx'))

// Fallback Loader
const FallbackLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-main)' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>
      {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
)

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        <Route path="/forgot-password" element={<AnimatedPage><ForgotPassword /></AnimatedPage>} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/camera" element={<AnimatedPage><CameraCapture /></AnimatedPage>} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="onboarding" element={<AnimatedPage><Preferences /></AnimatedPage>} />

          <Route path="recipes" element={<AnimatedPage><Recipes /></AnimatedPage>} />
          <Route path="recipe/:id" element={<AnimatedPage><RecipeDetail /></AnimatedPage>} />
          <Route path="map" element={<AnimatedPage><Map /></AnimatedPage>} />
          <Route path="community" element={<AnimatedPage><Community /></AnimatedPage>} />
          <Route path="profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
          <Route path="plan-setup" element={<AnimatedPage><HealthyPlanSetup /></AnimatedPage>} />
          <Route path="healthy-plan" element={<AnimatedPage><HealthyPlanDashboard /></AnimatedPage>} />
          <Route path="ai-assistant" element={<AnimatedPage><AIAssistant /></AnimatedPage>} />
          <Route path="help-center" element={<Navigate to="/profile?tab=help" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Toaster 
          position="bottom-right"
          toastOptions={{
              style: {
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
              },
              success: {
                  iconTheme: { primary: '#10b981', secondary: '#fff' }
              }
          }}
      />
      <Suspense fallback={<FallbackLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App