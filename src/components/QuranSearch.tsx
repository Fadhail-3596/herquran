import React, { useState, useMemo } from 'react';
import { QURAN_VERSES } from '../data/verses';
import { CHARACTERS } from '../data/characters';
import { WomanCharacter, QuranVerse } from '../types';
import { Search, ExternalLink, X } from 'lucide-react';

interface QuranSearchProps {
  initialQuery?: string;
  onSelectCharacter: (character: WomanCharacter) => void;
}

export const QuranSearch: React.FC<QuranSearchProps> = ({
  initialQuery = '',
  onSelectCharacter
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  const popularSuggestions = [
    'Maryam',
    'Ibu Nabi Musa',
    'Kesabaran',
    'Ratu Saba\'',
    'Tawakkal',
    'Haya\' (Malu)',
    'Keadilan'
  ];

  const allThemes = useMemo(() => {
    const set = new Set<string>();
    QURAN_VERSES.forEach((v) => {
      v.themes.forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 8);
  }, []);

  const filteredVerses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return QURAN_VERSES.filter((verse) => {
      if (selectedTheme !== 'all') {
        const hasTheme = verse.themes.some(
          (t) => t.toLowerCase() === selectedTheme.toLowerCase()
        );
        if (!hasTheme) return false;
      }

      if (!q) return true;

      const matchSurah = verse.surah.toLowerCase().includes(q);
      const matchAyat = verse.ayat.toLowerCase().includes(q);
      const matchTranslation = verse.translation.toLowerCase().includes(q);
      const matchContext = verse.context.toLowerCase().includes(q);
      const matchThemes = verse.themes.some((t) => t.toLowerCase().includes(q));

      const character = CHARACTERS.find((c) => c.id === verse.characterId);
      const matchChar =
        character?.name.toLowerCase().includes(q) ||
        character?.traditionalName?.toLowerCase().includes(q) ||
        false;

      return matchSurah || matchAyat || matchTranslation || matchContext || matchThemes || matchChar;
    });
  }, [searchQuery, selectedTheme]);

  const getCharacter = (characterId: string): WomanCharacter | undefined => {
    return CHARACTERS.find((c) => c.id === characterId);
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#223026]">
          Qur'an Search
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6555] max-w-md mx-auto">
          Cari ayat, surah, dan konteks kisah perempuan dalam Al-Qur'an (Terjemahan Kemenag RI).
        </p>
      </div>

      {/* Large Clean Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-[#7F9F86] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama tokoh, nomor ayat, atau kata kunci..."
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl bg-white border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] placeholder:text-[#9E8A79] outline-none shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A6555] hover:text-[#223026]"
              aria-label="Hapus kata kunci"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A6555]">
          <span className="text-[11px] font-medium mr-1">Saran:</span>
          {popularSuggestions.map((item) => (
            <button
              key={item}
              onClick={() => setSearchQuery(item)}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#EDE7E1] hover:border-[#CFDFD3] text-[#46634D] transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Category / Theme Filter Tabs */}
        <div className="pt-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTheme('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
              selectedTheme === 'all'
                ? 'bg-[#46634D] text-white'
                : 'bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#FAF7F2]'
            }`}
          >
            Semua
          </button>
          {allThemes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedTheme === theme
                  ? 'bg-[#46634D] text-white'
                  : 'bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#FAF7F2]'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Result Cards */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between text-xs text-[#7A6555] px-1">
          <span>{filteredVerses.length} ayat ditemukan</span>
          <span>Terjemahan Kemenag RI</span>
        </div>

        {filteredVerses.length > 0 ? (
          filteredVerses.map((verse, index) => {
            const char = getCharacter(verse.characterId);
            return (
              <article
                key={index}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EDE7E1] shadow-xs space-y-3 hover:border-[#CFDFD3] transition-all"
              >
                <div className="flex items-center justify-between text-xs text-[#7A6555] border-b border-[#F8F6F4] pb-2">
                  <span className="font-heading font-semibold text-[#223026]">
                    QS. {verse.surah} : {verse.ayat}
                  </span>

                  {char && (
                    <button
                      onClick={() => onSelectCharacter(char)}
                      className="text-[#46634D] hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>{char.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
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

                <div className="pt-1 flex items-center justify-between text-xs text-[#7A6555]">
                  <span className="line-clamp-1 italic">{verse.context}</span>
                  {char && (
                    <button
                      onClick={() => onSelectCharacter(char)}
                      className="text-[#46634D] font-medium text-[11px] shrink-0 hover:underline ml-2"
                    >
                      Baca Kisah →
                    </button>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#EDE7E1] space-y-2">
            <p className="font-heading font-semibold text-sm text-[#223026]">
              Tidak Ditemukan Ayat Terkait
            </p>
            <p className="text-xs text-[#7A6555]">
              Coba cari dengan kata kunci lain atau pilih tema yang tersedia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
