import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Act2DisablingSurveillance = () => {
  const [snippets, setSnippets] = useState([
    { id: 1, text: "while True:" },
    { id: 2, text: "footage = load_old_footage()" },
    { id: 3, text: "send_to_sentrynet(footage)" },
    { id: 4, text: "time.sleep(60)  # every minute" },
  ]);

  const [correctOrder] = useState([1, 2, 3, 4]);
  const [message, setMessage] = useState("");
  const [isSolved, setIsSolved] = useState(false);

  const moveSnippet = (dragIndex, hoverIndex) => {
    const draggedSnippet = snippets[dragIndex];
    const updatedSnippets = [...snippets];
    updatedSnippets.splice(dragIndex, 1);
    updatedSnippets.splice(hoverIndex, 0, draggedSnippet);
    setSnippets(updatedSnippets);
  };

  const checkCode = () => {
    const currentOrder = snippets.map((snippet) => snippet.id);
    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
      setMessage(
        "✅ Success! The script is correctly arranged. SentryNet is now looping old footage."
      );
      setIsSolved(true);
    } else {
      setMessage("❌ Incorrect order. Try again!");
      setIsSolved(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-black text-green-400 p-8 flex flex-col items-center"
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Title */}
        <img src="/mask.png" alt="Logo" className="h-10 w-10 rounded-full" />
        <h1 className="text-4xl font-extrabold text-center tracking-wide neon-glow">
          Act 2: Disabling Surveillance
        </h1>

        {/* Mission Brief */}
        <div className="bg-gray-900/60 border border-green-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Mission Brief</h2>
          <p className="text-green-300">
            The bank’s AI surveillance system, <span className="font-semibold">SentryNet</span>, 
            uses machine learning to detect anomalies. To disable it, you must inject 
            a malicious script that tricks SentryNet into looping old footage.
          </p>
        </div>

        {/* System Log Clues */}
        <div className="bg-gray-900/60 border border-green-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">System Log Clues</h2>
          <ul className="list-disc pl-6 space-y-2 text-green-300">
            <li>The feed loop must begin with an infinite condition to keep running indefinitely.</li>
            <li>Old footage needs to be loaded before it can be sent.</li>
            <li>Data transmission to SentryNet happens after loading the footage.</li>
            <li>A delay of 60 seconds is required after each send to simulate normal feed intervals.</li>
          </ul>
        </div>

        {/* Code Puzzle */}
        <div className="bg-gray-950 border border-green-500/40 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Code Puzzle</h2>
          <p className="mb-4 text-green-300">
            Drag and drop the code snippets below to arrange them in the correct order. 
            The code begins with imports and function definitions, but your task is to 
            fix the body of <code className="px-1 bg-green-900/40 rounded">loop_feed()</code>.
          </p>

          <div className="bg-black border border-green-600/30 rounded-lg p-4 mb-4">
            <pre className="text-green-400 text-sm">
              {`import time

def load_old_footage():
    return "old_video.mp4"

def send_to_sentrynet(data):
    print("Sending:", data)

def loop_feed():`}
            </pre>
          </div>

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
            className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold text-white shadow-md transition"
          >
            Check Code
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
        </div>
      </div>
    </motion.div>
  );
};

// Snippet Component
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
