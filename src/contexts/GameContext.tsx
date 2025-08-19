
import { createContext, useContext, useState, ReactNode } from 'react';

type GameContextType = {
  actTimes: Record<number, number>; // { act1: 120, act2: 180, ... }
  actScores: Record<number, number>; // { act1: 500, act2: 700, ... }
  totalScore: number;
  updateActTime: (act: number, time: number) => void;
  updateActScore: (act: number, score: number) => void;
  // Add other methods as needed
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [actTimes, setActTimes] = useState<Record<number, number>>({});
  const [actScores, setActScores] = useState<Record<number, number>>({});

  const updateActTime = (act: number, time: number) => {
    setActTimes(prev => ({ ...prev, [act]: time }));
  };

  const updateActScore = (act: number, score: number) => {
    setActScores(prev => ({ ...prev, [act]: score }));
  };

  const totalScore = Object.values(actScores).reduce((sum, score) => sum + score, 0);

  return (
    <GameContext.Provider value={{ actTimes, actScores, totalScore, updateActTime, updateActScore }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
