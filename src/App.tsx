import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ExploreStoriesView } from './components/ExploreStoriesView';
import { FindYourCharacterQuiz } from './components/FindYourCharacterQuiz';
import { QuranSearch } from './components/QuranSearch';
import { ShareYourStory } from './components/ShareYourStory';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { WomanCharacter } from './types';
import { getFavoriteReflections, toggleFavoriteReflection } from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<WomanCharacter | null>(null);
  const [shareCharacterId, setShareCharacterId] = useState<string | undefined>(undefined);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavoriteReflections());
  const [favoritesModalOpen, setFavoritesModalOpen] = useState<boolean>(false);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCharacter = (character: WomanCharacter) => {
    setSelectedCharacter(character);
  };

  const handleNavigateToShare = (charId: string) => {
    setShareCharacterId(charId);
    setCurrentTab('share');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSearch = (query: string) => {
    setSearchInitialQuery(query);
    setCurrentTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavoriteReflection(id);
    setFavoriteIds(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A2724] font-sans selection:bg-[#E7EFE9] selection:text-[#223026]">
      {/* Top Navbar & Mobile Bottom Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setFavoritesModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onSelectCharacter={handleSelectCharacter}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToShare={handleNavigateToShare}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreStoriesView onSelectCharacter={handleSelectCharacter} />
        )}

        {currentTab === 'quiz' && (
          <FindYourCharacterQuiz
            onSelectCharacter={handleSelectCharacter}
            onNavigateToShare={handleNavigateToShare}
          />
        )}

        {currentTab === 'search' && (
          <QuranSearch
            initialQuery={searchInitialQuery}
            onSelectCharacter={handleSelectCharacter}
          />
        )}

        {currentTab === 'share' && (
          <ShareYourStory initialCharacterId={shareCharacterId} />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Modals & Overlays */}
      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        onNavigateToShare={handleNavigateToShare}
        onNavigateToSearch={handleNavigateToSearch}
      />

      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favoriteIds={favoriteIds}
        onRemoveFavorite={handleToggleFavorite}
        onSelectCharacter={handleSelectCharacter}
        onNavigateToShare={handleNavigateToShare}
      />
    </div>
  );
}
