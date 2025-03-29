import { PaperContent } from "@/types/paperTypes";

interface HistoryItem {
  id: string;
  videoUrl: string;
  date: string;
  paper: PaperContent;
}

const STORAGE_KEY = 'insight_history';

export const saveToHistory = (videoUrl: string, paper: PaperContent) => {
  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      id: generateId(),
      videoUrl,
      date: new Date().toISOString(),
      paper
    };
    
    // Add to beginning of array
    history.unshift(newItem);
    
    // Keep only the latest 20 items
    const trimmedHistory = history.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    return newItem.id;
  } catch (error) {
    console.error("Error saving to history:", error);
    return null;
  }
};

export const getHistory = (): HistoryItem[] => {
  try {
    const history = localStorage.getItem(STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting history:", error);
    return [];
  }
};

export const getHistoryItem = (id: string): HistoryItem | null => {
  try {
    const history = getHistory();
    return history.find(item => item.id === id) || null;
  } catch (error) {
    console.error("Error getting history item:", error);
    return null;
  }
};

export const deleteHistoryItem = (id: string): boolean => {
  try {
    const history = getHistory();
    const filteredHistory = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    return true;
  } catch (error) {
    console.error("Error deleting history item:", error);
    return false;
  }
};

export const clearHistory = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing history:", error);
    return false;
  }
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
