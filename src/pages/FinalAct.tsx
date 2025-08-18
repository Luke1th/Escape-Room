import React, { useState } from "react";

export default function FinalAct() {
  const [stage, setStage] = useState(1);
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const [treasureVisible, setTreasureVisible] = useState(false);

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
    } else {
      setResult3("❌ Wrong arrangement! Try again!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white p-6" style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}>
      <h1 className="text-3xl font-bold mb-6">🌴 The Dubai Escape Challenge – Final Climax 🌴</h1>

      {/* Stage 1 */}
      {stage >= 1 && (
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg max-w-md w-full mb-6">
          <p className="mb-2 font-semibold">Encrypted Code 1: {encrypted1}</p>
          <p className="mb-4">🔐 Clue: Subtract 4 from each digit (mod 10) to reveal the truth.</p>
          <input
            type="text"
            maxLength="5"
            placeholder="Enter 5-digit code"
            className="p-2 text-black rounded w-56 text-center"
            onKeyDown={(e) => e.key === "Enter" && checkStage1(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600"
            onClick={() => checkStage1(document.querySelector("#stage1input").value)}
          >
            Unlock
          </button>
          <div className="mt-3">{result1}</div>
        </div>
      )}

      {/* Stage 2 */}
      {stage >= 2 && (
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg max-w-md w-full mb-6">
          <p className="mb-2 font-semibold">Encrypted Code 2: {encrypted2}</p>
          <p className="mb-4">🔐 Clue: Add 3 to each digit (mod 10) to continue.</p>
          <input
            type="text"
            maxLength="4"
            placeholder="Enter 4-digit code"
            className="p-2 text-black rounded w-56 text-center"
            onKeyDown={(e) => e.key === "Enter" && checkStage2(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600"
            onClick={() => checkStage2(document.querySelector("#stage2input").value)}
          >
            Unlock
          </button>
          <div className="mt-3">{result2}</div>
        </div>
      )}

      {/* Stage 3 */}
      {stage >= 3 && (
        <div className="bg-black/50 p-6 rounded-2xl shadow-lg max-w-md w-full">
          <p className="mb-2 font-semibold">Final Vault: Arrange the letters "DUBAI" in reverse to claim your prize.</p>
          <input
            type="text"
            maxLength="5"
            placeholder="Enter code"
            className="p-2 text-black rounded w-56 text-center"
            onKeyDown={(e) => e.key === "Enter" && checkStage3(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-600"
            onClick={() => checkStage3(document.querySelector("#stage3input").value)}
          >
            Open Vault
          </button>
          <div className="mt-3">{result3}</div>
          {treasureVisible && (
            <div className="text-xl mt-4 animate-pulse">💎 Congratulations! You’ve unlocked the AL-Mazar Bank's Treasure 💎</div>
          )}
        </div>
      )}
    </div>
  );
}
