import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalAct() {
  const TOTAL_SECONDS = 300;
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [stage, setStage] = useState<"maze" | "cipher" | "success" | "fail">("maze");
  const [inputValue, setInputValue] = useState("");

  // Maze state
  const gridSize = 5;
  const start = 0; // top-left
  const exit = gridSize * gridSize - 1; // bottom-right
  const [path, setPath] = useState<number[]>([]);
  const [error, setError] = useState(false);

  const isTimeUp = timeLeft <= 0;

  useEffect(() => {
    if (stage === "success" || stage === "fail") return;
    const id = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (isTimeUp && stage !== "success") {
      setStage("fail");
    }
  }, [isTimeUp]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Maze logic
  const handleNodeClick = (index: number) => {
    if (path.length === 0 && index !== start) {
      // must start at start
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    if (path.includes(index)) return; // no revisiting

    const last = path[path.length - 1];
    if (path.length > 0) {
      const row = Math.floor(last / gridSize);
      const col = last % gridSize;
      const newRow = Math.floor(index / gridSize);
      const newCol = index % gridSize;

      // must be adjacent
      if (Math.abs(row - newRow) + Math.abs(col - newCol) !== 1) {
        setError(true);
        setTimeout(() => setError(false), 500);
        return;
      }
    }

    const newPath = [...path, index];
    setPath(newPath);

    if (index === exit) {
      // reached the goal
      setTimeout(() => setStage("cipher"), 600);
    }
  };

  // Cipher logic
  const handleCipherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().toUpperCase() === "BURJ421") {
      setStage("success");
    } else {
      setStage("fail");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-red-500">Final Act: The Escape</h1>
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold border ${
            isTimeUp
              ? "bg-red-900 text-red-100 border-red-700"
              : timeLeft <= 60
              ? "bg-amber-900 text-amber-100 border-amber-700"
              : "bg-green-900 text-green-100 border-green-700"
          }`}
        >
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Maze Puzzle Stage */}
      {stage === "maze" && (
        <div className="space-y-6">
          <p className="text-gray-300">
            Reroute the network traffic. Connect from START (top-left) to EXIT (bottom-right) 
            by clicking adjacent nodes. No backtracking!
          </p>

          <div className="grid grid-cols-5 gap-2 bg-gray-800 p-4 rounded">
            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
              const isStart = i === start;
              const isExit = i === exit;
              const isSelected = path.includes(i);
              return (
                <motion.div
                  key={i}
                  onClick={() => handleNodeClick(i)}
                  whileHover={{ scale: 1.1 }}
                  className={`h-12 w-12 rounded flex items-center justify-center cursor-pointer 
                    ${isStart ? "bg-green-700" : isExit ? "bg-red-700" : "bg-gray-700"} 
                    ${isSelected ? "ring-2 ring-yellow-400" : ""}
                    ${error ? "animate-pulse bg-red-900" : ""}`}
                >
                  {isStart ? "S" : isExit ? "E" : ""}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cipher Stage */}
      {stage === "cipher" && (
        <div className="space-y-6">
          <p className="text-gray-300">
            The AI is tracing your intrusion! Enter the final cipher command derived from Dubai coordinates.
          </p>

          <form onSubmit={handleCipherSubmit} className="space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
              placeholder="Enter final cipher code..."
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center space-x-2"
            >
              <Lock className="h-4 w-4" />
              <span>Execute Command</span>
            </button>
          </form>
        </div>
      )}

      {/* Success */}
      {stage === "success" && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 text-center max-w-md rounded-lg border border-green-500 shadow-xl">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Vault Secured!</h2>
            <p className="text-gray-300 mb-4">
              You erased your digital footprints. The Broker’s final message: <br />
              <span className="italic">"Well done. The desert hides its treasures no more."</span>
            </p>
          </div>
        </div>
      )}

      {/* Failure */}
      {stage === "fail" && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 text-center max-w-md rounded-lg border border-red-500 shadow-xl">
            <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">AI Detected You</h2>
            <p className="text-gray-300 mb-4">
              Screens flash red. SentryNet reports: <br />
              <span className="italic">"Intruders located. Authorities dispatched. Game over."</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
