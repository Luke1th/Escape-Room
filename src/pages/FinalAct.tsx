import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useGame } from "@/contexts/GameContext";
import { Link } from "react-router-dom";

export default function FinalAct() {
  const { updateActTime, updateActScore } = useGame();
  const [stage, setStage] = useState(1);
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [treasureVisible, setTreasureVisible] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [showConfetti, setShowConfetti] = useState(false);
  const isTimeUp = timeLeft <= 0;

  const encrypted1 = "75850";
  const code1 = encrypted1
    .split("")
    .map((d) => (parseInt(d) - 4 + 10) % 10)
    .join(""); // "31415"
  const encrypted2 = "9263";
  const code2 = encrypted2
    .split("")
    .map((d) => (parseInt(d) + 3) % 10)
    .join(""); // "2596"
  const code3 = "IABUD"; // Reverse of DUBAI

  // Timer
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

  const calculateScore = (timeUsed) => {
    const baseScore = 2000;
    const timePenalty = timeUsed * 0.2; // Deduct 0.2 points per second
    return Math.max(0, baseScore - timePenalty);
  };

  const handleActEnd = () => {
    const timeUsed = 600 - timeLeft;
    updateActTime(3, timeUsed);
    const score = calculateScore(timeUsed);
    updateActScore(3, score);
  };

  const checkStage1 = (user) => {
    if (!/^\d{5}$/.test(user)) {
      setResult1("❌ Enter a 5-digit numeric code!");
      return;
    }
    if (user === code1) {
      setResult1("✅ Stage 1 cleared!");
      setStage(2);
    } else {
      setResult1("❌ Wrong code! Try again!");
    }
  };

  const checkStage2 = (user) => {
    if (!/^\d{4}$/.test(user)) {
      setResult2("❌ Enter a 4-digit numeric code!");
      return;
    }
    if (user === code2) {
      setResult2("✅ Stage 2 cleared!");
      setStage(3);
    } else {
      setResult2("❌ Wrong code! Try again!");
    }
  };

  const checkStage3 = (user) => {
    if (user.toUpperCase() === code3) {
      setResult3("✅ Vault Opened!");
      setTreasureVisible(true);
      setShowConfetti(true);
      handleActEnd();
    } else {
      setResult3("❌ Wrong arrangement! Try again!");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center text-white p-6 relative"
      style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]}
        />
      )}

      {/* Timer */}
      <div className="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded-lg font-semibold">
        Time Left: {formatTime(timeLeft)}
      </div>

      {/* Title and Logo */}
      <motion.img
        src="/mask.png"
        className="w-40 mx-auto mb-3"
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <h1 className="text-3xl font-bold mb-6">🌴 The Dubai Escape Challenge – Final Climax 🌴</h1>

      {/* Stage 1 */}
      {stage >= 1 && !isTimeUp && (
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg max-w-md w-full mb-6">
          <p className="mb-2 font-semibold">Encrypted Code 1: {encrypted1}</p>
          <p className="mb-4">🔐 Clue: Subtract 4 from each digit (mod 10) to reveal the truth.</p>
          <input
            id="stage1input"
            type="text"
            maxLength="5"
            placeholder="Enter 5-digit code"
            className="p-2 text-black rounded w-56 text-center"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkStage1(input1)}
            disabled={isTimeUp}
          />
          <button
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600 disabled:bg-gray-500"
            onClick={() => {
              checkStage1(input1);
              setInput1("");
            }}
            disabled={isTimeUp}
          >
            Unlock
          </button>
          <div className="mt-3">{result1}</div>
        </div>
      )}

      {/* Stage 2 */}
      {stage >= 2 && !isTimeUp && (
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg max-w-md w-full mb-6">
          <p className="mb-2 font-semibold">Encrypted Code 2: {encrypted2}</p>
          <p className="mb-4">🔐 Clue: Add 3 to each digit (mod 10) to continue.</p>
          <input
            id="stage2input"
            type="text"
            maxLength="4"
            placeholder="Enter 4-digit code"
            className="p-2 text-black rounded w-56 text-center"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkStage2(input2)}
            disabled={isTimeUp}
          />
          <button
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600 disabled:bg-gray-500"
            onClick={() => {
              checkStage2(input2);
              setInput2("");
            }}
            disabled={isTimeUp}
          >
            Unlock
          </button>
          <div className="mt-3">{result2}</div>
        </div>
      )}

      {/* Stage 3 */}
      {stage >= 3 && !isTimeUp && (
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg max-w-md w-full">
          <p className="mb-2 font-semibold">
            Final Vault: Arrange the letters "DUBAI" in reverse to claim your prize.
          </p>
          <input
            id="stage3input"
            type="text"
            maxLength="5"
            placeholder="Enter code"
            className="p-2 text-black rounded w-56 text-center"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkStage3(input3)}
            disabled={isTimeUp}
          />
          <button
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600 disabled:bg-gray-500"
            onClick={() => {
              checkStage3(input3);
              setInput3("");
            }}
            disabled={isTimeUp}
          >
            Open Vault
          </button>
          <div className="mt-3">{result3}</div>
        </div>
      )}

      {/* Time's Up Message */}
      {isTimeUp && !treasureVisible && (
        <div className="bg-black/70 p-6 rounded-2xl shadow-lg max-w-md w-full text-red-400 font-semibold">
          ⏰ Time's up! The vault has locked permanently.
        </div>
      )}

      {/* Congratulations Popup */}
      {treasureVisible && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-xl mb-6">
              You’ve unlocked the <strong>AL-Mazar Bank's Treasure</strong>! 💎
            </p>
            <p className="mb-4">
              Your quick thinking and skill have paid off. The Desert Star Diamond is yours!
            </p>
            <Link to="/act1">
            <button
              className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600 font-semibold"
            >
              Play Again
            </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
