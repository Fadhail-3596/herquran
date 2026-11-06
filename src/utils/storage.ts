import { UserReflection } from '../types';

const REFLECTIONS_STORAGE_KEY = 'herquran_user_reflections';
const DRAFT_STORAGE_KEY = 'herquran_reflection_draft';
const FAVORITES_STORAGE_KEY = 'herquran_favorite_reflections';

export const getSavedReflections = (): UserReflection[] => {
  try {
    const raw = localStorage.getItem(REFLECTIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load reflections', e);
    return [];
  }
};

export const saveUserReflection = (reflection: Omit<UserReflection, 'id' | 'createdAt'>): UserReflection => {
  const all = getSavedReflections();
  const newReflection: UserReflection = {
    ...reflection,
    id: 'ref_' + Date.now(),
    createdAt: new Date().toISOString()
  };
  try {
    localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify([newReflection, ...all]));
  } catch (e) {
    console.error('Failed to save reflection', e);
  }
  return newReflection;
};

export const deleteUserReflection = (id: string): void => {
  const all = getSavedReflections().filter(r => r.id !== id);
  try {
    localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to delete reflection', e);
  }
};

export const getSavedDraft = (): Partial<UserReflection> | null => {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveDraft = (draft: Partial<UserReflection>): void => {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (e) {
    console.error('Failed to save draft', e);
  }
};

export const clearDraft = (): void => {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear draft', e);
  }
};

export const getFavoriteReflections = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['reflection-maryam-purity'];
  } catch {
    return ['reflection-maryam-purity'];
  }
};

export const toggleFavoriteReflection = (reflectionId: string): string[] => {
  const favs = getFavoriteReflections();
  const exists = favs.includes(reflectionId);
  const updated = exists ? favs.filter(id => id !== reflectionId) : [...favs, reflectionId];
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update favorites', e);
  }
  return updated;
};
