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
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-emerald-200 shadow-sm space-y-6" id="sorting-game-container">
      
      {/* Header & Instructions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
        <div>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-emerald-300 inline-block mb-1">
            لُعْبَةُ التَّصْنِيفِ التَّفَاعُلِيَّةِ
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-emerald-950 font-readex">
            سِلَالُ الْأَسْمَاءِ الْعَجِيبَةُ 🧺
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold">
            انْظُرْ إِلَى الْكَلِمَةِ، ثُمَّ اضْغَطْ عَلَى السَّلَّةِ الْمُنَاسِبَةِ لَهَا:
          </p>
        </div>

        {/* Progress Bar & Score */}
        <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-500 block">الْمَرْحَلَةُ:</span>
            <span className="font-extrabold text-sm text-emerald-900">
              {currentIndex + 1} / {gameWords.length}
            </span>
          </div>
          <div className="w-20 bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / gameWords.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          
          {/* Active Word Display Card */}
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-6 sm:p-8 text-center relative shadow-sm max-w-md mx-auto">
            
            <div className="text-6xl sm:text-7xl mb-3 animate-float select-none">
              {currentWord.icon}
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-amber-950 tashkeel-text mb-2">
              {currentWord.word}
            </h3>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speakArabic(currentWord.word);
                }}
                className="bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                id="btn-speak-sorting-word"
              >
                <Volume2 className="w-4 h-4" />
                <span>انْطِقِ الْكَلِمَةَ</span>
              </button>
            </div>

            {/* Live Feedback Toast */}
            {feedback && (
              <div
                className={`mt-4 p-3 rounded-2xl border-2 text-xs sm:text-sm font-black flex items-center justify-center gap-2 animate-bounce-slow ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                    : 'bg-rose-100 border-rose-400 text-rose-900'
                }`}
              >
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

          </div>

          {/* 5 Sorting Baskets */}
          <div className="space-y-2 text-right">
            <h4 className="text-sm font-extrabold text-slate-700">
              👇 إِلَى أَيِّ سَلَّةٍ تَنْتَمِي هَذِهِ الْكَلِمَةُ؟
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {baskets.map(basket => (
                <button
                  key={basket.id}
                  onClick={() => handleBasketClick(basket.id)}
                  disabled={feedback !== null && feedback.isCorrect}
                  className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center justify-center text-center shadow-sm group hover:scale-105 active:scale-95 ${basket.bg} ${basket.border}`}
                  id={`basket-btn-${basket.id}`}
                >
                  <span className="text-4xl sm:text-5xl block mb-2 group-hover:rotate-6 transition-transform">
                    {basket.icon}
                  </span>
                  <span className="text-xs font-black text-slate-500 block mb-0.5">
                    سَلَّةُ:
                  </span>
                  <span className={`text-base sm:text-lg font-black font-readex tashkeel-text ${basket.text}`}>
                    {basket.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* Game Completion Victory Card */
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-3 border-emerald-300 rounded-3xl p-7 text-center space-y-4 max-w-lg mx-auto shadow-md animate-bounce-slow">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-md">
            🏆
          </div>
          <h3 className="text-2xl font-black text-emerald-950 font-readex">
            مَبْرُوكٌ يَا عَبْقَرِيَّ الْأَسْمَاءِ!
          </h3>
          <p className="text-emerald-900 font-bold text-sm tashkeel-text">
            لَقَدْ أَجَبْتَ عَلَى الْأَسْمَاءِ كُلِّهَا، وَحَصَلْتَ عَلَى كَافَّةِ النُّجُومِ!
          </p>

          <div className="p-3 bg-white rounded-2xl border border-emerald-200 flex items-center justify-center gap-4 text-emerald-900 font-black">
            <span>⭐ النُّجُومُ الْمُكْتَسَبَةُ: +{score * 2}</span>
          </div>

          <button
            onClick={handleRestart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-2xl flex items-center justify-center gap-2 mx-auto shadow-md hover:scale-105 transition-all"
            id="btn-restart-sorting"
          >
            <RotateCcw className="w-5 h-5" />
            <span>الْعَبْ جَوْلَةً جَدِيدَةً</span>
          </button>
        </div>
      )}

    </div>
  );
};
