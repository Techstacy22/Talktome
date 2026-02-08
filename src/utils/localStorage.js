// TalkToMe localStorage utility
import { v4 as uuidv4 } from 'uuid';

export const STORAGE_KEYS = {
  USER: 'ttm_user',
  CONVERSATIONS: 'ttm_conversations',
  JOURNAL: 'ttm_journal',
  THOUGHT_MAPS: 'ttm_maps',
  PATTERNS: 'ttm_patterns',
  MOODS: 'ttm_moods'
};

// Generic localStorage helpers
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

// Conversation helpers
export const saveConversation = (messages, emotions = [], insights = []) => {
  const conversations = getItem(STORAGE_KEYS.CONVERSATIONS) || [];
  const conversation = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    messages,
    emotions,
    insights
  };
  conversations.unshift(conversation);
  setItem(STORAGE_KEYS.CONVERSATIONS, conversations);
  return conversation;
};

export const getConversations = () => {
  return getItem(STORAGE_KEYS.CONVERSATIONS) || [];
};

// Journal helpers
export const saveJournalEntry = (content, mood, tags = []) => {
  const entries = getItem(STORAGE_KEYS.JOURNAL) || [];
  const entry = {
    id: uuidv4(),
    content,
    mood,
    tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  entries.unshift(entry);
  setItem(STORAGE_KEYS.JOURNAL, entries);
  return entry;
};

export const updateJournalEntry = (id, updates) => {
  const entries = getItem(STORAGE_KEYS.JOURNAL) || [];
  const index = entries.findIndex(e => e.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updates, updatedAt: new Date().toISOString() };
    setItem(STORAGE_KEYS.JOURNAL, entries);
    return entries[index];
  }
  return null;
};

export const deleteJournalEntry = (id) => {
  const entries = getItem(STORAGE_KEYS.JOURNAL) || [];
  const filtered = entries.filter(e => e.id !== id);
  setItem(STORAGE_KEYS.JOURNAL, filtered);
};

export const getJournalEntries = () => {
  return getItem(STORAGE_KEYS.JOURNAL) || [];
};

// Mood tracking helpers
export const saveMood = (score, label, notes = '') => {
  const moods = getItem(STORAGE_KEYS.MOODS) || [];
  const mood = {
    id: uuidv4(),
    score,
    label,
    notes,
    timestamp: new Date().toISOString()
  };
  moods.unshift(mood);
  setItem(STORAGE_KEYS.MOODS, moods);
  return mood;
};

export const getMoods = (days = 30) => {
  const moods = getItem(STORAGE_KEYS.MOODS) || [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return moods.filter(m => new Date(m.timestamp) >= cutoff);
};

// Thought map helpers
export const saveThoughtMap = (nodes, connections, conversationId = null) => {
  const maps = getItem(STORAGE_KEYS.THOUGHT_MAPS) || [];
  const map = {
    id: uuidv4(),
    conversationId,
    nodes,
    connections,
    createdAt: new Date().toISOString()
  };
  maps.unshift(map);
  setItem(STORAGE_KEYS.THOUGHT_MAPS, maps);
  return map;
};

export const getThoughtMaps = () => {
  return getItem(STORAGE_KEYS.THOUGHT_MAPS) || [];
};

// Pattern helpers
export const savePattern = (type, description, frequency = 1) => {
  const patterns = getItem(STORAGE_KEYS.PATTERNS) || [];
  const existing = patterns.find(p => p.description === description);

  if (existing) {
    existing.frequency += 1;
    existing.lastSeen = new Date().toISOString();
    setItem(STORAGE_KEYS.PATTERNS, patterns);
    return existing;
  }

  const pattern = {
    id: uuidv4(),
    type,
    description,
    frequency,
    firstDetected: new Date().toISOString(),
    lastSeen: new Date().toISOString()
  };
  patterns.unshift(pattern);
  setItem(STORAGE_KEYS.PATTERNS, patterns);
  return pattern;
};

export const getPatterns = () => {
  return getItem(STORAGE_KEYS.PATTERNS) || [];
};
