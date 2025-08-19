import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle,
  AlertTriangle,
  Lock,
  FileText,
  Mail,
  Search,
  Menu,
  RefreshCw,
} from 'lucide-react';
import { Email, EmailStatus, TerminalMessage } from '@/types/email';
import emailsData from '@/data/emails.json';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';

const Act1Infiltration = () => {
  const { updateActTime, updateActScore } = useGame();
  const [emails] = useState<Email[]>(emailsData.slice(0, 3));
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emailStatuses, setEmailStatuses] = useState<EmailStatus[]>(
    emails.map(email => ({ id: email.id, solved: false, attempts: 0 }))
  );
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState<TerminalMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const isTimeUp = timeLeft <= 0;
  const solvedCount = emailStatuses.filter(status => status.solved).length;
  const progressPercentage = (solvedCount / emails.length) * 100;
  const allSolved = solvedCount === emails.length;
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getEmailStatus = (emailId: number) => {
    return emailStatuses.find(status => status.id === emailId);
  };

  const calculateScore = (timeUsed: number, attempts: number) => {
    const baseScore = 1000;
    const timePenalty = timeUsed * 0.5; // Deduct 0.5 points per second
    const attemptPenalty = attempts * 10; // Deduct 10 points per attempt
    return Math.max(0, baseScore - timePenalty - attemptPenalty);
  };

  useEffect(() => {
    const loadingSequence = [
      'Loading Gmail...',
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

  useEffect(() => {
    if (isLoading) return;
    const id = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && emails.length > 0) {
      const firstUnsolved = emails.find(email => !getEmailStatus(email.id)?.solved);
      if (firstUnsolved) setSelectedEmail(firstUnsolved);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail || !inputValue.trim()) return;
    const isCorrect = inputValue.trim().toUpperCase() === selectedEmail.answer.toUpperCase();
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
        email => !getEmailStatus(email.id)?.solved && email.id !== selectedEmail.id
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

  const handleActEnd = () => {
    const timeUsed = 300 - timeLeft;
    updateActTime(1, timeUsed);
    const attempts = emailStatuses.reduce((sum, status) => sum + status.attempts, 0);
    const score = calculateScore(timeUsed, attempts);
    updateActScore(1, score);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <motion.img
            src="/mask.png"
            className="w-40 mx-auto mb-3"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="text-xl font-semibold">{typingText}</div>
          <div className="text-sm text-gray-400">Loading your secure email...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 p-2 bg-gray-800">
        <div className="flex items-center space-x-4">
          <img src="/mask.png" alt="Logo" className="h-8 w-8 rounded-full" />
          <h1 className="text-xl font-semibold text-red-400">Money Heist: Dubai</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-700 text-white">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-700 bg-gray-800 p-4">
          <Button className="w-full justify-start mb-4 bg-red-600 hover:bg-red-700">
            <Mail className="h-4 w-4 mr-2" /> Inbox
          </Button>
          <div className="text-sm text-gray-400">
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-700">
              <span>All Emails</span>
              <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">{emails.length}</span>
            </div>
          </div>
        </div>

        {/* Inbox List */}
        <div className="w-80 border-r border-gray-700 bg-gray-800 overflow-y-auto">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="font-semibold">Inbox</h2>
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </div>
          {emails.map(email => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 flex items-center justify-between ${
                selectedEmail?.id === email.id ? 'bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  {getEmailStatus(email.id)?.solved ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm">{email.sender}</div>
                  <div className="text-xs text-gray-400 truncate w-48">{email.subject}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email View */}
        <div className="flex-1 bg-gray-800">
          {/* Progress Bar */}
          <div className="bg-gray-700 p-3 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Vault Hack Progress</span>
              <span className="text-sm text-gray-400">
                {solvedCount}/{emails.length} Complete
              </span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {selectedEmail ? (
            <div className="h-[calc(100%-50px)] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{selectedEmail.subject}</h2>
                {getEmailStatus(selectedEmail.id)?.solved && (
                  <div className="flex items-center space-x-1 text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">VAULT UNLOCKED</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
                <span className="font-medium">{selectedEmail.sender}</span>
                <span>•</span>
                <span>Confidential Vault Communication</span>
              </div>
              <div className="prose max-w-none text-gray-300 leading-relaxed mb-6">
                {selectedEmail.body}
              </div>
              {selectedEmail.attachment && (
                <Card className="bg-gray-700 border border-gray-600 p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-red-400" />
                    <span className="text-sm text-gray-300 font-medium">
                      Access Code Attachment
                    </span>
                  </div>
                  <Button
                    onClick={() => setIsAttachmentOpen(true)}
                    className="bg-gray-600 hover:bg-gray-500 text-white"
                  >
                    View Attachment
                  </Button>
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Hint: Decode the contents to reveal the vault code.
                  </p>
                </Card>
              )}

              {/* Attachment Modal */}
              {isAttachmentOpen && selectedEmail?.attachment && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full">
                    <h3 className="text-lg font-semibold mb-4">Attachment Preview</h3>
                    <pre className="bg-gray-700 p-4 rounded text-sm text-gray-200 max-h-80 overflow-y-auto whitespace-pre-wrap">
                      {selectedEmail.attachment}
                    </pre>
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={() => setIsAttachmentOpen(false)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {!getEmailStatus(selectedEmail.id)?.solved && (
                <div className="border-t border-gray-700 pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Enter Vault Access Code:
                      </label>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder={isTimeUp ? "Time's up" : 'Enter the code hidden in the file...'}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                        autoComplete="off"
                        disabled={isTimeUp}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={!inputValue.trim() || isTimeUp}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Unlock Vault
                    </Button>
                  </form>
                </div>
              )}

              {message && (
                <div
                  className={`p-4 text-center font-medium mt-4 rounded ${
                    message.type === 'success'
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8">
              <p className="text-lg font-medium text-gray-400">Select an email to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Victory Modal */}
      {allSolved && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 text-center max-w-md rounded-lg shadow-xl">
            <CheckCircle className="h-16 w-16 mx-auto text-green-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Vault UNLOCKED!</h2>
            <p className="text-gray-300 mb-4">
              The vault access code was cracked successfully.
            </p>
            <div className="text-sm text-green-400 bg-green-900/30 p-3 rounded">
              ✅ Mission accomplished
            </div>
            <div className="mt-6">
              {/* {handleActEnd()} */}
              <Link to="/act2">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
                  Next Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Time’s Up Modal */}
      {isTimeUp && !allSolved && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 text-center max-w-md rounded-lg shadow-xl">
            <AlertTriangle className="h-16 w-16 mx-auto text-red-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Time’s Up</h2>
            <p className="text-gray-300 mb-4">
              The system locked you out before the code was cracked.
            </p>
            <div className="flex items-center justify-center gap-3">
              {handleActEnd()}
              <Link to="/act1">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded">
                  Restart Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Act1Infiltration;
