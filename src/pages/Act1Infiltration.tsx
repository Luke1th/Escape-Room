import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Lock, FileText } from 'lucide-react';
import { Email, EmailStatus, TerminalMessage } from '@/types/email';
import emailsData from '@/data/emails.json';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Act1Infiltration = () => {
  const [emails] = useState<Email[]>(emailsData);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    const randomEmail = emails[Math.floor(Math.random() * emails.length)];
    setSelectedEmail(randomEmail);
  }, []);

  const [emailStatuses, setEmailStatuses] = useState<EmailStatus[]>(
    emails.map(email => ({ id: email.id, solved: false, attempts: 0 }))
  );

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState<TerminalMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [typingText, setTypingText] = useState('');

  // Timer
  const TOTAL_SECONDS = 300; // 10 minutes
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);
  const isTimeUp = timeLeft <= 0;

  const solvedCount = emailStatuses.filter(status => status.solved).length;
  const progressPercentage = (solvedCount / emails.length) * 100;
  const allSolved = solvedCount === emails.length;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Fake Gmail loading
  useEffect(() => {
    const loadingSequence = [
      'Loading email...',
      'Connecting to Dubai servers...',
      'Welcome to the heist.',
    ];
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < loadingSequence.length) {
        setTypingText(loadingSequence[currentIndex]);
        currentIndex++;
      } else {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useEffect(() => {
    if (isLoading) return;
    const id = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail || !inputValue.trim()) return;

    const isCorrect =
      inputValue.trim().toUpperCase() ===
      selectedEmail.answer.toUpperCase();

    if (isCorrect) {
      setEmailStatuses(prev =>
        prev.map(status =>
          status.id === selectedEmail.id ? { ...status, solved: true } : status
        )
      );
      setMessage({
        type: 'success',
        text: '✅ Vault Access Granted - Code verified',
        timestamp: new Date(),
      });

      const nextUnsolved = emails.find(
        email =>
          !emailStatuses.find(status => status.id === email.id)?.solved &&
          email.id !== selectedEmail.id
      );
      if (nextUnsolved) {
        setTimeout(() => setSelectedEmail(nextUnsolved), 1500);
      }
    } else {
      setEmailStatuses(prev =>
        prev.map(status =>
          status.id === selectedEmail.id
            ? { ...status, attempts: status.attempts + 1 }
            : status
        )
      );
      setMessage({
        type: 'error',
        text: '❌ Access Denied - Invalid vault code',
        timestamp: new Date(),
      });
    }
    setInputValue('');
    setTimeout(() => setMessage(null), 3000);
  };

  const getEmailStatus = (emailId: number) => {
    return emailStatuses.find(status => status.id === emailId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.img
            src="/mask.png"
            className="w-40 mx-auto mb-3"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="text-xl text-white font-semibold">{typingText}</div>
          <div className="text-sm text-white">Loading your secure email...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <img src="/mask.png" alt="Logo" className="h-8 w-8 rounded-full" />
            <h1 className="text-xl font-semibold text-red-500">
              Money Heist: Dubai
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                isTimeUp
                  ? 'bg-red-900 text-red-100 border-red-700'
                  : timeLeft <= 60
                  ? 'bg-amber-900 text-amber-100 border-amber-700'
                  : 'bg-green-900 text-green-100 border-green-700'
              }`}
              title="Time remaining"
            >
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      {/* <div className="bg-gray-900 border-b border-gray-800 p-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Vault Hack Progress</span>
            <span className="text-sm text-gray-400">
              {solvedCount}/{emails.length} Complete
            </span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div> */}

      {/* Main */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 overflow-hidden">
          {selectedEmail ? (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-800 p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold">
                    {selectedEmail.subject}
                  </h2>
                  {getEmailStatus(selectedEmail.id)?.solved && (
                    <div className="flex items-center space-x-1 text-green-400 bg-green-900 px-3 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        VAULT UNLOCKED
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span className="font-medium">{selectedEmail.sender}</span>
                  <span>•</span>
                  <span>Confidential Vault Communication</span>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-800 space-y-4">
                <div className="prose max-w-none text-gray-200 leading-relaxed">
                  {selectedEmail.body}
                </div>

                {/* Fake attachment */}
                {selectedEmail.attachment && (
                  <Card className="bg-gray-900 border border-gray-700 p-4 mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-5 w-5 text-red-400" />
                      <span className="text-sm text-gray-300 font-medium">
                        Attachment: vault_logs.txt
                      </span>
                    </div>
                    <pre className="text-xs text-gray-400 whitespace-pre-wrap bg-black/50 p-3 rounded">
                      {selectedEmail.attachment}
                    </pre>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      Hint: Decode the contents to reveal the vault code.
                    </p>
                  </Card>
                )}
              </div>

              {/* Input */}
              {!getEmailStatus(selectedEmail.id)?.solved && (
                <div className="border-t border-gray-800 p-6 bg-gray-900">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Enter Vault Access Code:
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder={
                          isTimeUp
                            ? "Time's up"
                            : 'Enter the code hidden in the file...'
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        autoComplete="off"
                        disabled={isTimeUp}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center space-x-2"
                      disabled={!inputValue.trim() || isTimeUp}
                    >
                      <Lock className="h-4 w-4" />
                      <span>Unlock Vault</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Status */}
              {message && (
                <div
                  className={`p-4 text-center font-medium ${
                    message.type === 'success'
                      ? 'bg-green-900 text-green-100'
                      : 'bg-red-900 text-red-100'
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-center p-8">
              <p className="text-lg font-medium">Loading vault challenge...</p>
            </div>
          )}
        </div>
      </div>

      {/* Victory */}
      {allSolved && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 text-center max-w-md rounded-lg border border-green-500 shadow-xl">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2"> Vault UNLOCKED!</h2>
            <p className="text-gray-300 mb-4">
              The vault access code was cracked successfully.
            </p>
            <div className="text-sm text-green-400 bg-green-900 p-3 rounded">
              ✅ Mission accomplished
            </div>
            <div className="mt-6">
              <Link to="/act2">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
                  Next Challenge
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Time’s Up */}
      {isTimeUp && !allSolved && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 text-center max-w-md rounded-lg border border-red-500 shadow-xl">
            <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Time’s Up</h2>
            <p className="text-gray-300 mb-4">
              The system locked you out before the code was cracked.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/act2">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
                  Restart Challenge
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Act1Infiltration;
