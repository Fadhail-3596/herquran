import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CHARACTERS } from '../data/characters';
import { WomanCharacter, QuizResult } from '../types';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen,
  PenLine,
  Check,
  AlertCircle
} from 'lucide-react';

interface FindYourCharacterQuizProps {
  onSelectCharacter: (character: WomanCharacter) => void;
  onNavigateToShare: (characterId: string) => void;
}

export const FindYourCharacterQuiz: React.FC<FindYourCharacterQuizProps> = ({
  onSelectCharacter,
  onNavigateToShare
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {};
    CHARACTERS.forEach((c) => {
      scores[c.id] = 0;
    });

    QUIZ_QUESTIONS.forEach((q) => {
      const selectedOptionId = selectedAnswers[q.id];
      if (selectedOptionId) {
        const option = q.options.find((opt) => opt.id === selectedOptionId);
        if (option) {
          Object.entries(option.characterScores).forEach(([charId, score]) => {
            scores[charId] = (scores[charId] || 0) + score;
          });
        }
      }
    });

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topCharId = sorted[0]?.[0] || 'maryam';
    const topCharacter = CHARACTERS.find((c) => c.id === topCharId) || CHARACTERS[0];
    const maxScore = sorted[0]?.[1] || 1;
    const matchPercentage = Math.min(98, Math.max(78, Math.round((maxScore / 35) * 100) + 12));

    const secondaryMatches = sorted.slice(1, 3).map(([charId, score]) => {
      const c = CHARACTERS.find((item) => item.id === charId) || CHARACTERS[0];
      return { character: c, score };
    });

    let reasonText = `Pilihanmu merefleksikan karakter ${topCharacter.name}: `;
    if (topCharId === 'maryam') {
      reasonText += 'Kecenderunganmu mencari ketenangan dalam doa, menjaga batasan spiritual, serta mempertahankan integritas diri.';
    } else if (topCharId === 'asiyah') {
      reasonText += 'Keberanian moralmu untuk menolak kompromi etika, membela hal yang benar, dan tidak silau oleh kemewahan duniawi.';
    } else if (topCharId === 'bilqis') {
      reasonText += 'Kecerdasan analisismu dalam menimbang solusi damai, keterbukaan pikiran terhadap kebenaran, dan musyawarah.';
    } else if (topCharId === 'mother-of-musa') {
      reasonText += 'Kekuatan tawakkalmu saat menghadapi ketidakpastian besar dan kesiapan melepaskan kontrol kepada Allah.';
    } else if (topCharId === 'sister-of-musa') {
      reasonText += 'Kepekaan observasimu, ketenangan di situasi krisis, serta komunikasi yang melindungi orang tersayang.';
    } else if (topCharId === 'madyan-women') {
      reasonText += 'Kemandirianmu dalam bekerja, keanggunan menjaga kehormatan (haya\'), dan ketelitian menilai integritas seseorang.';
    } else if (topCharId === 'khaulah') {
      reasonText += 'Keberanianmu menyuarakan kebenaran ketika diperlakukan tidak adil dan keyakinan bahwa Allah mendengar jeritan hatimu.';
    } else {
      reasonText += 'Kejujuran batinmu untuk mengakui kerapuhan, bertaubat dengan tulus, dan memilih jalan perbaikan diri yang autentik.';
    }

    setResult({
      character: topCharacter,
      matchPercentage,
      secondaryMatches,
      reason: reasonText
    });
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentAnswered = !!selectedAnswers[currentQuestion.id];

  return (
    <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      {!isCompleted ? (
        <div className="space-y-6 sm:space-y-8">
          {/* Minimal Step Indicator & Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#7A6555] font-medium">
              <span className="font-heading font-semibold text-[#46634D]">
                Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#EFEBE7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#46634D] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-heading font-semibold uppercase tracking-wider text-[#7A6555]">
              {currentQuestion.category}
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#223026] leading-snug">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Large Choice Cards */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 focus:outline-none ${
                    isSelected
                      ? 'border-[#46634D] bg-[#E7EFE9]/40 shadow-xs ring-1 ring-[#46634D]'
                      : 'border-[#EDE7E1] bg-white hover:border-[#CFDFD3] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-[#46634D] bg-[#46634D] text-white'
                        : 'border-[#DDD5CD] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm sm:text-base text-[#223026] leading-snug">
                      {option.label}
                    </p>
                    {option.sublabel && (
                      <p className="text-xs text-[#7A6555] leading-relaxed">
                        {option.sublabel}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Back & Next Navigation Buttons */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2.5 rounded-xl text-xs font-heading font-semibold transition-colors flex items-center gap-1.5 ${
                currentQuestionIndex === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'text-[#614F42] hover:bg-[#EFEBE7]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentAnswered}
              className={`px-6 py-2.5 rounded-xl text-xs font-heading font-semibold transition-all flex items-center gap-2 ${
                isCurrentAnswered
                  ? 'bg-[#46634D] hover:bg-[#374E3D] text-white shadow-xs active:scale-95'
                  : 'bg-[#EFEBE7] text-[#9E8A79] cursor-not-allowed'
              }`}
            >
              <span>
                {currentQuestionIndex === totalQuestions - 1
                  ? 'Lihat Hasil'
                  : 'Lanjut'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : result ? (
        /* Quiz Result View */
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE7E1] shadow-xs space-y-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7EFE9] text-[#374E3D] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Karakter yang Relevan Denganmu</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#223026]">
                {result.character.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#46634D] font-serif italic">
                "{result.character.tagline}"
              </p>
            </div>

            {/* Illustration */}
            <div className="max-w-xs mx-auto aspect-[4/3] rounded-2xl overflow-hidden border border-[#EDE7E1] relative shadow-xs">
              <img
                src={result.character.image}
                alt={result.character.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <p className="text-xs text-[#7A6555] font-mono">
              Tingkat Keselarasan: <strong className="text-[#46634D]">{result.matchPercentage}%</strong>
            </p>

            {/* Explanation card */}
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EDE7E1] text-left text-xs sm:text-sm text-[#4D3D32] leading-relaxed">
              {result.reason}
            </div>

            {/* Reflection quote */}
            <div className="p-4 bg-[#FAECF0]/50 rounded-2xl border border-[#E9B8C5]/50 text-center space-y-1">
              <span className="text-[10px] font-heading font-semibold uppercase tracking-wider text-[#C26C80]">
                Refleksi Untukmu
              </span>
              <p className="font-serif italic text-sm text-[#271E18]">
                "{result.character.reflectionQuestion}"
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleTryAgain}
                className="px-4 py-2 rounded-xl border border-[#EDE7E1] text-xs font-semibold text-[#614F42] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>

              <button
                onClick={() => onSelectCharacter(result.character)}
                className="px-4 py-2 rounded-xl bg-[#E7EFE9] text-[#374E3D] hover:bg-[#CFDFD3] text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Baca Kisah</span>
              </button>

              <button
                onClick={() => onNavigateToShare(result.character.id)}
                className="px-5 py-2 rounded-xl bg-[#46634D] hover:bg-[#374E3D] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Tulis Refleksi</span>
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#7A6555]">
            Hasil ini adalah sarana tadabbur dan refleksi diri, bukan ukuran keimanan atau diagnosis kepribadian.
          </p>
        </div>
      ) : null}
    </div>
  );
};
