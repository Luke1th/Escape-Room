import { useState } from 'react';

interface PuzzleProps {
  data: {
    id: number;
    sender: string;
    subject: string;
    body: string;
    answer: string;
    explanation: string;
  };
  onSuccess: () => void;
}

const PuzzleTerminal: React.FC<PuzzleProps> = ({ data, onSuccess }) => {
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (input.trim().toLowerCase() === data.answer.toLowerCase()) {
      setIsCorrect(true);
      setTimeout(() => {
        onSuccess();
        setInput('');
        setIsSubmitted(false);
        setIsCorrect(false);
      }, 1500);
    }
  };

  return (
    <div className="text-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">From: {data.sender}</h2>
        <h3 className="text-lg font-medium">Subject: {data.subject}</h3>
        <p className="mt-2 text-sm bg-black/30 p-3 rounded-md border border-white/10">{data.body}</p>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter access code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-3 text-black rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
          Submit
        </button>
        {isSubmitted && (
          <p className={isCorrect ? 'text-green-400' : 'text-red-500'}>
            {isCorrect ? 'Access code accepted.' : 'Incorrect. Try again.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PuzzleTerminal;