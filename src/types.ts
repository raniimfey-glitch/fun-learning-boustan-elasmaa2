export type NounCategory = 'human' | 'animal' | 'plant' | 'object' | 'place';

export type NounSign = 'al' | 'tanween' | 'ta_marbuta' | 'harf_jarr';

export interface NounItem {
  id: string;
  word: string; // مشكولة
  category: NounCategory;
  categoryNameAr: string;
  meaning: string;
  icon: string; // Emoji / SVG symbol
  imageDesc?: string;
  exampleSentence: string; // مشكولة
  signs: NounSign[];
  color: string;
}

export interface LessonTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  examples: NounItem[];
  color: string;
  audioPrompt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  options: {
    id: string;
    text: string; // مشكولة
    isCorrect: boolean;
    explanation: string;
  }[];
  category?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredStars: number;
}

export interface StickerGift {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  costStars: number;
  unlockedMessage: string;
}

export type ActiveTab = 'home' | 'lessons' | 'sorting' | 'signs' | 'hunter' | 'story' | 'quiz' | 'rewards';
