import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const IntroCutscene = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    navigate('/act1');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/act1'); // Route after video ends
    }, 25000); // Adjust to match your video length (e.g., 17s)

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black">
      <video
        src="/videos/intro.mp4"
        autoPlay
        className="w-full h-full object-cover"
      />
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 bg-black/60 text-white text-sm sm:text-base rounded-md hover:bg-black/80 transition"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default IntroCutscene;
