import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/HeroSection';
import EmailForm from '../components/EmailForm';
import SubscriptionStatus from '../components/subscription/SubscriptionStatus';
import UsageIndicator from '../components/usage/UsageIndicator';
import EmailHistory from '../components/features/EmailHistory';
import Footer from '../components/Footer';
import { useSubscription } from '../hooks/useSubscription';

const DashboardPage: React.FC = () => {
  const { isActive: isPremium } = useSubscription();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="relative">
        <HeroSection />
        
        {/* Status Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SubscriptionStatus />
            <UsageIndicator />
          </div>
        </section>
        
        <EmailForm />
        
        {/* Email History Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <EmailHistory isPremium={isPremium} />
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;