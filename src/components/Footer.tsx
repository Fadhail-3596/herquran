import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-[#EDE7E1] bg-[#FAF7F2] text-[#7A6555] py-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <img
            src="/herquran-app-icon.png"
            alt="Logo HERQURAN"
            className="w-6 h-6 rounded-md object-cover"
          />
          <span className="font-heading font-bold text-[#223026] text-sm">HERQURAN</span>
          <span aria-hidden="true" className="text-[#DDD5CD]">·</span>
          <span>Discover Her Story. Reflect on Your Story.</span>
        </div>

        <nav className="flex items-center gap-4 font-medium text-[#614F42]">
          <button
            onClick={() => onSelectTab('explore')}
            className="hover:text-[#223026] transition-colors"
          >
            Database Tokoh
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className="hover:text-[#223026] transition-colors"
          >
            Kuis Karakter
          </button>
          <button
            onClick={() => onSelectTab('search')}
            className="hover:text-[#223026] transition-colors"
          >
            Qur'an Search
          </button>
          <button
            onClick={() => onSelectTab('share')}
            className="hover:text-[#223026] transition-colors"
          >
            Tulis Refleksi
          </button>
        </nav>

        <p className="text-[11px] text-[#9E8A79]">
          © {new Date().getFullYear()} HERQURAN · Refleksi & Tadabbur
        </p>
      </div>
    </footer>
  );
};
