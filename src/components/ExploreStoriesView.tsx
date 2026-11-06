import React, { useState, useMemo } from 'react';
import { CHARACTERS } from '../data/characters';
import { WomanCharacter, CharacterCategory, QuranMentionStatus } from '../types';
import { CharacterCard } from './CharacterCard';
import { Search, X } from 'lucide-react';

interface ExploreStoriesViewProps {
  onSelectCharacter: (character: WomanCharacter) => void;
}

export const ExploreStoriesView: React.FC<ExploreStoriesViewProps> = ({
  onSelectCharacter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CharacterCategory | 'ALL'>('ALL');
  const [selectedMentionStatus, setSelectedMentionStatus] = useState<QuranMentionStatus | 'ALL'>('ALL');

  const inspirationalCount = CHARACTERS.filter((c) => c.category === 'INSPIRATIONAL').length;
  const warningCount = CHARACTERS.filter((c) => c.category === 'WARNING_REFLECTION').length;

  const filteredCharacters = useMemo(() => {
    return CHARACTERS.filter((char) => {
      if (selectedCategory !== 'ALL' && char.category !== selectedCategory) {
        return false;
      }
      if (selectedMentionStatus !== 'ALL' && char.quranMentionStatus !== selectedMentionStatus) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = char.name.toLowerCase().includes(q);
        const matchTrad = char.traditionalName?.toLowerCase().includes(q) || false;
        const matchTagline = char.tagline.toLowerCase().includes(q);
        const matchSummary = char.summary.toLowerCase().includes(q);
        const matchRef = char.quranReference.toLowerCase().includes(q);
        return matchName || matchTrad || matchTagline || matchSummary || matchRef;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedMentionStatus]);

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#223026]">
          Explore Her Stories
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6555] max-w-md mx-auto">
          Database tokoh perempuan dalam Al-Qur'an dan hikmah untuk perempuan masa kini.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search className="w-4 h-4 text-[#7F9F86] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama tokoh (Maryam, Asiyah, Bilqis)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] placeholder:text-[#9E8A79] outline-none transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6555] hover:text-[#223026]"
              aria-label="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-lg font-heading font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'ALL'
                ? 'bg-[#46634D] text-white'
                : 'bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#FAF7F2]'
            }`}
          >
            Semua ({CHARACTERS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('INSPIRATIONAL')}
            className={`px-3.5 py-1.5 rounded-lg font-heading font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'INSPIRATIONAL'
                ? 'bg-[#46634D] text-white'
                : 'bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#FAF7F2]'
            }`}
          >
            Role Models & Inspirasi ({inspirationalCount})
          </button>
          <button
            onClick={() => setSelectedCategory('WARNING_REFLECTION')}
            className={`px-3.5 py-1.5 rounded-lg font-heading font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'WARNING_REFLECTION'
                ? 'bg-[#46634D] text-white'
                : 'bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#FAF7F2]'
            }`}
          >
            Pelajaran & Refleksi ({warningCount})
          </button>
        </div>
      </div>

      {/* Grid of Characters: 3 columns desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={onSelectCharacter}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-[#EDE7E1] space-y-2">
            <p className="font-heading font-semibold text-sm text-[#223026]">
              Tidak Ada Tokoh yang Cocok
            </p>
            <p className="text-xs text-[#7A6555]">
              Coba sesuaikan kata kunci pencarian atau reset filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedMentionStatus('ALL');
              }}
              className="text-xs font-semibold text-[#46634D] underline"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
