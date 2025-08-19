import { useGame } from '@/contexts/GameContext';

const dashboard = () => {
  const { actTimes, actScores, totalScore } = useGame();

  return (
    <div>
      <h2>Your Performance</h2>
      {Object.entries(actTimes).map(([act, time]) => (
        <div key={act}>
          <p>Act {act}: {time} seconds, Score: {actScores[act]}</p>
        </div>
      ))}
      <h3>Total Score: {totalScore}</h3>
    </div>
  );
};
export default dashboard;