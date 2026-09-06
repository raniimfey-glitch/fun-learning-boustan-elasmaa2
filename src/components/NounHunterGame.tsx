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
    <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-sky-200 shadow-xs flex-1 flex flex-col justify-between gap-2 min-h-0" id="hunter-game-container">
      
      {/* Header & Streak counter (flex-shrink: 0) */}
      <div className="flex items-center justify-between gap-2 text-right flex-shrink-0">
        <div>
          <h2 className="text-base sm:text-lg font-black text-sky-950 font-readex">
            صَيَّادُ الْأَسْمَاءِ الْعَجِيبُ 🎯
          </h2>
          <p className="text-slate-600 text-[11px] sm:text-xs font-semibold">
            هَلِ الْكَلِمَةُ الَّتِي أَمَامَكَ (اسْمٌ) أَمْ (لَيْسَتِ اسْماً)؟
          </p>
        </div>

        {/* Combo / Streak Flame */}
        <div className="flex items-center gap-2 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
          <div className="flex items-center gap-1 text-orange-600 font-black text-xs">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
            <span>حَمَاسٌ: {streak}</span>
          </div>
          <span className="text-xs text-slate-300">|</span>
          <span className="text-[11px] font-bold text-sky-900">
            {currentIndex + 1} / {shuffledWords.length}
          </span>
        </div>
      </div>

      {!isGameOver ? (
        <div className="flex-1 flex flex-col justify-between gap-2 max-w-md mx-auto w-full min-h-0">
          
          {/* Target Word Floating Bubble Card (flex-shrink: 1, fit-card-scale) */}
          <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 border-2 border-sky-300 rounded-2xl p-3 sm:p-4 text-center relative shadow-xs flex-shrink-1 my-auto w-full fit-card-scale">
            
            <span className="text-4xl sm:text-5xl block mb-1 animate-float select-none">
              {currentWord.emoji}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-sky-950 tashkeel-text mb-1">
              {currentWord.word}
            </h3>

            {!feedback && (
              <button
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speakArabic(currentWord.word);
                }}
                className="bg-sky-200 hover:bg-sky-300 text-sky-900 font-bold text-xs px-3 py-1 rounded-xl inline-flex items-center gap-1 transition-colors shadow-xs"
                id="btn-speak-hunter-word"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>اسْتَمِعْ لِلْكَلِمَةِ</span>
              </button>
            )}

            {/* Live Complete Feedback & Pedagogical Explanation Panel */}
            {feedback && (
              <div
                className={`mt-2 p-3 rounded-xl border text-right space-y-2 shadow-xs transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : 'bg-amber-50 border-amber-400 text-amber-950'
                }`}
                id="hunter-explanation-panel"
              >
                <div className="flex items-center justify-between gap-1 border-b pb-1.5 border-emerald-200">
                  <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm">
                    {feedback.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-emerald-800">إِجَابَةٌ صَحِيحَةٌ وَمُمَيَّزَةٌ! 🎉</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-amber-800">تَعَلَّمْ مِنْ هَذِهِ الْكَلِمَةِ 💡</span>
                      </>
                    )}
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-extrabold border border-slate-300 text-slate-800 shrink-0">
                    {feedback.typeDesc}
                  </span>
                </div>

                {/* Main reason & text */}
                <div className="space-y-1 text-xs">
                  <p className="font-black tashkeel-text leading-tight">
                    {feedback.summaryText}
                  </p>
                  <p className="text-[11px] font-bold text-slate-700 bg-white/70 p-1.5 rounded-lg border border-slate-200 leading-tight">
                    🔍 <strong className="text-slate-900">السَّبَبُ:</strong> {feedback.reason}
                  </p>
                </div>

                {/* Action buttons inside feedback: Listen again & Next Word */}
                <div className="pt-1 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      soundManager.speakArabic(feedback.fullSpeech);
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-extrabold text-[11px] border border-slate-300 flex items-center gap-1 transition-all shadow-xs"
                    id="btn-relisten-explanation"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>اسْتَمِعْ لِلشَّرْحِ 🔊</span>
                  </button>

                  <button
                    onClick={handleNextWord}
                    className="px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs flex items-center gap-1.5 shadow-xs hover:scale-105 transition-all"
                    id="btn-next-hunter-word"
                  >
                    <span>الْكَلِمَةُ التَّالِيَةُ</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* 2 Big Action Buttons: YES (اسْم) vs NO (لَيْسَ اسْماً) - shown when question is active */}
          {!feedback ? (
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              <button
                onClick={() => handleAnswer(true)}
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm sm:text-base shadow-md border border-emerald-300 flex flex-col items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-all"
                id="btn-hunter-is-noun"
              >
                <span className="text-2xl sm:text-3xl">🎯</span>
                <span className="tashkeel-text">نَعَمْ! هِيَ اسْمٌ</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-black text-sm sm:text-base shadow-md border border-rose-300 flex flex-col items-center justify-center gap-1 hover:scale-105 active:scale-95 transition-all"
                id="btn-hunter-not-noun"
              >
                <span className="text-2xl sm:text-3xl">❌</span>
                <span className="tashkeel-text">لَا! لَيْسَتِ اسْماً</span>
              </button>
            </div>
          ) : (
            <div className="text-center flex-shrink-0">
              <button
                onClick={handleNextWord}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-xs sm:text-sm shadow-xs hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                id="btn-bottom-next-hunter-word"
              >
                <span>مُتَابَعَةُ الصَّيْدِ (الْكَلِمَةُ التَّالِيَةُ)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Hunter Victory Screen */
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border-2 border-sky-300 rounded-2xl p-4 text-center space-y-3 max-w-sm mx-auto shadow-xs my-auto flex-shrink-1">
          <div className="w-14 h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-xs">
            🎯
          </div>
          <h3 className="text-lg sm:text-xl font-black text-sky-950 font-readex">
            أَنْتَ صَيَّادُ الْأَسْمَاءِ الْأَوَّلُ!
          </h3>
          <p className="text-sky-900 font-bold text-xs tashkeel-text">
            لَقَدْ مَيَّزْتَ بَيْنَ الْأَسْمَاءِ وَالْأَفْعَالِ وَالْحُرُوفِ بِذَكَاءٍ خَارِقٍ!
          </p>

          <div className="p-2 bg-white rounded-xl border border-sky-200 text-sky-900 font-black text-xs">
            🔥 أَعْلَى مُسْتَوَى حَمَاسٍ: {bestStreak} كَلِمَاتٍ مُتَتَالِيَةٍ!
          </div>

          <button
            onClick={handleRestart}
            className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 mx-auto shadow-xs hover:scale-105 transition-all"
            id="btn-restart-hunter"
          >
            <RotateCcw className="w-4 h-4" />
            <span>جَوْلَةُ صَيْدٍ جَدِيدَةٌ</span>
          </button>
        </div>
      )}

    </div>
  );
};

