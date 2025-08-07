export interface Email {
  id: number;
  sender: string;
  subject: string;
  body: string;
  answer: string;
}

export interface EmailStatus {
  id: number;
  solved: boolean;
  attempts: number;
}

export interface TerminalMessage {
  type: 'success' | 'error' | 'info';
  text: string;
  timestamp: Date;
}