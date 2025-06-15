import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/HeroSection';
import EmailForm from '../components/EmailForm';
import SubscriptionStatus from '../components/subscription/SubscriptionStatus';
import Footer from '../components/Footer';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="relative">
        <HeroSection />
        
        {/* Subscription Status Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SubscriptionStatus />
          </div>
        </section>
        
        <EmailForm />
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;