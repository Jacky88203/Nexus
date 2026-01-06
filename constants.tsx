
import React from 'react';

export const MODELS = {
  TEXT: 'gemini-3-flash-preview',
  IMAGE: 'gemini-2.5-flash-image',
  PRO_TEXT: 'gemini-3-pro-preview',
};

export const Icons = {
  Chat: () => <i className="fa-solid fa-message"></i>,
  Image: () => <i className="fa-solid fa-wand-magic-sparkles"></i>,
  Search: () => <i className="fa-solid fa-earth-americas"></i>,
  Settings: () => <i className="fa-solid fa-gear"></i>,
  Send: () => <i className="fa-solid fa-paper-plane"></i>,
  User: () => <i className="fa-solid fa-user"></i>,
  Assistant: () => <i className="fa-solid fa-robot"></i>,
  Copy: () => <i className="fa-solid fa-copy"></i>,
  Download: () => <i className="fa-solid fa-download"></i>,
  ChevronRight: () => <i className="fa-solid fa-chevron-right"></i>,
  Trash: () => <i className="fa-solid fa-trash"></i>,
};
