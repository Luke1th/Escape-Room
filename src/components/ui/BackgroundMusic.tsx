import { useEffect, useRef } from 'react';

interface BackgroundMusicProps {
  src: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Adjust volume here
    audio.loop = true;  // Loop the audio indefinitely

    const handlePlay = () => {
      audio.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    };

    document.addEventListener('click', handlePlay, { once: true });

    return () => {
      document.removeEventListener('click', handlePlay);
    };
  }, []);

  return <audio ref={audioRef} src={src} preload="auto" />;
};

export default BackgroundMusic;
