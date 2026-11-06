import React, { useState } from 'react';
import { DAILY_REFLECTIONS } from '../data/dailyReflections';
import { CHARACTERS } from '../data/characters';
import { WomanCharacter } from '../types';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface TodaysReflectionSectionProps {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCharacter: (character: WomanCharacter) => void;
  onNavigateToShare: (characterId: string) => void;
}

export const TodaysReflectionSection: React.FC<TodaysReflectionSectionProps> = ({
  favoriteIds,
  onToggleFavorite,
  onSelectCharacter,
  onNavigateToShare
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reflection = DAILY_REFLECTIONS[currentIndex];
  const isFavorite = favoriteIds.includes(reflection.id);
  const character = CHARACTERS.find((c) => c.id === reflection.characterId);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : DAILY_REFLECTIONS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < DAILY_REFLECTIONS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="bg-white rounded-3xl border border-[#EDE7E1] p-6 sm:p-10 shadow-xs relative overflow-hidden">
      {/* Top Bar: Title & Controls */}
      <div className="flex items-center justify-between border-b border-[#F3ECE2] pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#46634D]" />
          <h2 className="font-heading font-bold text-lg text-[#223026]">
            Today's Reflection
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Favorite Bookmark */}
          <button
            onClick={() => onToggleFavorite(reflection.id)}
            className={`p-2 rounded-xl transition-all ${
              isFavorite
                ? 'bg-[#FAECF0] text-[#C26C80]'
                : 'text-[#7A6555] hover:bg-[#F8F6F4]'
            }`}
            aria-label={isFavorite ? 'Hapus dari tersimpan' : 'Simpan refleksi'}
            title={isFavorite ? 'Tersimpan' : 'Simpan refleksi'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#C26C80]' : ''}`} />
          </button>

          {/* Carousel Controls */}
          <div className="flex items-center gap-1 border-l border-[#EDE7E1] pl-3">
            <button
              onClick={handlePrev}
              className="p-1 rounded-lg text-[#614F42] hover:bg-[#F8F6F4] transition-colors"
              aria-label="Refleksi sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-[#7A6555] px-1">
              {currentIndex + 1}/{DAILY_REFLECTIONS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1 rounded-lg text-[#614F42] hover:bg-[#F8F6F4] transition-colors"
              aria-label="Refleksi berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Verse Quote & Identity */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-heading font-semibold text-[#46634D] uppercase tracking-wider">
              {reflection.characterName}
            </span>
            <p className="font-serif italic text-xl sm:text-2xl text-[#223026] leading-snug">
              "{reflection.shortLesson}"
            </p>
          </div>

          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EDE7E1]/60 space-y-1.5">
            <p
              dir="rtl"
              className="font-arabic text-xl sm:text-2xl text-right leading-loose text-[#2C3E31]"
            >
              {reflection.verseExcerpt.arabic}
            </p>
            <p className="text-xs text-[#614F42] italic">
              "{reflection.verseExcerpt.translation}" —{' '}
              <span className="font-mono text-[11px] not-italic text-[#7A6555]">
                {reflection.verseExcerpt.surah}
              </span>
            </p>
          </div>
        </div>

        {/* Right: Reflection Prompt & Action */}
        <div className="md:col-span-5 bg-[#FCFAF7] rounded-2xl p-6 border border-[#EDE7E1] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#C26C80]">
              Pertanyaan untuk Hatimu
            </span>
            <p className="font-serif italic text-sm text-[#3A2E25] leading-relaxed">
              "{reflection.reflectionQuestion}"
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2.5">
            {character && (
              <button
                onClick={() => onSelectCharacter(character)}
                className="px-4 py-2 rounded-xl bg-[#46634D] hover:bg-[#374E3D] text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => onNavigateToShare(reflection.characterId)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#F8F6F4] text-xs font-medium transition-colors"
            >
              Tulis Refleksi
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
