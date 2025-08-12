import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heistBg from '@/assets/heist-dubai-bg.jpg';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Particles from 'react-tsparticles';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heistBg})` }}
      />

      {/* Particle Overlay */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          background: { color: "transparent" },
          fullScreen: false,
          particles: {
            number: { value: 40 },
            color: { value: "#ff0000" },
            shape: { type: "circle" },
            opacity: { value: 0.15 },
            size: { value: 2.5 },
            move: { enable: true, speed: 0.5 },
          }
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-backgrounds/90 via-backgrounds/70 to-backgrounds/90 z-0" />

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 p-6 w-full max-w-screen-md">

        {/* Animated Mask or Logo (optional) */}
        <motion.img 
          src="/mask.png"
          className="w-40 mx-auto mb-3"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-3xl p-10 sm:p-12 max-w-2xl mx-auto backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl"
          >
            <h1 className="text-4xl sm:text-5xl text-foregrounds font-bold mb-6 drop-shadow-[0_0_30px_rgba(255,0,0,0.8)] text-white">
              Money Heist: Dubai
            </h1>
            <p className="text-lg sm:text-xl text-muted-foregrounds mb-8 text-white">
              Welcome to the most ambitious heist in history. The vault awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="heist"
                size="lg"
                className="text-lg px-8 py-4 h-auto transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <Link to="/signin">Log in now</Link>
              </Button>

              <Button
                asChild
                variant="dubai"
                size="lg"
                className="text-lg px-8 py-4 h-auto transform hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <Link to="/signup">Sign up to the Crew</Link>
              </Button>
            </div>
          </motion.div>
      </div>
    </div>
  );
};

export default Index;
