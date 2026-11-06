import React, { useState } from 'react';
import { WomanCharacter } from '../types';
import {
  X,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  PenLine,
  Search,
  Quote
} from 'lucide-react';

interface CharacterDetailModalProps {
  character: WomanCharacter | null;
  onClose: () => void;
  onNavigateToShare: (characterId: string) => void;
  onNavigateToSearch: (query: string) => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  onClose,
  onNavigateToShare,
  onNavigateToSearch
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    story: true,
    quran: true,
    lessons: true,
    reflection: true
  });

  if (!character) return null;

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-character-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#EDE7E1] shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 border-b border-[#EDE7E1] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#7A6555]">
            <span className="font-semibold text-[#46634D]">HERQURAN Database</span>
            <span aria-hidden="true">·</span>
            <span>{character.categoryLabel}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#614F42] hover:bg-[#EFEBE7] transition-colors focus:outline-none"
            aria-label="Tutup jendela detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image & Title Banner */}
        <div className="relative">
          <div className="h-56 sm:h-72 w-full overflow-hidden bg-[#F4F7F4] relative">
            <img
              src={character.image}
              alt={character.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent" />
          </div>

          <div className="px-6 sm:px-8 -mt-16 relative z-10 space-y-2">
            <div className="bg-white rounded-2xl p-6 border border-[#EDE7E1] shadow-xs space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A6555]">
                <span className="font-medium text-[#46634D]">
                  {character.quranMentionLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span>{character.quranReference}</span>
              </div>

              <h1
                id="modal-character-title"
                className="font-heading font-bold text-2xl sm:text-3xl text-[#223026]"
              >
                {character.name}
              </h1>

              {character.traditionalName && (
                <p className="text-xs text-[#7A6555] italic">
                  Dikenal dalam tradisi: {character.traditionalName}
                </p>
              )}

              <p className="text-sm text-[#57785F] font-serif italic pt-1">
                "{character.tagline}"
              </p>
            </div>
          </div>
        </div>

        {/* Structured Sections (Accordion style) */}
        <div className="p-6 sm:p-8 space-y-4">
          {/* Section 1: Story */}
          <div className="bg-white rounded-2xl border border-[#EDE7E1] overflow-hidden">
            <button
              onClick={() => toggleSection('story')}
              className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-heading font-bold text-[#223026] hover:bg-[#FCFAF7] transition-colors"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#46634D]" />
                <span>1. Kisah & Latar Belakang</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7A6555] transition-transform duration-200 ${
                  openSections.story ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.story && (
              <div className="px-6 pb-6 pt-2 text-sm text-[#4D3D32] space-y-3 leading-relaxed border-t border-[#F8F6F4]">
                <p>{character.summary}</p>
                <div className="p-4 bg-[#FAF7F2] rounded-xl text-xs text-[#614F42] leading-relaxed">
                  <strong className="block text-[#46634D] mb-1">Konteks Al-Qur'an:</strong>
                  {character.storyBackground}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Qur'anic References */}
          <div className="bg-white rounded-2xl border border-[#EDE7E1] overflow-hidden">
            <button
              onClick={() => toggleSection('quran')}
              className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-heading font-bold text-[#223026] hover:bg-[#FCFAF7] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#46634D]" />
                <span>2. Referensi Al-Qur'an</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7A6555] transition-transform duration-200 ${
                  openSections.quran ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.quran && (
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-[#F8F6F4]">
                {character.keyVerses.map((verse, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF7F2] rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#7A6555]">
                      <span className="font-semibold text-[#46634D]">
                        QS. {verse.surah} ({verse.ayat})
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToSearch(verse.surah);
                        }}
                        className="text-[11px] text-[#57785F] hover:underline flex items-center gap-1"
                      >
                        <Search className="w-3 h-3" />
                        <span>Cari di Qur'an Search</span>
                      </button>
                    </div>

                    <p
                      dir="rtl"
                      className="font-arabic text-xl sm:text-2xl text-right leading-loose text-[#223026] py-1"
                    >
                      {verse.arabic}
                    </p>

                    <p className="text-xs sm:text-sm text-[#4D3D32] italic font-serif leading-relaxed">
                      "{verse.translation}"
                    </p>

                    <p className="text-[11px] text-[#7A6555] pt-1">
                      <strong className="text-[#46634D]">Tadabbur:</strong> {verse.context}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Lessons & Gen Z Tips */}
          <div className="bg-white rounded-2xl border border-[#EDE7E1] overflow-hidden">
            <button
              onClick={() => toggleSection('lessons')}
              className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-heading font-bold text-[#223026] hover:bg-[#FCFAF7] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C26C80]" />
                <span>3. Hikmah & Tips Kehidupan</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#7A6555] transition-transform duration-200 ${
                  openSections.lessons ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.lessons && (
              <div className="px-6 pb-6 pt-2 space-y-4 border-t border-[#F8F6F4]">
                <div className="space-y-2">
                  <h4 className="text-xs font-heading font-semibold text-[#7A6555] uppercase tracking-wider">
                    Pelajaran Utama:
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#4D3D32]">
                    {character.lifeLessons.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#46634D] mt-2 shrink-0" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#E7EFE9]/50 rounded-xl space-y-2">
                  <h4 className="text-xs font-heading font-semibold text-[#374E3D] uppercase tracking-wider">
                    Tips untuk Perempuan Masa Kini:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#2C3E31]">
                    {character.genZTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C26C80] mt-1.5 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Life Reflection */}
          <div className="bg-gradient-to-br from-[#FAF7F2] to-[#FAECF0]/40 rounded-2xl p-6 border border-[#E9B8C5]/60 text-center space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C26C80]">
              Pertanyaan Refleksi Untukmu
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#271E18] max-w-lg mx-auto">
              "{character.reflectionQuestion}"
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToShare(character.id);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#46634D] hover:bg-[#374E3D] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center gap-2"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Tulis Refleksimu Sendiri</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer with Verification Note */}
        <div className="px-6 py-4 bg-[#F8F6F4] border-t border-[#EDE7E1] flex items-center justify-between text-xs text-[#7A6555]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#57785F]" />
            <span>{character.verificationStatus}</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#EDE7E1] rounded-lg text-xs font-medium text-[#4D3D32] hover:bg-[#EFEBE7]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
