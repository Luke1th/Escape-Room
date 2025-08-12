import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Search, Mail, Lock, Unlock, Star, Archive, Settings, User, Menu } from 'lucide-react';
import { Email, EmailStatus, TerminalMessage } from '@/types/email';
import emailsData from '@/data/emails.json';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Act1Infiltration = () => {
  const [emails] = useState<Email[]>(emailsData);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0] || null);
  const [emailStatuses, setEmailStatuses] = useState<EmailStatus[]>(
    emails.map(email => ({ id: email.id, solved: false, attempts: 0 }))
  );
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState<TerminalMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [typingText, setTypingText] = useState('');

  // >>> TIMER: config + state
  const TOTAL_SECONDS = 600; // 10 minutes; change to 900 for 15:00, etc.
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_SECONDS);
  const isTimeUp = timeLeft <= 0;
  const solvedCount = emailStatuses.filter(status => status.solved).length;
  const progressPercentage = (solvedCount / emails.length) * 100;

  // Helper to format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
  // <<< TIMER

  // Simulate Gmail loading sequence
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

  // >>> TIMER: countdown after loading
  useEffect(() => {
    if (isLoading) return;
    const id = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [isLoading]);
  // <<< TIMER

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail || !inputValue.trim()) return;


    const isCorrect = inputValue.trim().toUpperCase() === selectedEmail.answer.toUpperCase();
    
    if (isCorrect) {
      // Mark email as solved
      setEmailStatuses(prev =>
        prev.map(status =>
          status.id === selectedEmail.id
            ? { ...status, solved: true }
            : status
        )
      );
      
      setMessage({
        type: 'success',
        text: '✅ Vault Access Granted - Code verified',
        timestamp: new Date()
      });
      
      // Auto-select next unsolved email
      const nextUnsolved = emails.find(email => 
        !emailStatuses.find(status => status.id === email.id)?.solved && email.id !== selectedEmail.id
      );
      if (nextUnsolved) {
        setTimeout(() => setSelectedEmail(nextUnsolved), 1500);
      }
    } else {
      // Increment attempts
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
        timestamp: new Date()
      });
    }

    setInputValue('');
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const getEmailStatus = (emailId: number) => {
    return emailStatuses.find(status => status.id === emailId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.img 
            src="/mask.png"
            className="w-40 mx-auto mb-3"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-xl font-semibold">
            {typingText}
          </div>
          <div className="text-sm text-muted-foreground">
            Loading your secure email...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Gmail Header */}
      <div className="bg-white border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
                <img
                  src="public\mask.png"
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                />
            {/* e
            {/* <Mail className="h-8 w-8 text-red-500" /> */}
            <h1 className="text-xl font-semibold text-foreground">Money Heist: Dubai</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* >>> TIMER: badge */}
            <div
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                isTimeUp ? 'bg-red-100 text-red-700 border-red-300'
                : timeLeft <= 60 ? 'bg-amber-100 text-amber-700 border-amber-300'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
              }`}
              title="Time remaining"
            >
              ⏱ {formatTime(timeLeft)}
            </div>
            {/* <<< TIMER */}
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                placeholder="Search vault codes..." 
                className="pl-10 w-64 bg-muted/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b border-border p-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Email hack Progress</span>
            <span className="text-sm text-muted-foreground">
              {emailStatuses.filter(s => s.solved).length}/{emails.length} Complete
            </span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
          {/* Gmail Sidebar */}
          <div className="bg-background">
            <div className="space-y-2 mb-6">
              <Button variant="default" className="w-full justify-start bg-red-500 hover:bg-red-600">
                <Mail className="h-4 w-4 mr-2" />
                Inbox ({emails.length - emailStatuses.filter(s => s.solved).length})
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Archive className="h-4 w-4 mr-2" />
                Vault Access
              </Button>
            </div>
            
            <h3 className="text-sm font-medium mb-3 text-muted-foreground">VAULT COMMUNICATIONS</h3>
            
            <div className="space-y-1 overflow-y-auto">
              {emails.map((email) => {
                const status = getEmailStatus(email.id);
                const isSelected = selectedEmail?.id === email.id;
                const isSolved = status?.solved;
                
                return (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all border
                      ${isSelected ? 'bg-accent border-primary' : 'bg-background hover:bg-muted/50 border-transparent'}
                      ${isSolved ? 'opacity-60' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        {isSolved ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs text-muted-foreground font-medium">
                          {email.sender}
                        </span>
                      </div>
                      {status?.attempts > 0 && !isSolved && (
                        <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                          {status.attempts} failed
                        </span>
                      )}
                    </div>
                    <div className={`text-sm font-medium ${isSolved ? 'line-through' : ''}`}>
                      {email.subject}
                    </div>
                    {isSolved && (
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">SOLVED</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gmail Email Viewer */}
          <Card className="lg:col-span-2 bg-white shadow-sm">
            {selectedEmail ? (
              <div className="h-full flex flex-col">
                {/* Email Header */}
                <div className="border-b border-border p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-foreground">{selectedEmail.subject}</h2>
                    {getEmailStatus(selectedEmail.id)?.solved && (
                      <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">VAULT UNLOCKED</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="font-medium">{selectedEmail.sender}</span>
                    <span>•</span>
                    <span>Confidential Vault Communication</span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose max-w-none text-foreground leading-relaxed">
                    {selectedEmail.body}
                  </div>
                </div>

                {/* Input Section */}
                {!getEmailStatus(selectedEmail.id)?.solved && (
                  <div className="border-t border-border p-6 bg-muted/20">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Enter Vault Access Code:
                        </label>
                        <Input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={isTimeUp ? "Time's up" : "Enter the code to unlock this vault..."}
                          className="bg-background border-border"
                          autoComplete="off"
                          disabled={isTimeUp}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-red-500 hover:bg-red-600"
                        disabled={!inputValue.trim() || isTimeUp}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Unlock Vault
                      </Button>
                    </form>
                  </div>
                )}

                {/* Status Message */}
                {message && (
                  <div className={`
                    p-4 text-center font-medium
                    ${message.type === 'success' ? 'bg-green-50 text-green-800 border-t border-green-200' : ''}
                    ${message.type === 'error' ? 'bg-red-50 text-red-800 border-t border-red-200' : ''}
                  `}>
                    {message.text}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                  <Mail className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground">Select an email to view</p>
                  <p className="text-sm text-muted-foreground">Choose a vault communication from the sidebar to start</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* All emails solved message */}
      {solvedCount === emails.length && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-white p-8 text-center max-w-md shadow-xl">
            <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">🎯 Act 1 COMPLETE!</h2>
            <p className="text-muted-foreground mb-4">
              All vault access codes cracked successfully. 
            </p>
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
              ✅ All vaults unlocked - Mission accomplished
            </div>
            <div className="mt-6">
              <Link to="/act2">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3">
                  Proceed to Act 2
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {/* >>> TIMER: time up overlay */}
      {isTimeUp && solvedCount !== emails.length && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-white p-8 text-center max-w-md shadow-xl">
            <AlertTriangle className="h-16 w-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Time’s Up</h2>
            <p className="text-muted-foreground mb-4">
              The system locked you out before all codes were cracked.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/">
                <Button variant="outline">Return to Menu</Button>
              </Link>
              <Button onClick={() => window.location.reload()} className="bg-red-500 hover:bg-red-600 text-white">
                Restart Act 1
              </Button>
            </div>
          </Card>
        </div>
      )}
      {/* <<< TIMER */}
    </div>
  );
};

export default Act1Infiltration;
