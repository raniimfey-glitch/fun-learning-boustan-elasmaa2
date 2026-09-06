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
    <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-indigo-200 shadow-xs flex-1 flex flex-col justify-between gap-2 min-h-0" id="quiz-view-container">
      
      {/* Header (flex-shrink: 0) */}
      <div className="flex items-center justify-between gap-2 text-right flex-shrink-0">
        <div>
          <h2 className="text-base sm:text-lg font-black text-indigo-950 font-readex">
            الِاخْتِبَارُ الذَّكِيُّ لِبَطَلِ الْأَسْمَاءِ ⭐
          </h2>
          <p className="text-slate-600 text-[11px] sm:text-xs font-semibold">
            أَجِبْ عَنِ الْأَسْئِلَةِ وَاحْصُلْ عَلَى أَوْسِمَةِ التَّفَوُّقِ:
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
          <span className="text-xs font-black text-indigo-900">
            السُّؤَالُ {currentQIndex + 1} مِنْ {QUIZ_QUESTIONS.length}
          </span>
        </div>
      </div>

      {!isQuizComplete ? (
        <div className="flex-1 flex flex-col justify-between gap-2 min-h-0">
          
          {/* Question Box (flex-shrink: 1, fit-card-scale) */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100/60 border-2 border-indigo-200 rounded-2xl p-3 sm:p-4 text-right space-y-2 flex-shrink-1 my-auto fit-card-scale">
            
            <div className="flex items-center justify-between">
              <span className="bg-indigo-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-lg">
                سُؤَالٌ {currentQIndex + 1}
              </span>

              <div className="flex items-center gap-1.5">
                {question.hint && (
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setShowHint(prev => !prev);
                      if (!showHint) soundManager.speakArabic(`تَلْمِيحٌ: ${question.hint}`);
                    }}
                    className="p-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 border border-amber-300"
                    title="تَلْمِيحٌ مُسَاعِدٌ"
                    id="btn-quiz-hint"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>تَلْمِيحٌ</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    soundManager.playPop();
                    soundManager.speakArabic(question.question);
                  }}
                  className="bg-indigo-200 hover:bg-indigo-300 text-indigo-900 font-bold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1 transition-colors"
                  id="btn-speak-quiz-q"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>اسْتَمِعْ</span>
                </button>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-black text-indigo-950 tashkeel-text font-readex leading-normal">
              {question.question}
            </h3>

            {/* Hint Box */}
            {showHint && question.hint && (
              <div className="p-2 bg-amber-50 rounded-xl border border-amber-300 text-xs font-bold text-amber-900 flex items-center gap-1.5 animate-bounce-slow">
                <span>💡</span>
                <span>تَلْمِيحٌ مُسَاعِدٌ: {question.hint}</span>
              </div>
            )}

          </div>

          {/* Options Grid (flex-shrink: 0) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-shrink-0">
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
                  className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center flex flex-col items-center justify-center gap-1 ${style}`}
                  id={`btn-quiz-opt-${opt.id}`}
                >
                  <span className="text-base sm:text-lg font-black tashkeel-text block">
                    {opt.text}
                  </span>
                  
                  {isAnswered && opt.isCorrect && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      إِجَابَةٌ صَحِيحَةٌ!
                    </span>
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <span className="text-[11px] text-rose-700 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      إِجَابَةٌ خَاطِئَةٌ
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next (flex-shrink: 0) */}
          {isAnswered && (
            <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between gap-2 text-right flex-shrink-0">
              <div className="flex-1">
                <span className="text-[11px] font-black text-indigo-900 block">
                  💡 تَوْضِيحُ الْإِجَابَةِ:
                </span>
                <p className="text-xs font-bold text-slate-800 tashkeel-text leading-tight">
                  {selectedOptId && question.options.find(o => o.id === selectedOptId)?.explanation}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs hover:scale-105 transition-all shrink-0"
                id="btn-next-quiz-q"
              >
                السُّؤَالُ التَّالِي ⬅️
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-300 rounded-2xl p-5 text-center space-y-3 max-w-sm mx-auto shadow-xs my-auto flex-shrink-1">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-xs">
            🏆
          </div>

          <h3 className="text-lg sm:text-xl font-black text-indigo-950 font-readex">
            مَبْرُوكٌ يَا بَطَلَ الِاخْتِبَارِ!
          </h3>

          <p className="text-indigo-900 font-bold text-xs tashkeel-text">
            نَتِيجَتُكَ: <span className="text-indigo-700 font-black text-sm">{score} مِنْ {QUIZ_QUESTIONS.length}</span> إِجَابَاتٍ صَحِيحَةٍ!
          </p>

          <div className="flex items-center justify-center gap-2 pt-1">
            <button
              onClick={onOpenCertificate}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 hover:scale-105 transition-all"
              id="btn-view-cert-after-quiz"
            >
              <Award className="w-4 h-4 text-yellow-200" />
              <span>شَهَادَةُ التَّفَوُّقِ</span>
            </button>

            <button
              onClick={handleRestartQuiz}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1 shadow-xs hover:scale-105 transition-all"
              id="btn-restart-quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إِعَادَةُ الِاخْتِبَارِ</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
