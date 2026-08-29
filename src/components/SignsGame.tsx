import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, Wand2, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';

interface SignsGameProps {
  onEarnStars: (count: number) => void;
}

interface SignTestChallenge {
  id: string;
  word: string; // مشكولة
  icon: string;
  question: string;
  signType: 'al' | 'tanween' | 'ta_marbuta';
  signName: string;
  options: {
    text: string;
    isCorrect: boolean;
    resultWord: string;
    explanation: string;
  }[];
}

const SIGN_CHALLENGES: SignTestChallenge[] = [
  {
    id: 'sc1',
    word: 'كِتَابٌ',
    icon: '📖',
    question: 'عِنْدَ إِدْخَالِ (الْـ) التَّعْرِيفِ عَلَى كَلِمَةِ (كِتَابٌ)، مَاذَا تُصْبِحُ؟',
    signType: 'al',
    signName: 'الْـ التَّعْرِيفِ',
    options: [
      { text: 'الْكِتَابُ', isCorrect: true, resultWord: 'الْكِتَابُ', explanation: 'صَحِيحٌ! عِنْدَ دُخُولِ (الْـ) يَخْتَفِي التَّنْوِينُ وَتَبْقَى ضَمَّةٌ وَاحِدَةٌ.' },
      { text: 'الْكِتَابٌ', isCorrect: false, resultWord: 'الْكِتَابٌ', explanation: 'خَطَأٌ! لَا يَجْتَمِعُ (الْـ) وَالتَّنْوِينُ مَعاً أَبَداً!' },
      { text: 'كِتَابُ', isCorrect: false, resultWord: 'كِتَابُ', explanation: 'لَمْ نُضِفْ (الْـ) التَّعْرِيفِ فِي الْبِدَايَةِ.' }
    ]
  },
  {
    id: 'sc2',
    word: 'سَيَّارَةٌ',
    icon: '🚗',
    question: 'مَا هِيَ الْعَلَامَةُ السِّحْرِيَّةُ الْمَوْجُودَةُ فِي آخِرِ كَلِمَةِ (سَيَّارَةٌ)؟',
    signType: 'ta_marbuta',
    signName: 'التَّاءُ الْمَرْبُوطَةُ',
    options: [
      { text: 'التَّاءُ الْمَرْبُوطَةُ (ـة)', isCorrect: true, resultWord: 'سَيَّارَةٌ', explanation: 'عَبْقَرِيٌّ! التَّاءُ الْمَرْبُوطَةُ خَاصَّةٌ بِالْأَسْمَاءِ فَقَطْ!' },
      { text: 'الْـ التَّعْرِيفِ', isCorrect: false, resultWord: 'سَيَّارَةٌ', explanation: 'لَا تُوجَدُ (الْـ) فِي أَوَّلِ الْكَلِمَةِ.' },
      { text: 'حَرْفُ الْجَرِّ', isCorrect: false, resultWord: 'سَيَّارَةٌ', explanation: 'لَمْ يَسْبِقْهَا حَرْفُ جَرٍّ.' }
    ]
  },
  {
    id: 'sc3',
    word: 'قَلَمٌ',
    icon: '✏️',
    question: 'كَيْفَ نُنَوِّنُ كَلِمَةَ (قَلَمٌ) بِتَنْوِينِ الْفَتْحِ؟',
    signType: 'tanween',
    signName: 'تَنْوِينُ الْفَتْحِ',
    options: [
      { text: 'قَلَماً', isCorrect: true, resultWord: 'قَلَماً', explanation: 'مُمْتَازٌ! تَنْوِينُ الْفَتْحِ يَكُونُ فَتْحَتَيْنِ مَعَ أَلِفٍ زَائِدَةٍ.' },
      { text: 'قَلَمٍ', isCorrect: false, resultWord: 'قَلَمٍ', explanation: 'هَذَا تَنْوِينُ كَسْرٍ وَلَيْسَ تَنْوِينَ فَتْحٍ.' },
      { text: 'الْقَلَمُ', isCorrect: false, resultWord: 'الْقَلَمُ', explanation: 'هَذِهِ (الْـ) التَّعْرِيفِ وَلَيْسَتْ تَنْوِيناً.' }
    ]
  },
  {
    id: 'sc4',
    word: 'شَجَرَةٍ',
    icon: '🌳',
    question: 'مَا هُوَ التَّنْوِينُ الْمَوْجُودُ تَحْتَ حَرْفِ التَّاءِ فِي (شَجَرَةٍ)؟',
    signType: 'tanween',
    signName: 'تَنْوِينُ الْكَسْرِ',
    options: [
      { text: 'تَنْوِينُ كَسْرٍ ( ـٍ )', isCorrect: true, resultWord: 'شَجَرَةٍ', explanation: 'أَحْسَنْتَ! كَسْرَتَانِ تَحْتَ آخِرِ حَرْفٍ.' },
      { text: 'تَنْوِينُ ضَمٍّ ( ـٌ )', isCorrect: false, resultWord: 'شَجَرَةٍ', explanation: 'تَنْوِينُ الضَّمِّ يَكُونُ فَوْقَ الْحَرْفِ (ـٌ).' },
      { text: 'تَنْوِينُ فَتْحٍ ( ـً )', isCorrect: false, resultWord: 'شَجَرَةٍ', explanation: 'تَنْوِينُ الْفَتْحِ يَكُونُ فَوْقَ الْحَرْفِ (ـً).' }
    ]
  }
];

