import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../data/characters';
import { UserReflection } from '../types';
import {
  saveUserReflection,
  getSavedReflections,
  deleteUserReflection,
  getSavedDraft,
  saveDraft,
  clearDraft
} from '../utils/storage';
import { generateStoryImage } from '../utils/canvasStoryExport';
import {
  PenLine,
  Download,
  Share2,
  Copy,
  Check,
  Trash2,
  Bookmark,
  MessageCircle,
  Clock
} from 'lucide-react';

interface ShareYourStoryProps {
  initialCharacterId?: string;
}

export const ShareYourStory: React.FC<ShareYourStoryProps> = ({ initialCharacterId }) => {
  const [title, setTitle] = useState('');
  const [characterId, setCharacterId] = useState(initialCharacterId || 'maryam');
  const [personalExperience, setPersonalExperience] = useState('');
  const [lesson, setLesson] = useState('');
  const [reflection, setReflection] = useState('');
  const [authorName, setAuthorName] = useState('');

  const [activeTab, setActiveTab] = useState<'create' | 'saved'>('create');
  const [savedList, setSavedList] = useState<UserReflection[]>([]);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setSavedList(getSavedReflections());

    const draft = getSavedDraft();
    if (draft && !initialCharacterId) {
      if (draft.title) setTitle(draft.title);
      if (draft.characterId) setCharacterId(draft.characterId);
      if (draft.experience) setPersonalExperience(draft.experience);
      if (draft.lesson) setLesson(draft.lesson);
      if (draft.personalReflection) setReflection(draft.personalReflection);
      if (draft.authorName) setAuthorName(draft.authorName);
    } else if (initialCharacterId) {
      setCharacterId(initialCharacterId);
    }
  }, [initialCharacterId]);

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'title') setTitle(value);
    if (field === 'characterId') setCharacterId(value);
    if (field === 'personalExperience') setPersonalExperience(value);
    if (field === 'lesson') setLesson(value);
    if (field === 'reflection') setReflection(value);
    if (field === 'authorName') setAuthorName(value);

    saveDraft({
      title: field === 'title' ? value : title,
      characterId: field === 'characterId' ? value : characterId,
      experience: field === 'personalExperience' ? value : personalExperience,
      lesson: field === 'lesson' ? value : lesson,
      personalReflection: field === 'reflection' ? value : reflection,
      authorName: field === 'authorName' ? value : authorName
    });
  };

  const selectedCharacter = CHARACTERS.find((c) => c.id === characterId) || CHARACTERS[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !personalExperience.trim() || !reflection.trim()) {
      setStatusMessage('Mohon lengkapi judul, pengalaman, dan refleksi.');
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }

    saveUserReflection({
      title,
      characterId,
      characterName: selectedCharacter.name,
      experience: personalExperience,
      lesson: lesson.trim() || `Hikmah dari keteguhan ${selectedCharacter.name}`,
      personalReflection: reflection,
      authorName: authorName.trim() || undefined
    });

    setSavedList(getSavedReflections());
    clearDraft();
    setStatusMessage('Refleksi tersimpan di jurnal pribadimu!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDelete = (id: string) => {
    deleteUserReflection(id);
    setSavedList(getSavedReflections());
  };

  const handleCopy = (data: {
    title: string;
    characterName: string;
    experience: string;
    lesson: string;
    personalReflection: string;
    authorName?: string;
  }) => {
    const text = `HERQURAN REFLECTION
"${data.title}"
Terinspirasi: ${data.characterName}

Catatan Hati:
${data.experience}

Hikmah:
${data.lesson}

Refleksi:
"${data.personalReflection}"

— ${data.authorName || 'Muslimah Berdaya'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadStory = async (data: {
    id: string;
    title: string;
    characterName: string;
    experience: string;
    lesson: string;
    personalReflection: string;
    authorName?: string;
  }) => {
    setIsExporting(true);
    try {
      const dataUrl = await generateStoryImage({
        title: data.title,
        characterName: data.characterName,
        personalExperience: data.experience,
        lesson: data.lesson,
        reflection: data.personalReflection,
        authorName: data.authorName
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `herquran-story-${data.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setStatusMessage('Gambar Instagram Story (1080×1920) berhasil diunduh!');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error(e);
      setStatusMessage('Gagal membuat gambar.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#223026]">
          Share Your Story
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6555] max-w-md mx-auto">
          Tulis catatan refleksi pribadimu dan ekspor ke kartu Instagram Story yang minimalis.
        </p>
      </div>

      {/* Switch Tab: Tulis vs Tersimpan */}
      <div className="flex items-center justify-center">
        <div className="bg-[#EFEBE7] p-1 rounded-xl flex items-center gap-1 text-xs font-heading font-semibold">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'create'
                ? 'bg-white text-[#223026] shadow-xs'
                : 'text-[#614F42] hover:text-[#223026]'
            }`}
          >
            Tulis Jurnal
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === 'saved'
                ? 'bg-white text-[#223026] shadow-xs'
                : 'text-[#614F42] hover:text-[#223026]'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>Riwayat ({savedList.length})</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-[#E7EFE9] border border-[#CFDFD3] text-[#2C3E31] text-xs font-medium rounded-xl text-center">
          {statusMessage}
        </div>
      )}

      {activeTab === 'create' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7E1] shadow-xs space-y-5">
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-heading font-semibold text-[#614F42]">
                  Judul Refleksi *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="Misal: Belajar Melepaskan Ekspektasi..."
                  className="w-full px-4 py-3 rounded-xl border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-heading font-semibold text-[#614F42]">
                  Tokoh yang Menginspirasi *
                </label>
                <select
                  value={characterId}
                  onChange={(e) => handleFieldChange('characterId', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] outline-none bg-white"
                >
                  {CHARACTERS.map((char) => (
                    <option key={char.id} value={char.id}>
                      {char.name} ({char.categoryLabel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-heading font-semibold text-[#614F42]">
                  Pengalaman Pribadi *
                </label>
                <textarea
                  rows={4}
                  value={personalExperience}
                  onChange={(e) => handleFieldChange('personalExperience', e.target.value)}
                  placeholder="Ceritakan apa yang sedang kamu hadapi atau rasakan..."
                  className="w-full px-4 py-3 rounded-xl border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-heading font-semibold text-[#614F42]">
                  Hikmah yang Didapat
                </label>
                <textarea
                  rows={2}
                  value={lesson}
                  onChange={(e) => handleFieldChange('lesson', e.target.value)}
                  placeholder="Pelajaran berharga dari kisah tokoh..."
                  className="w-full px-4 py-3 rounded-xl border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-heading font-semibold text-[#614F42]">
                  Refleksi Diri & Doa *
                </label>
                <textarea
                  rows={3}
                  value={reflection}
                  onChange={(e) => handleFieldChange('reflection', e.target.value)}
                  placeholder="Satu pesan atau komitmen lembut untuk dirimu..."
                  className="w-full px-4 py-3 rounded-xl border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] outline-none resize-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-heading font-semibold text-[#614F42]">
                  Nama / Nama Panggilan (Opsional)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => handleFieldChange('authorName', e.target.value)}
                  placeholder="Nama atau samaranmu"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EDE7E1] focus:border-[#46634D] text-sm text-[#223026] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    clearDraft();
                    setTitle('');
                    setPersonalExperience('');
                    setLesson('');
                    setReflection('');
                    setAuthorName('');
                  }}
                  className="text-xs text-[#7A6555] hover:text-[#223026]"
                >
                  Bersihkan Form
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#46634D] hover:bg-[#374E3D] text-white text-xs font-heading font-semibold transition-all shadow-xs"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-heading font-semibold text-[#7A6555] block">
              Pratinjau Story Card (1080×1920)
            </span>

            {/* Story Card Box */}
            <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#EDE7E1] shadow-xs space-y-4">
              <div className="text-center space-y-1">
                <img
                  src="/herquran-emblem.png"
                  alt="Emblem"
                  className="w-10 h-9 mx-auto object-contain"
                />
                <span className="font-heading font-bold text-sm tracking-widest text-[#46634D] block">
                  HERQURAN
                </span>
                <span className="text-[10px] text-[#7A6555] font-serif italic block">
                  Reflect on Your Story
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#EDE7E1] shadow-2xs space-y-3">
                <div className="text-center border-b border-[#F8F6F4] pb-2">
                  <span className="text-[10px] font-semibold text-[#46634D] uppercase tracking-wider block">
                    {selectedCharacter.name}
                  </span>
                  <p className="font-serif italic text-sm text-[#223026] font-medium">
                    "{title || 'Judul Refleksi'}"
                  </p>
                </div>

                <div className="space-y-2 text-xs text-[#4D3D32]">
                  <p className="italic line-clamp-3 leading-relaxed">
                    "{personalExperience || 'Catatan pengalaman atau curahan hati...'}"
                  </p>
                  <p className="text-[11px] text-[#7A6555] line-clamp-2">
                    <strong className="text-[#46634D]">Hikmah:</strong>{' '}
                    {lesson || selectedCharacter.lifeLessons[0]}
                  </p>
                  <div className="p-2.5 bg-[#FAF7F2] rounded-xl text-xs font-serif italic text-[#223026]">
                    “{reflection || 'Pesan refleksi untuk dirimu...' }”
                  </div>
                </div>

                <div className="text-center pt-1 text-[10px] text-[#9E8A79]">
                  — {authorName || 'Muslimah Berdaya'}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    handleDownloadStory({
                      id: 'draft',
                      title: title || 'Refleksi Hati',
                      characterName: selectedCharacter.name,
                      experience: personalExperience || 'Catatan pengalaman',
                      lesson: lesson || selectedCharacter.lifeLessons[0],
                      personalReflection: reflection || 'Refleksi diri',
                      authorName
                    })
                  }
                  disabled={isExporting}
                  className="px-3 py-2 bg-[#46634D] hover:bg-[#374E3D] text-white text-xs font-heading font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Memproses...' : 'Unduh Story'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy({
                      title: title || 'Refleksi Hati',
                      characterName: selectedCharacter.name,
                      experience: personalExperience,
                      lesson,
                      personalReflection: reflection,
                      authorName
                    })
                  }
                  className="px-3 py-2 bg-white border border-[#EDE7E1] text-[#614F42] hover:bg-[#FAF7F2] text-xs font-heading font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Saved List */
        <div className="space-y-4 max-w-2xl mx-auto">
          {savedList.length > 0 ? (
            savedList.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-[#EDE7E1] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-[#7A6555] border-b border-[#F8F6F4] pb-2">
                  <span className="font-heading font-semibold text-[#46634D]">
                    {item.characterName}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px]">
                      {new Date(item.createdAt).toLocaleDateString('id-ID')}
                    </span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-600 p-1"
                      aria-label="Hapus refleksi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-[#223026]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#4D3D32] leading-relaxed line-clamp-3">
                  {item.experience}
                </p>

                <div className="p-3 bg-[#FAF7F2] rounded-xl text-xs font-serif italic text-[#223026]">
                  “{item.personalReflection}”
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() =>
                      handleDownloadStory({
                        id: item.id,
                        title: item.title,
                        characterName: item.characterName,
                        experience: item.experience,
                        lesson: item.lesson,
                        personalReflection: item.personalReflection,
                        authorName: item.authorName
                      })
                    }
                    className="px-3 py-1.5 bg-[#E7EFE9] text-[#374E3D] hover:bg-[#CFDFD3] text-xs font-heading font-medium rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Unduh Story (1080p)</span>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#EDE7E1] space-y-2">
              <p className="font-heading font-semibold text-sm text-[#223026]">
                Belum Ada Riwayat Refleksi
              </p>
              <button
                onClick={() => setActiveTab('create')}
                className="text-xs font-semibold text-[#46634D] underline"
              >
                Mulai Tulis Jurnal Sekarang
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
