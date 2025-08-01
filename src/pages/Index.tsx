import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heistBg from '@/assets/heist-dubai-bg.jpg';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heistBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 p-6 animate-slide-in">
        <div className="glass-card rounded-3xl p-12 max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 text-foreground animate-glow-pulse">
            Money Heist: Dubai
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Welcome to the most ambitious heist in history. The vault awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              variant="heist" 
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              <Link to="/signin">Access the Vault</Link>
            </Button>
            
            <Button 
              asChild 
              variant="dubai" 
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              <Link to="/signup">Join the Crew</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
