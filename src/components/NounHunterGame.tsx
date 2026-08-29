import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, AlertCircle, RotateCcw, Target, ShieldCheck, Flame, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HUNTER_WORDS, HunterWord } from '../data/nounsData';
import { soundManager } from '../utils/audio';

interface NounHunterGameProps {
  onEarnStars: (count: number) => void;
}

export const NounHunterGame: React.FC<NounHunterGameProps> = ({ onEarnStars }) => {
  const [shuffledWords, setShuffledWords] = useState<HunterWord[]>(() => [...HUNTER_WORDS].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; fullSpeech: string; summaryText: string; reason: string; typeDesc: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const currentWord = shuffledWords[currentIndex];

  const handleAnswer = (userSaidNoun: boolean) => {
    if (feedback) return;

    const isCorrect = userSaidNoun === currentWord.isNoun;

    if (isCorrect) {
      soundManager.playCorrect();
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);

      const earned = nextStreak >= 3 ? 3 : 2;
      onEarnStars(earned);

      const summaryText = currentWord.isNoun
        ? `أَحْسَنْتَ! كَلِمَةُ (${currentWord.word}) هِيَ ${currentWord.typeDesc}.`
        : `عَبْقَرِيٌّ! كَلِمَةُ (${currentWord.word}) لَيْسَتِ اسْماً، بَلْ هِيَ ${currentWord.typeDesc}.`;

      const reasonText = currentWord.reason;
      const spokenSpeech = currentWord.isNoun
        ? `أَحْسَنْتَ! كَلِمَةُ ${currentWord.word} اسْمٌ، لِأَنَّهَا ${currentWord.reason}.`
        : `عَبْقَرِيٌّ! كَلِمَةُ ${currentWord.word} لَيْسَتِ اسْماً، بَلْ هِيَ ${currentWord.typeDesc}، ${currentWord.reason}.`;

      setFeedback({
        isCorrect: true,
        summaryText,
        reason: reasonText,
        typeDesc: currentWord.typeDesc,
        fullSpeech: spokenSpeech
      });

      // Speak complete explanation
      soundManager.speakArabic(spokenSpeech);

    } else {
      soundManager.playTryAgain();
      setStreak(0);

      const summaryText = currentWord.isNoun
        ? `انْتَبِهْ يَا بَطَل! كَلِمَةُ (${currentWord.word}) هِيَ ${currentWord.typeDesc}.`
        : `انْتَبِهْ! كَلِمَةُ (${currentWord.word}) لَيْسَتِ اسْماً، بَلْ هِيَ ${currentWord.typeDesc}.`;

      const reasonText = currentWord.reason;
      const spokenSpeech = currentWord.isNoun
        ? `انْتَبِهْ! كَلِمَةُ ${currentWord.word} هِيَ اسْمٌ، وَالسَّبَبُ أَنَّهَا ${currentWord.reason}.`
        : `انْتَبِهْ! كَلِمَةُ ${currentWord.word} لَيْسَتِ اسْماً، بَلْ هِيَ ${currentWord.typeDesc}، ${currentWord.reason}.`;

      setFeedback({
        isCorrect: false,
        summaryText,
        reason: reasonText,
        typeDesc: currentWord.typeDesc,
        fullSpeech: spokenSpeech
      });

      soundManager.speakArabic(spokenSpeech);
    }
  };

  const handleNextWord = () => {
    soundManager.playPop();
    setFeedback(null);
    if (currentIndex + 1 < shuffledWords.length) {
      setCurrentIndex(prev => prev + 1);
      soundManager.speakArabic(shuffledWords[currentIndex + 1].word);
    } else {
      setIsGameOver(true);
      soundManager.playCelebration();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      soundManager.speakArabic('مَبْرُوكٌ يَا صَيَّادَ الْأَسْمَاءِ الْبَارِعَ! لَقَدْ أَتْمَمْتَ كُلَّ الْكَلِمَاتِ بِنَجَاحٍ.');
    }
  };

  const handleRestart = () => {
    soundManager.playPop();
    const reshuffled = [...HUNTER_WORDS].sort(() => Math.random() - 0.5);
    setShuffledWords(reshuffled);
    setCurrentIndex(0);
    setStreak(0);
    setFeedback(null);
    setIsGameOver(false);
    soundManager.speakArabic('بَدَأْنَا جَوْلَةَ الصَّيْدِ الْجَدِيدَةَ!');
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-sm space-y-6" id="hunter-game-container">
      
      {/* Header & Streak counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
        <div>
          <span className="bg-sky-100 text-sky-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-sky-300 inline-block mb-1">
            لُعْبَةُ التَّمْيِيزِ الذَّكِيِّ
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-sky-950 font-readex">
            صَيَّادُ الْأَسْمَاءِ الْعَجِيبُ 🎯
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold">
            هَلِ الْكَلِمَةُ الَّتِي أَمَامَكَ (اسْمٌ) أَمْ (لَيْسَتِ اسْماً)؟
          </p>
        </div>

        {/* Combo / Streak Flame */}
        <div className="flex items-center gap-3 bg-sky-50 px-4 py-2 rounded-2xl border border-sky-200">
          <div className="flex items-center gap-1 text-orange-600 font-black text-sm">
            <Flame className="w-5 h-5 fill-orange-500 text-orange-500 animate-pulse" />
            <span>حَمَاسٌ: {streak}</span>
          </div>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs font-bold text-sky-900">
            الْكَلِمَةُ {currentIndex + 1} مِنْ {shuffledWords.length}
          </span>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6 max-w-lg mx-auto">
          
          {/* Target Word Floating Bubble Card */}
          <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-3 border-sky-300 rounded-3xl p-6 sm:p-8 text-center relative shadow-sm">
            
            <span className="text-6xl sm:text-7xl block mb-3 animate-float select-none">
              {currentWord.emoji}
            </span>

            <h3 className="text-3xl sm:text-4xl font-black text-sky-950 tashkeel-text mb-2">
              {currentWord.word}
            </h3>

            {!feedback && (
              <button
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speakArabic(currentWord.word);
                }}
                className="bg-sky-200 hover:bg-sky-300 text-sky-900 font-bold text-xs px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-colors shadow-xs"
                id="btn-speak-hunter-word"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلْكَلِمَةِ</span>
              </button>
            )}

            {/* Live Complete Feedback & Pedagogical Explanation Panel */}
            {feedback && (
              <div
                className={`mt-4 p-4 sm:p-5 rounded-2xl border-2 text-right space-y-3 shadow-sm transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-amber-50 border-amber-400 text-amber-950'
                }`}
                id="hunter-explanation-panel"
              >
                <div className="flex items-center justify-between gap-2 border-b pb-2 border-emerald-200">
                  <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                    {feedback.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="text-emerald-800">إِجَابَةٌ صَحِيحَةٌ وَمُمَيَّزَةٌ! 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <span className="text-amber-800">تَعَلَّمْ مِنْ هَذِهِ الْكَلِمَةِ 💡</span>
                      </>
                    )}
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full bg-white font-extrabold border border-slate-300 text-slate-800 shrink-0">
                    {feedback.typeDesc}
                  </span>
                </div>

                {/* Main reason & text */}
                <div className="space-y-1.5">
                  <p className="font-black text-sm sm:text-base tashkeel-text leading-relaxed">
                    {feedback.summaryText}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 bg-white/70 p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                    🔍 <strong className="text-slate-900">سَبَبُ التَّصْنِيفِ:</strong> {feedback.reason}
                  </p>
                </div>

                {/* Action buttons inside feedback: Listen again & Next Word */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      soundManager.speakArabic(feedback.fullSpeech);
                    }}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition-all shadow-xs"
                    id="btn-relisten-explanation"
                  >
                    <Volume2 className="w-4 h-4 text-sky-600" />
                    <span>اسْتَمِعْ لِلشَّرْحِ 🔊</span>
                  </button>

                  <button
                    onClick={handleNextWord}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-all"
                    id="btn-next-hunter-word"
                  >
                    <span>الْكَلِمَةُ التَّالِيَةُ</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* 2 Big Action Buttons: YES (اسْم) vs NO (لَيْسَ اسْماً) - shown when question is active */}
          {!feedback ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-black text-base sm:text-lg shadow-lg border-2 border-emerald-300 flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                id="btn-hunter-is-noun"
              >
                <span className="text-3xl sm:text-4xl">🎯</span>
                <span className="tashkeel-text">نَعَمْ! هِيَ اسْمٌ</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-rose-400 to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-black text-base sm:text-lg shadow-lg border-2 border-rose-300 flex flex-col items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                id="btn-hunter-not-noun"
              >
                <span className="text-3xl sm:text-4xl">❌</span>
                <span className="tashkeel-text">لَا! لَيْسَتِ اسْماً</span>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleNextWord}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-base shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                id="btn-bottom-next-hunter-word"
              >
                <span>مُتَابَعَةُ الصَّيْدِ (الْكَلِمَةُ التَّالِيَةُ)</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Hunter Victory Screen */
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border-3 border-sky-300 rounded-3xl p-7 text-center space-y-4 max-w-lg mx-auto shadow-md">
          <div className="w-20 h-20 bg-sky-500 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-md">
            🎯
          </div>
          <h3 className="text-2xl font-black text-sky-950 font-readex">
            أَنْتَ صَيَّادُ الْأَسْمَاءِ الْأَوَّلُ!
          </h3>
          <p className="text-sky-900 font-bold text-sm tashkeel-text">
            لَقَدْ مَيَّزْتَ بَيْنَ الْأَسْمَاءِ وَالْأَفْعَالِ وَالْحُرُوفِ بِذَكَاءٍ خَارِقٍ!
          </p>

          <div className="p-3 bg-white rounded-2xl border border-sky-200 text-sky-900 font-black text-sm">
            🔥 أَعْلَى مُسْتَوَى حَمَاسٍ حَقَّقْتَهُ: {bestStreak} كَلِمَاتٍ مُتَتَالِيَةٍ!
          </div>

          <button
            onClick={handleRestart}
            className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-2xl flex items-center justify-center gap-2 mx-auto shadow-md hover:scale-105 transition-all"
            id="btn-restart-hunter"
          >
            <RotateCcw className="w-5 h-5" />
            <span>جَوْلَةُ صَيْدٍ جَدِيدَةٌ</span>
          </button>
        </div>
      )}

    </div>
  );
};

