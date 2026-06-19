export interface WordPair {
  id: string;
  spanish: string;
  armenian: string;
  category: string;
  exampleSpanish: string;
  exampleArmenian: string;
  hint?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface SentenceItem {
  id: number;
  spanish: string;
  armenian: string;
  notes?: string;
  location?: string; // e.g. Airport, Hotel, Restaurant, City
}

export interface StoryTheme {
  id: string;
  titleEs: string;
  titleAm: string;
  emoji: string;
  description: string;
  sentences: SentenceItem[];
}

export interface PlayerStats {
  score: number;
  streak: number;
  completedGames: string[];
  lastPlayed: string;
}

export interface PlayerProfile {
  name: 'Gor' | 'Gayane' | 'Both';
  stars: number;
  stats: {
    reader: number;
    quiz: number;
    game1: number; // Word Match
    game2: number; // Word Builder
    game3: number; // Speed Translator
    game4: number; // Fill in the blanks
    game5: number; // Memory Match
    game6: number; // Sentence Constructor
  };
}