export const SignsGame: React.FC<SignsGameProps> = ({ onEarnStars }) => {
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const challenge = SIGN_CHALLENGES[challengeIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const opt = challenge.options[index];
    if (opt.isCorrect) {
      soundManager.playCorrect();
      setScore(prev => prev + 1);
      onEarnStars(2);
      soundManager.speakArabic(opt.explanation);
    } else {
      soundManager.playTryAgain();
      soundManager.speakArabic(opt.explanation);
    }
  };

  const handleNextChallenge = () => {
    soundManager.playPop();
    if (challengeIdx + 1 < SIGN_CHALLENGES.length) {
      setChallengeIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      soundManager.speakArabic(SIGN_CHALLENGES[challengeIdx + 1].question);
    } else {
      setIsCompleted(true);
      soundManager.playCelebration();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      soundManager.speakArabic('رَائِعٌ! لَقَدْ أَصْبَحْتَ خَبِيراً فِي عَلَامَاتِ الِاسْمِ السِّحْرِيَّةِ!');
    }
  };

  const handleReset = () => {
    soundManager.playPop();
    setChallengeIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-purple-200 shadow-sm space-y-6" id="signs-game-container">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
        <div>
          <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-purple-300 inline-block mb-1">
            مُخْتَبَرُ التَّجَارِبِ
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-purple-950 font-readex">
            كَاشِفُ عَلَامَاتِ الِاسْمِ السِّحْرِيَّةِ 🪄
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold">
            اخْتَبِرْ مَعْرِفَتَكَ بِعَلَامَاتِ الِاسْمِ: (الْـ، التَّنْوِين، التَّاء الْمَرْبُوطَة):
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 px-3.5 py-1.5 rounded-2xl border border-purple-200">
          <span className="text-xs font-bold text-purple-900">
            تَحَدِّي {challengeIdx + 1} مِنْ {SIGN_CHALLENGES.length}
          </span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          
          {/* Question Card */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100/70 border-3 border-purple-300 rounded-3xl p-5 sm:p-6 text-right space-y-3">
            
            <div className="flex items-center justify-between">
              <span className="text-4xl">{challenge.icon}</span>
              <button
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speakArabic(challenge.question);
                }}
                className="bg-purple-200 hover:bg-purple-300 text-purple-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                id="btn-speak-sign-q"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلسُّؤَالِ</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-purple-950 tashkeel-text font-readex leading-relaxed">
              {challenge.question}
            </h3>

          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {challenge.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'bg-slate-50 border-slate-200 hover:border-purple-300 text-slate-800';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-2 ${btnStyle}`}
                  id={`btn-sign-opt-${idx}`}
                >
                  <span className="text-2xl sm:text-3xl font-black tashkeel-text block">
                    {opt.text}
                  </span>
                  {isAnswered && opt.isCorrect && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      إِجَابَةٌ صَحِيحَةٌ!
                    </span>
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <span className="text-xs text-rose-700 font-bold flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      إِجَابَةٌ خَاطِئَةٌ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Button */}
          {isAnswered && (
            <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
              <div className="flex-1 space-y-1">
                <span className="text-xs font-black text-purple-900 block">
                  💡 تَوْضِيحُ الْقَاعِدَةِ:
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 tashkeel-text">
                  {selectedOption !== null && challenge.options[selectedOption].explanation}
                </p>
              </div>
              <button
                onClick={handleNextChallenge}
                className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all shrink-0"
                id="btn-next-sign-challenge"
              >
                التَّالِي ⬅️
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Completed */
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-3 border-purple-300 rounded-3xl p-7 text-center space-y-4 max-w-lg mx-auto shadow-md">
          <div className="w-20 h-20 bg-purple-500 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-md">
            🪄
          </div>
          <h3 className="text-2xl font-black text-purple-950 font-readex">
            أَحْسَنْتَ يَا خَبِيرَ الْعَلَامَاتِ!
          </h3>
          <p className="text-purple-900 font-bold text-sm tashkeel-text">
            أَصْبَحْتَ تُمَيِّزُ عَلَامَاتِ الِاسْمِ السِّحْرِيَّةِ بِكُلِّ سُهُولَةٍ!
          </p>

          <button
            onClick={handleReset}
            className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-2xl flex items-center justify-center gap-2 mx-auto shadow-md hover:scale-105 transition-all"
            id="btn-reset-signs"
          >
            <span>إِعَادَةُ التَّجْرِبَةِ</span>
          </button>
        </div>
      )}

    </div>
  );
};
