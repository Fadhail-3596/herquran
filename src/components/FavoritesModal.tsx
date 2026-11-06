import React from 'react';
import { DAILY_REFLECTIONS } from '../data/dailyReflections';
import { CHARACTERS } from '../data/characters';
import { WomanCharacter } from '../types';
import { X, Bookmark, ArrowRight } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  onRemoveFavorite: (id: string) => void;
  onSelectCharacter: (character: WomanCharacter) => void;
  onNavigateToShare: (characterId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteIds,
  onRemoveFavorite,
  onSelectCharacter,
  onNavigateToShare
}) => {
  if (!isOpen) return null;

  const favoriteReflections = DAILY_REFLECTIONS.filter((r) =>
    favoriteIds.includes(r.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Refleksi Tersimpan"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto border border-[#EDE7E1] shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-[#FAF7F2]/95 backdrop-blur-md px-6 py-4 border-b border-[#EDE7E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#46634D] fill-[#46634D]" />
            <h3 className="font-heading font-bold text-base text-[#223026]">
              Refleksi Tersimpan ({favoriteReflections.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#614F42] hover:bg-[#EFEBE7] transition-colors"
            aria-label="Tutup jendela"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {favoriteReflections.length > 0 ? (
            favoriteReflections.map((item) => {
              const char = CHARACTERS.find((c) => c.id === item.characterId);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#EDE7E1] shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs text-[#7A6555] border-b border-[#F8F6F4] pb-2">
                    <span className="font-heading font-semibold text-[#46634D]">
                      {item.characterName}
                    </span>
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="text-[#9E8A79] hover:text-red-500 transition-colors text-[11px]"
                    >
                      Hapus
                    </button>
                  </div>

                  <p className="font-serif italic text-sm text-[#223026] leading-snug">
                    "{item.shortLesson}"
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-2 text-xs">
                    <span className="font-mono text-[10px] text-[#7A6555]">
                      {item.surahReference}
                    </span>

                    <div className="flex items-center gap-2">
                      {char && (
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCharacter(char);
                          }}
                          className="text-[#46634D] font-medium hover:underline text-xs flex items-center gap-1"
                        >
                          <span>Kisah</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToShare(item.characterId);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#46634D] text-white text-[11px] font-medium"
                      >
                        Tulis Jurnal
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center space-y-2">
              <p className="text-xs text-[#7A6555]">
                Belum ada refleksi yang kamu simpan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
