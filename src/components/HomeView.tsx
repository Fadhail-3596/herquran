import React from 'react';
import { CHARACTERS } from '../data/characters';
import { WomanCharacter } from '../types';
import { TodaysReflectionSection } from './TodaysReflectionSection';
import { CharacterCard } from './CharacterCard';
import {
  Sparkles,
  BookOpen,
  Search,
  PenLine,
  ArrowRight
} from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tab: string) => void;
  onSelectCharacter: (character: WomanCharacter) => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateToShare: (characterId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onSelectCharacter,
  favoriteIds,
  onToggleFavorite,
  onNavigateToShare
}) => {
  // 3 featured characters for the editorial row
  const featuredCharacters = CHARACTERS.filter((c) =>
    ['maryam', 'asiyah', 'bilqis'].includes(c.id)
  );

  return (
    <div className="space-y-14 sm:space-y-20 pb-12">
      {/* Hero Section */}
      <section className="pt-6 sm:pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (7 cols): Editorial Headline & Minimal Subtitle */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7EFE9] text-[#374E3D] text-xs font-heading font-semibold shadow-2xs">
                <img
                  src="/herquran-app-icon.png"
                  alt="HERQURAN Icon"
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span>Modern Islamic Digital Space for Muslimah</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#223026] tracking-tight leading-[1.18]">
                  Discover Her Story.<br />
                  <span className="font-serif italic font-normal text-[#57785F]">
                    Reflect on Your Story.
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[#614F42] max-w-lg mx-auto lg:mx-0 pt-1 leading-relaxed">
                  Temukan keteguhan, hikmah, dan refleksi hidup dari kisah perempuan dalam Al-Qur'an.
                </p>
              </div>

              {/* Two Primary Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onSelectTab('quiz')}
                  className="px-6 py-3 rounded-xl bg-[#46634D] hover:bg-[#374E3D] text-white text-xs font-heading font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Find Your Character</span>
                </button>

                <button
                  onClick={() => onSelectTab('explore')}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-[#F8F6F4] text-[#374E3D] border border-[#EDE7E1] text-xs font-heading font-semibold transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Explore Stories</span>
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Soft Watercolor Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#EDE7E1] shadow-sm bg-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/src/assets/images/herquran_hero_banner_1793952405073.jpg"
                  alt="Ilustrasi tenang cat air HERQURAN"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-5">
                  <span className="text-white text-xs font-serif italic drop-shadow-sm">
                    "Dan Kami ceritakan kepadamu kisah-kisah penuh hikmah."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features: 4 Clickable Editorial Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Find Your Character */}
          <article
            onClick={() => onSelectTab('quiz')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border border-[#EDE7E1] hover:border-[#46634D] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAECF0] text-[#C26C80] flex items-center justify-center transition-transform group-hover:scale-105">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#223026] group-hover:text-[#46634D] transition-colors">
                  Find Your Character
                </h3>
                <p className="text-xs text-[#7A6555] leading-relaxed mt-1">
                  Kuis refleksi untuk menemukan tokoh yang relevan dengan karaktermu.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-[#46634D]">
              <span>Mulai Kuis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>

          {/* 2. Explore Her Stories */}
          <article
            onClick={() => onSelectTab('explore')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border border-[#EDE7E1] hover:border-[#46634D] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7EFE9] text-[#374E3D] flex items-center justify-center transition-transform group-hover:scale-105">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#223026] group-hover:text-[#46634D] transition-colors">
                  Explore Her Stories
                </h3>
                <p className="text-xs text-[#7A6555] leading-relaxed mt-1">
                  Database tokoh perempuan dalam Al-Qur'an dan pelajaran hidupnya.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-[#46634D]">
              <span>Buka Database</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>

          {/* 3. Qur'an Search */}
          <article
            onClick={() => onSelectTab('search')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border border-[#EDE7E1] hover:border-[#46634D] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F8F6F4] text-[#7A6555] flex items-center justify-center transition-transform group-hover:scale-105">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#223026] group-hover:text-[#46634D] transition-colors">
                  Qur'an Search
                </h3>
                <p className="text-xs text-[#7A6555] leading-relaxed mt-1">
                  Pencarian ayat dan konteks kisah berdasarkan terjemahan Kemenag RI.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-[#46634D]">
              <span>Cari Ayat</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>

          {/* 4. Share Your Story */}
          <article
            onClick={() => onSelectTab('share')}
            className="group cursor-pointer bg-white rounded-2xl p-5 border border-[#EDE7E1] hover:border-[#46634D] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FCFAF7] border border-[#EDE7E1] text-[#57785F] flex items-center justify-center transition-transform group-hover:scale-105">
                <PenLine className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[#223026] group-hover:text-[#46634D] transition-colors">
                  Share Your Story
                </h3>
                <p className="text-xs text-[#7A6555] leading-relaxed mt-1">
                  Tulis catatan refleksi pribadi dan ekspor ke kartu Instagram Story.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-[#46634D]">
              <span>Tulis Jurnal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        </div>
      </section>

      {/* Today's Reflection Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TodaysReflectionSection
          favoriteIds={favoriteIds}
          onToggleFavorite={onToggleFavorite}
          onSelectCharacter={onSelectCharacter}
          onNavigateToShare={onNavigateToShare}
        />
      </div>

      {/* Featured Characters: Max 3 Cards Desktop, Horizontal Scroll on Mobile */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#223026]">
              Tokoh Pilihan
            </h2>
            <p className="text-xs text-[#7A6555] mt-0.5">
              Sosok teladan perempuan dalam Al-Qur'an
            </p>
          </div>

          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs font-heading font-semibold text-[#46634D] hover:underline flex items-center gap-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Grid: 3 cols on desktop, horizontal scroll on mobile */}
        <div className="flex sm:grid sm:grid-cols-3 gap-5 overflow-x-auto pb-4 sm:pb-0 snap-x snap-mandatory">
          {featuredCharacters.map((character) => (
            <div
              key={character.id}
              className="min-w-[280px] sm:min-w-0 flex-1 snap-center"
            >
              <CharacterCard
                character={character}
                onSelect={onSelectCharacter}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
