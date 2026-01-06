
export enum AppView {
  CHAT = 'CHAT',
  IMAGE = 'IMAGE',
  RESEARCH = 'RESEARCH',
  SETTINGS = 'SETTINGS'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  sources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}
