import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameContext";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Act2DisablingSurveillance = () => {
  const { updateActTime, updateActScore } = useGame();
  const [snippets, setSnippets] = useState(() =>
    shuffleArray([
      { id: 1, text: "while True:" },
      { id: 2, text: "if not is_heist_active():" },
      { id: 3, text: "    break" },
      { id: 4, text: "footage = load_old_footage()" },
      { id: 5, text: "if validate_footage(footage):" },
      { id: 6, text: "    send_to_sentrynet(footage)" },
      { id: 7, text: "    time.sleep(60)  # every minute" },
      { id: 8, text: "else:" },
      { id: 9, text: "    send_to_sentrynet(get_fallback_footage())" },
    ])
  );
  const [correctOrder] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [message, setMessage] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [timeLeft, setTimeLeft] = useState(420); // 7 minutes
  const [attempts, setAttempts] = useState(0);
  const isTimeUp = timeLeft <= 0;

  // Track time
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const moveSnippet = (dragIndex, hoverIndex) => {
    const draggedSnippet = snippets[dragIndex];
    const updatedSnippets = [...snippets];
    updatedSnippets.splice(dragIndex, 1);
    updatedSnippets.splice(hoverIndex, 0, draggedSnippet);
    setSnippets(updatedSnippets);
  };

  const calculateScore = (timeUsed, attempts) => {
    const baseScore = 1500;
    const timePenalty = timeUsed * 0.3; // Deduct 0.3 points per second
    const attemptPenalty = attempts * 15; // Deduct 15 points per attempt
    return Math.max(0, baseScore - timePenalty - attemptPenalty);
  };

  const handleActEnd = () => {
    const timeUsed = 420 - timeLeft;
    updateActTime(2, timeUsed);
    const score = calculateScore(timeUsed, attempts);
    updateActScore(2, score);
  };

  const checkCode = () => {
    setAttempts((prev) => prev + 1);
    const currentOrder = snippets.map((snippet) => snippet.id);
    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
      setMessage(
        "✅ Success! SentryNet is now looping old footage. Surveillance disabled."
      );
      setIsSolved(true);
      handleActEnd();
    } else {
      setMessage(
        "❌ Incorrect order. Check the logic: The loop must handle both valid and fallback footage."
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-black text-green-400 p-8 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <img src="/mask.png" alt="Logo" className="h-10 w-10 rounded-full" />
          <div className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-900 border border-green-500">
            Time: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center tracking-wide neon-glow">
          Act 2: Disabling Surveillance
        </h1>

        {/* Mission Brief */}
        <div className="bg-gray-900/60 border border-green-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Mission Brief</h2>
          <p className="text-green-300">
            SentryNet’s AI detects anomalies in real-time. To disable it, inject a script that:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-green-300">
            <li>Loops <strong>indefinitely</strong> (`while True`).</li>
            <li>Checks if the heist is active (`is_heist_active()`).</li>
            <li>Loads old footage (`load_old_footage()`).</li>
            <li>Validates footage (`validate_footage()`).</li>
            <li>Sends valid footage to SentryNet (`send_to_sentrynet()`).</li>
            <li>Falls back to generic footage if validation fails.</li>
            <li>Delays 60 seconds between sends (`time.sleep(60)`).</li>
          </ul>
        </div>

        {/* Code Puzzle */}
        <div className="bg-gray-950 border border-green-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Code Puzzle</h2>
          <p className="mb-4 text-green-300">
            Drag and drop the snippets to complete the <code>loop_feed()</code> function.
          </p>
          <div className="bg-black border border-green-600/30 rounded-lg p-4 mb-4">
            <pre className="text-green-400 text-sm">
              {`import time
def is_heist_active():
    return True  # Simulated
def load_old_footage():
    return "old_video.mp4"
def validate_footage(footage):
    return bool(footage)  # Simulated
def get_fallback_footage():
    return "fallback_video.mp4"
def send_to_sentrynet(data):
    print("Sending:", data)
def loop_feed():`}
            </pre>
          </div>

          {/* Drag-and-Drop Snippets */}
          <DndProvider backend={HTML5Backend}>
            <div className="space-y-2 mb-4">
              {snippets.map((snippet, index) => (
                <Snippet
                  key={snippet.id}
                  id={snippet.id}
                  text={snippet.text}
                  index={index}
                  moveSnippet={moveSnippet}
                />
              ))}
            </div>
          </DndProvider>
        </div>

        {/* Buttons & Feedback */}
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={checkCode}
            disabled={isTimeUp || isSolved}
            className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition ${
              isTimeUp || isSolved
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isTimeUp ? "Time’s Up!" : "Check Code"}
          </button>
          {message && (
            <p
              className={`mt-2 font-semibold ${
                message.includes("Success") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
          {isSolved && (
            <Link to="/finalAct">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-white shadow-md transition">
                Proceed to Final Act →
              </button>
            </Link>
          )}
          {isTimeUp && !isSolved && (
            <div className="text-red-400 font-semibold">
              ⏰ Time’s up! SentryNet detected the intrusion.
              <div className="mt-2">
                <button
                  onClick={handleActEnd}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Snippet Component (unchanged)
const Snippet = ({ id, text, index, moveSnippet }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "snippet",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: "snippet",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSnippet(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`p-3 bg-gray-800 border border-green-500/20 rounded-lg cursor-move shadow-sm transition
        ${isDragging ? "opacity-50 scale-95" : "opacity-100"}`}
    >
      <code className="text-green-300">{text}</code>
    </div>
  );
};

export default Act2DisablingSurveillance;
