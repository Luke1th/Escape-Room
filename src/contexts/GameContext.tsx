import { createContext, useContext, useState, ReactNode } from 'react';

type GameContextType = {
  actTimes: Record<number, number>;
  actScores: Record<number, number>;
  totalScore: number;
  updateActTime: (act: number, time: number) => void;
  updateActScore: (act: number, score: number) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [actTimes, setActTimes] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });
  const [actScores, setActScores] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0 });

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
