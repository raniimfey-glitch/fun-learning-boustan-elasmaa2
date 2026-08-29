import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, XCircle, Trophy, RotateCcw, HelpCircle, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/nounsData';
import { soundManager } from '../utils/audio';

interface QuizViewProps {
  onEarnStars: (count: number) => void;
  onOpenCertificate: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onEarnStars, onOpenCertificate }) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentQIndex];

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return;
    setSelectedOptId(optId);
    setIsAnswered(true);

    const chosen = question.options.find(o => o.id === optId);
    if (chosen?.isCorrect) {
      soundManager.playCorrect();
      setScore(prev => prev + 1);
      onEarnStars(3);
      soundManager.speakArabic(`أَحْسَنْتَ! ${chosen.explanation}`);
    } else {
      soundManager.playTryAgain();
      soundManager.speakArabic(`حَاوِلْ أَنْ تَتَعَلَّمَ: ${chosen?.explanation || ''}`);
    }
  };

  const handleNext = () => {
    soundManager.playPop();
    setShowHint(false);
    if (currentQIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOptId(null);
      setIsAnswered(false);
      soundManager.speakArabic(QUIZ_QUESTIONS[currentQIndex + 1].question);
    } else {
      setIsQuizComplete(true);
      soundManager.playCelebration();
      onEarnStars(5); // Completion bonus
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      soundManager.speakArabic('مَبْرُوكٌ يَا بَطَل! لَقَدْ أَتْمَمْتَ الِاخْتِبَارَ بِتَفَوُّقٍ وَجَدَارَةٍ!');
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playPop();
    setCurrentQIndex(0);
    setSelectedOptId(null);
    setIsAnswered(false);
    setScore(0);
    setShowHint(false);
    setIsQuizComplete(false);
    soundManager.speakArabic(QUIZ_QUESTIONS[0].question);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-indigo-200 shadow-sm space-y-6" id="quiz-view-container">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
        <div>
          <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-extrabold border border-indigo-300 inline-block mb-1">
            تَحَدِّي الْأَذْكِيَاءِ
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-indigo-950 font-readex">
            الِاخْتِبَارُ الذَّكِيُّ لِبَطَلِ الْأَسْمَاءِ ⭐
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-semibold">
            أَجِبْ عَنِ الْأَسْئِلَةِ وَاحْصُلْ عَلَى أَوْسِمَةِ التَّفَوُّقِ:
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-200">
          <span className="text-xs font-black text-indigo-900">
            السُّؤَالُ {currentQIndex + 1} مِنْ {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {!isQuizComplete ? (
        <div className="space-y-5">
          
          {/* Question Box */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100/60 border-3 border-indigo-200 rounded-3xl p-5 sm:p-6 text-right space-y-3">
            
            <div className="flex items-center justify-between">
              <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1 rounded-xl">
                سُؤَالٌ {currentQIndex + 1}
              </span>

              <div className="flex items-center gap-2">
                {question.hint && (
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setShowHint(prev => !prev);
                      if (!showHint) soundManager.speakArabic(`تَلْمِيحٌ: ${question.hint}`);
                    }}
                    className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 border border-amber-300"
                    title="تَلْمِيحٌ مُسَاعِدٌ"
                    id="btn-quiz-hint"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>تَلْمِيحٌ</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    soundManager.playPop();
                    soundManager.speakArabic(question.question);
                  }}
                  className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                  id="btn-speak-quiz-q"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسْتَمِعْ لِلسُّؤَالِ</span>
                </button>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-indigo-950 tashkeel-text font-readex leading-relaxed">
              {question.question}
            </h3>

            {/* Hint Box */}
            {showHint && question.hint && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs sm:text-sm font-bold text-amber-900 flex items-center gap-2 animate-bounce-slow">
                <span>💡</span>
                <span>تَلْمِيحٌ مُسَاعِدٌ: {question.hint}</span>
              </div>
            )}

          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {question.options.map(opt => {
              const isSelected = selectedOptId === opt.id;
              let style = 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800';

              if (isAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-100 border-rose-400 text-rose-950 font-bold';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 transition-all text-center flex flex-col items-center justify-center gap-2 ${style}`}
                  id={`btn-quiz-opt-${opt.id}`}
                >
                  <span className="text-lg sm:text-xl font-black tashkeel-text block">
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

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
              <div className="flex-1 space-y-1">
                <span className="text-xs font-black text-indigo-900 block">
                  💡 تَوْضِيحُ الْإِجَابَةِ:
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-800 tashkeel-text">
                  {selectedOptId && question.options.find(o => o.id === selectedOptId)?.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all shrink-0"
                id="btn-next-quiz-q"
              >
                السُّؤَالُ التَّالِي ⬅️
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-3 border-indigo-300 rounded-3xl p-7 text-center space-y-5 max-w-lg mx-auto shadow-md">
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-lg">
            🏆
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-indigo-950 font-readex">
            مَبْرُوكٌ يَا بَطَلَ الِاخْتِبَارِ!
          </h3>

          <p className="text-indigo-900 font-bold text-sm sm:text-base tashkeel-text">
            نَتِيجَتُكَ: <span className="text-indigo-700 font-black text-lg">{score} مِنْ {QUIZ_QUESTIONS.length}</span> إِجَابَاتٍ صَحِيحَةٍ!
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onOpenCertificate}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-md flex items-center gap-2 hover:scale-105 transition-all"
              id="btn-view-cert-after-quiz"
            >
              <Award className="w-5 h-5 text-yellow-200" />
              <span>عَرْضُ شَهَادَةِ التَّفَوُّقِ</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm px-4 py-3 rounded-2xl flex items-center gap-2 shadow-md hover:scale-105 transition-all"
              id="btn-restart-quiz"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إِعَادَةُ الِاخْتِبَارِ</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
