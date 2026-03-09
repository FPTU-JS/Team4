import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Preferences from './pages/onboarding/Preferences.jsx'
import Recommendations from './pages/ai/Recommendations.jsx'
import RecipeDetail from './pages/ai/RecipeDetail.jsx'
import Recipes from './pages/Recipes.jsx'
import HealthyPlanSetup from './pages/HealthyPlanSetup.jsx'
import HealthyPlanDashboard from './pages/HealthyPlanDashboard.jsx'
import Map from './pages/Map.jsx'
import CameraCapture from './pages/CameraCapture.jsx'
import Community from './pages/Community.jsx'
import Profile from './pages/Profile.jsx'
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/camera" element={<CameraCapture />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="onboarding" element={<Preferences />} />
          <Route path="plan-setup" element={<HealthyPlanSetup />} />
          <Route path="plan-dashboard" element={<HealthyPlanDashboard />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="ai-recommendations" element={<Recommendations />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
          <Route path="map" element={<Map />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App