import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, gradient }) => {
  return (
    <Card className="h-full bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className={`w-16 h-16 mx-auto rounded-2xl ${gradient} flex items-center justify-center text-2xl text-white mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900 font-poppins">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-center leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;