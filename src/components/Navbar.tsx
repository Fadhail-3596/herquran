import React from 'react';
import {
  Compass,
  BookOpen,
  Sparkles,
  Search,
  PenLine,
  Bookmark
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount,
  onOpenFavorites
}) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Compass },
    { id: 'explore', label: 'Tokoh', icon: BookOpen },
    { id: 'quiz', label: 'Kuis', icon: Sparkles },
    { id: 'search', label: 'Cari', icon: Search },
    { id: 'share', label: 'Refleksi', icon: PenLine },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE7E1]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Brand Wordmark */}
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
              aria-label="Kembali ke Beranda HERQURAN"
            >
              <img
                src="/herquran-app-icon.png"
                alt="Logo HERQURAN"
                className="w-9 h-9 rounded-xl shadow-xs transition-transform group-hover:scale-105 object-cover"
              />
              <div>
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-[#223026] block leading-none">
                  HERQURAN
                </span>
                <span className="text-[10px] tracking-widest text-[#7A6555] uppercase font-medium">
                  Reflect on Your Story
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`relative py-1.5 transition-colors whitespace-nowrap text-sm ${
                      isActive
                        ? 'text-[#374E3D] font-semibold'
                        : 'text-[#614F42] hover:text-[#223026]'
                    }`}
                  >
                    <span>{item.label === 'Tokoh' ? 'Database Tokoh' : item.label === 'Kuis' ? 'Find Your Character' : item.label === 'Cari' ? "Qur'an Search" : item.label === 'Refleksi' ? 'Share Your Story' : 'Beranda'}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#46634D] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Bookmark / Favorites */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenFavorites}
                className="p-2 sm:px-3 sm:py-2 rounded-xl text-[#614F42] hover:text-[#374E3D] hover:bg-[#F3ECE2]/70 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#CFDFD3]"
                aria-label={`Lihat Refleksi Tersimpan (${favoritesCount})`}
                title="Refleksi Tersimpan"
              >
                <Bookmark className="w-4 h-4 text-[#7A6555]" />
                <span className="hidden sm:inline text-xs font-medium">Tersimpan</span>
                {favoritesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#E9B8C5] text-[#4D3D32] text-[10px] font-bold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Navigasi Bawah Mobile"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-lg border-t border-[#EDE7E1] px-2 py-1 shadow-lg"
      >
        <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#374E3D] font-semibold'
                    : 'text-[#7A6555] hover:text-[#223026]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#E7EFE9] text-[#374E3D]' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
