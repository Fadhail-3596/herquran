export type QuranMentionStatus =
  | 'DISEBUT_LANGSUNG'
  | 'DISEBUT_KISAH_NAMA_TRADISI'
  | 'DISEBUT_KISAH_IDENTIFIKASI'
  | 'KELOMPOK_PEREMPUAN';

export type CharacterCategory = 'INSPIRATIONAL' | 'WARNING_REFLECTION';

export interface QuranVerse {
  surah: string;
  surahNumber: number;
  ayat: string;
  ayatNumber: number;
  arabic: string;
  translation: string;
  context: string;
  themes: string[];
  characterId: string;
}

export interface WomanCharacter {
  id: string;
  name: string;
  traditionalName?: string;
  quranMentionStatus: QuranMentionStatus;
  quranMentionLabel: string;
  category: CharacterCategory;
  categoryLabel: string;
  tagline: string;
  quranReference: string;
  surahName: string;
  surahNumber: number;
  ayatRange: string;
  summary: string;
  storyBackground: string;
  characterTraits: string[];
  lifeLessons: string[];
  genZTips: string[];
  reflectionQuestion: string;
  verificationStatus: string;
  verificationDetail: string;
  image: string;
  fallbackGradient: string;
  archetype: string;
  keyVerses: {
    surah: string;
    ayat: string;
    arabic: string;
    translation: string;
    context: string;
  }[];
}

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  characterScores: Record<string, number>;
  branchNextQuestionId?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  category: string;
  options: QuizOption[];
}

export interface QuizResult {
  character: WomanCharacter;
  matchPercentage: number;
  secondaryMatches?: { character: WomanCharacter; score: number }[];
  reason: string;
}

export interface UserReflection {
  id: string;
  title: string;
  experience: string;
  characterId: string;
  characterName: string;
  lesson: string;
  personalReflection: string;
  authorName?: string;
  createdAt: string;
}

export interface DailyReflection {
  id: string;
  characterId: string;
  characterName: string;
  surahReference: string;
  shortLesson: string;
  practicalTip: string;
  reflectionQuestion: string;
  verseExcerpt: {
    arabic: string;
    translation: string;
    surah: string;
  };
}
