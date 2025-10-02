import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DashboardPage from '@/pages/DashboardPage';
import PricingPage from '@/pages/PricingPage';
import SupportPage from '@/pages/SupportPage';
import LegalPage from '@/pages/LegalPage';
import { LanguageProvider } from '@/context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/legal" element={<LegalPage />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;