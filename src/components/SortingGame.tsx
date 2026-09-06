import React, { useState } from 'react';
import { Volume2, RotateCcw, Sparkles, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NOUN_ITEMS } from '../data/nounsData';
import { NounCategory, NounItem } from '../types';
import { soundManager } from '../utils/audio';

interface SortingGameProps {
  onEarnStars: (count: number) => void;
}

export const SortingGame: React.FC<SortingGameProps> = ({ onEarnStars }) => {
  // Shuffle words for the round
  const [gameWords, setGameWords] = useState<NounItem[]>(() => [...NOUN_ITEMS].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentWord = gameWords[currentIndex];

  const baskets: { id: NounCategory; label: string; icon: string; bg: string; border: string; text: string }[] = [
    { id: 'human', label: 'إِنْسَانٌ', icon: '👦', bg: 'bg-amber-50 hover:bg-amber-100', border: 'border-amber-400', text: 'text-amber-900' },
    { id: 'animal', label: 'حَيَوَانٌ', icon: '🦁', bg: 'bg-yellow-50 hover:bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-900' },
    { id: 'plant', label: 'نَبَاتٌ', icon: '🌳', bg: 'bg-emerald-50 hover:bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-900' },
    { id: 'object', label: 'جَمَادٌ', icon: '🎒', bg: 'bg-blue-50 hover:bg-blue-100', border: 'border-blue-400', text: 'text-blue-900' },
    { id: 'place', label: 'مَكَانٌ', icon: '🏫', bg: 'bg-teal-50 hover:bg-teal-100', border: 'border-teal-400', text: 'text-teal-900' },
  ];

  const handleBasketClick = (basketCategory: NounCategory) => {
    if (feedback) return; // Prevent multiple clicks while showing feedback

    if (basketCategory === currentWord.category) {
      // Correct!
      soundManager.playCorrect();
      setScore(prev => prev + 1);
      onEarnStars(2);
      
      setFeedback({
        message: `أَحْسَنْتَ يَا بَطَل! كَلِمَةُ (${currentWord.word}) هِيَ ${currentWord.categoryNameAr} بِالتَّأْكِيدِ!`,
        isCorrect: true
      });

      soundManager.speakArabic(`أَحْسَنْتَ! ${currentWord.word} هِيَ ${currentWord.categoryNameAr}`);

      setTimeout(() => {
        moveToNext();
      }, 1600);

    } else {
      // Friendly wrong
      soundManager.playTryAgain();
      setFeedback({
        message: `حَاوِلْ مَرَّةً أُخْرَى! كَلِمَةُ (${currentWord.word}) لَيْسَتْ كَذَلِكَ. تَأَمَّلْهَا جَيِّداً!`,
        isCorrect: false
      });

      soundManager.speakArabic(`حَاوِلْ ثَانِيَةً يَا بَطَل`);

      setTimeout(() => {
        setFeedback(null);
      }, 1800);
    }
  };

  const moveToNext = () => {
    setFeedback(null);
    if (currentIndex + 1 < gameWords.length) {
      setCurrentIndex(prev => prev + 1);
      soundManager.speakArabic(gameWords[currentIndex + 1].word);
    } else {
      // Game completed!
      setIsFinished(true);
      soundManager.playCelebration();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      soundManager.speakArabic('مَبْرُوكٌ يَا بَطَل! لَقَدْ صَنَّفْتَ جَمِيعَ الْأَسْمَاءِ بِنَجَاحٍ!');
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    const shuffled = [...NOUN_ITEMS].sort(() => Math.random() - 0.5);
    setGameWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
    soundManager.speakArabic('بَدَأْنَا جَوْلَةً جَدِيدَةً!');
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-emerald-200 shadow-xs flex-1 flex flex-col justify-between gap-2.5 min-h-0" id="sorting-game-container">
      
      {/* Header & Instructions (flex-shrink: 0) */}
      <div className="flex items-center justify-between gap-2 text-right flex-shrink-0">
        <div>
          <h2 className="text-base sm:text-lg font-black text-emerald-950 font-readex">
            سِلَالُ الْأَسْمَاءِ الْعَجِيبَةُ 🧺
          </h2>
          <p className="text-slate-600 text-[11px] sm:text-xs font-semibold">
            انْظُرْ إِلَى الْكَلِمَةِ، ثُمَّ اضْغَطْ عَلَى السَّلَّةِ الْمُنَاسِبَةِ لَهَا:
          </p>
        </div>

        {/* Progress Bar & Score */}
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <div className="text-right">
            <span className="font-extrabold text-xs text-emerald-900">
              {currentIndex + 1} / {gameWords.length}
            </span>
          </div>
          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / gameWords.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="flex-1 flex flex-col justify-between gap-2 min-h-0">
          
          {/* Active Word Display Card (flex-shrink: 1, fit-card-scale) */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 text-center relative shadow-xs max-w-sm mx-auto flex-shrink-1 w-full my-auto fit-card-scale">
            
            <div className="text-4xl sm:text-5xl mb-1 animate-float select-none">
              {currentWord.icon}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-amber-950 tashkeel-text mb-1">
              {currentWord.word}
            </h3>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speakArabic(currentWord.word);
                }}
                className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-xs px-3 py-1 rounded-xl flex items-center gap-1 transition-colors shadow-xs"
                id="btn-speak-sorting-word"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>انْطِقِ الْكَلِمَةَ</span>
              </button>
            </div>

            {/* Live Feedback Toast */}
            {feedback && (
              <div
                className={`mt-2 p-1.5 rounded-xl border text-xs font-black flex items-center justify-center gap-1.5 animate-bounce-slow ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-rose-100 border-rose-400 text-rose-900'
                }`}
              >
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

          </div>

          {/* 5 Sorting Baskets (flex-shrink: 0) */}
          <div className="space-y-1 text-right flex-shrink-0">
            <h4 className="text-xs font-extrabold text-slate-700">
              👇 إِلَى أَيِّ سَلَّةٍ تَنْتَمِي هَذِهِ الْكَلِمَةُ؟
            </h4>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {baskets.map(basket => (
                <button
                  key={basket.id}
                  onClick={() => handleBasketClick(basket.id)}
                  disabled={feedback !== null && feedback.isCorrect}
                  className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center shadow-xs group hover:scale-105 active:scale-95 ${basket.bg} ${basket.border}`}
                  id={`basket-btn-${basket.id}`}
                >
                  <span className="text-2xl sm:text-3xl block mb-0.5 group-hover:rotate-6 transition-transform">
                    {basket.icon}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 block">
                    سَلَّةُ:
                  </span>
                  <span className={`text-xs sm:text-sm font-black font-readex tashkeel-text leading-tight ${basket.text}`}>
                    {basket.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Game Completion Victory Card */
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-4 text-center space-y-3 max-w-sm mx-auto shadow-sm my-auto flex-shrink-1">
          <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-xs">
            🏆
          </div>
          <h3 className="text-lg sm:text-xl font-black text-emerald-950 font-readex">
            مَبْرُوكٌ يَا عَبْقَرِيَّ الْأَسْمَاءِ!
          </h3>
          <p className="text-emerald-900 font-bold text-xs tashkeel-text">
            لَقَدْ أَجَبْتَ عَلَى الْأَسْمَاءِ كُلِّهَا، وَحَصَلْتَ عَلَى كَافَّةِ النُّجُومِ!
          </p>

          <div className="p-2 bg-white rounded-xl border border-emerald-200 flex items-center justify-center gap-3 text-emerald-900 font-black text-xs">
            <span>⭐ النُّجُومُ الْمُكْتَسَبَةُ: +{score * 2}</span>
          </div>

          <button
            onClick={handleRestart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 mx-auto shadow-xs hover:scale-105 transition-all"
            id="btn-restart-sorting"
          >
            <RotateCcw className="w-4 h-4" />
            <span>الْعَبْ جَوْلَةً جَدِيدَةً</span>
          </button>
        </div>
      )}

    </div>
  );
};
