import { ReactNode } from 'react';
import heistBg from '@/assets/heist-dubai-bg.jpg';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heistBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6 animate-slide-in">
        <div className="glass-card rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground animate-glow-pulse">
              {title}
            </h1>
            <p className="text-muted-foreground">
              {subtitle}
            </p>
          </div>
          
          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}