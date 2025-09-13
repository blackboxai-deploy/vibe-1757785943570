import React from 'react';
import HeroSection from '@/components/HeroSection';
import TextHumanizer from '@/components/TextHumanizer';
import FeatureCard from '@/components/FeatureCard';

const HomePage = () => {
  const features = [
    {
      title: 'Bypass AI Detection',
      description: 'Most highly sophisticated algorithms ensure your content passes through AI detection systems unnoticed, maintaining perfect authenticity and naturalness.',
      icon: '🛡️',
      gradient: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      title: 'Preserve Meaning',
      description: 'Advanced contextual analysis maintains original meaning while applying sophisticated sentence restructuring and natural language variations.',
      icon: '🎯',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      title: 'Instant Processing',
      description: 'Lightning-fast sophisticated algorithms deliver humanized text in seconds using advanced pattern recognition and contextual transformation.',
      icon: '⚡',
      gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    {
      title: 'Multiple Languages',
      description: 'Sophisticated multilingual algorithms support various languages with advanced cultural context understanding and natural flow enhancement.',
      icon: '🌍',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      title: 'Quality Assurance',
      description: 'Multi-layered quality algorithms ensure perfect grammatical correctness, natural flow, and human-like authenticity in every output.',
      icon: '✨',
      gradient: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      title: 'Privacy Focused',
      description: 'Your data is processed securely and not stored on our servers, ensuring complete privacy.',
      icon: '🔒',
      gradient: 'bg-gradient-to-br from-red-500 to-red-600'
    }
  ];

  const howItWorksSteps = [
    {
      step: '1',
      title: 'Paste Your AI Text',
      description: 'Copy and paste your AI-generated content into our input field.'
    },
    {
      step: '2',
      title: 'Click Humanize',
      description: 'Our advanced algorithms analyze and transform your text structure.'
    },
    {
      step: '3',
      title: 'Get Human-like Content',
      description: 'Receive natural, human-like text that bypasses AI detection.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Humanizer Tool */}
      <TextHumanizer />

      {/* Features Section */}
      <section id="features" className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-poppins mb-4">
              Why Choose Mr.JM AI Humanizer?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge AI technology provides the most advanced text humanization capabilities 
              to help you create authentic, natural-sounding content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-poppins mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your AI-generated text into human-like content in just three simple steps.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksSteps.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                      {item.step}
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-y-0.5"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-poppins mb-6">
              About Mr.JM AI Humanizer Tool
            </h2>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                Mr.JM AI Humanizer Tool is a cutting-edge solution designed to transform AI-generated content 
                into natural, human-like text that successfully bypasses AI detection systems. Our advanced 
                algorithms analyze text patterns, sentence structures, and linguistic nuances to create 
                authentic-sounding content.
              </p>
              <p>
                Whether you're working with content from ChatGPT, Claude, Gemini, or any other AI platform, 
                our tool ensures your text maintains its original meaning while adopting a more human-like 
                tone and structure. This makes it perfect for academic papers, blog posts, articles, and 
                any content where human authenticity is crucial.
              </p>
              <div className="bg-blue-50 rounded-2xl p-8 mt-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Mission</h3>
                <p className="text-blue-800">
                  To bridge the gap between AI-generated content and human writing, providing users with 
                  the tools they need to create authentic, engaging, and undetectable content while 
                  maintaining the highest standards of quality and meaning preservation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-poppins mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions or need support? We're here to help you make the most of our AI humanizer tool.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Support</h3>
                  <p className="text-gray-600 mb-2">Email: support@mrjm-ai.com</p>
                  <p className="text-gray-600">Response time: 24 hours</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Business</h3>
                  <p className="text-gray-600 mb-2">Email: business@mrjm-ai.com</p>
                  <p className="text-gray-600">Partnership inquiries welcome</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;