import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/HeroSection';
import EmailForm from '../components/EmailForm';
import EmailHistory from '../components/features/EmailHistory';
import Footer from '../components/Footer';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <div className="relative">
        <HeroSection />
        <EmailForm />
        
        {/* Email History Section */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <EmailHistory />
          </div>
        </section>
        
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;