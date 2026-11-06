import React, { useState } from 'react';
import { WomanCharacter } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CharacterCardProps {
  character: WomanCharacter;
  onSelect: (character: WomanCharacter) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const isInspirational = character.category === 'INSPIRATIONAL';

  return (
    <article
      onClick={() => onSelect(character)}
      className="group cursor-pointer bg-white rounded-2xl border border-[#EDE7E1] hover:border-[#CFDFD3] transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-md hover:-translate-y-1"
    >
      {/* Visual illustration top frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F7F4]">
        {!imageError && character.image ? (
          <img
            src={character.image}
            alt={character.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${character.fallbackGradient} flex flex-col items-center justify-center p-6 text-center`}
          >
            <span className="font-heading font-semibold text-lg text-[#223026]">
              {character.name}
            </span>
          </div>
        )}

        {/* Subtle scrim at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Quiet category indicator */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs drop-shadow-sm font-medium">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isInspirational ? 'bg-[#ABC4B1]' : 'bg-[#E9B8C5]'
              }`}
            />
            <span className="text-[11px] tracking-wide">{character.categoryLabel}</span>
          </span>
          <span className="text-[11px] font-mono opacity-90">{character.surahName}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-heading font-bold text-lg text-[#223026] group-hover:text-[#46634D] transition-colors leading-snug">
              {character.name}
            </h3>
            <div className="w-7 h-7 rounded-full bg-[#FAF7F2] group-hover:bg-[#E7EFE9] flex items-center justify-center text-[#614F42] group-hover:text-[#374E3D] transition-colors shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <p className="text-xs text-[#7A6555] font-serif italic line-clamp-1">
            "{character.tagline}"
          </p>
        </div>

        {/* Clean footer line */}
        <div className="pt-3 border-t border-[#F8F6F4] flex items-center justify-between text-xs text-[#7A6555]">
          <span className="truncate">{character.quranReference.split(',')[0]}</span>
          <span className="font-medium text-[#46634D] text-[11px] group-hover:underline shrink-0">
            Baca Kisah
          </span>
        </div>
      </div>
    </article>
  );
};
